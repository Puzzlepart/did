import { Inject, Service } from 'typedi'
import { RequestContext } from '../../graphql/requestContext'
import { MongoDocumentService } from './document'
import { GraphUsersService } from './graph_users'
import { MSGraphService } from '../msgraph'
const debug = require('debug')('services/enrichment/graph_users')

// Constants
const BATCH_DELAY_MS = 100
const MIN_CONCURRENCY = 1
const MAX_CONCURRENCY = 50
const STATUS_CHECK_INTERVAL = 10 // Check status every N batches
const MAX_RETRIES = 3
const INITIAL_RETRY_DELAY_MS = 1000
const MAX_RETRY_DELAY_MS = 30_000

export interface GraphUsersEnrichmentStatusDoc {
  _id?: string
  id: string // fixed: 'manager_enrichment'
  startedAt: Date
  finishedAt?: Date
  totalUsers: number
  processed: number
  failures: number
  rateLimitErrors: number
  networkErrors: number
  authErrors: number
  otherErrors: number
  running: boolean
  lastUserId?: string
  concurrency: number
  lastHeartbeat?: Date
}

@Service({ global: false })
export class GraphUsersEnrichmentService extends MongoDocumentService<GraphUsersEnrichmentStatusDoc> {
  private _graphUsers: GraphUsersService
  private _msGraph: MSGraphService
  private _isWorkerRunning = false

  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
    super(context, 'graph_users_enrichment')
    this._graphUsers = new GraphUsersService(context)
    // MSGraphService is scoped – create new instance for direct calls
    this._msGraph = new MSGraphService(undefined, null, context)
  }

  /**
   * Retry helper with exponential backoff and error categorization
   */
  private async _retryWithBackoff<T>(
    operation: () => Promise<T>,
    userId: string,
    maxRetries = MAX_RETRIES
  ): Promise<{ result: T | null; errorType: string | null }> {
    let lastError: Error
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await operation()
        return { result, errorType: null }
      } catch (error) {
        lastError = error
        const errorType = this._categorizeError(error)
        
        // Don't retry certain error types
        if (errorType === 'auth' || errorType === 'notFound') {
          debug('Non-retryable error for user %s: %s', userId, error.message)
          return { result: null, errorType }
        }
        
        // Don't retry on final attempt
        if (attempt === maxRetries) {
          debug('Max retries exceeded for user %s: %s', userId, error.message)
          return { result: null, errorType }
        }
        
        // Calculate delay with exponential backoff and jitter
        const baseDelay = Math.min(INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt), MAX_RETRY_DELAY_MS)
        const jitter = Math.random() * 0.1 * baseDelay // ±10% jitter
        const delay = baseDelay + jitter
        
        debug('Retrying user %s in %dms (attempt %d/%d): %s', userId, delay, attempt + 1, maxRetries, error.message)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
    
    return { result: null, errorType: this._categorizeError(lastError) }
  }
  
  /**
   * Categorize errors for better tracking and retry decisions
   */
  private _categorizeError(error: any): string {
    const message = error?.message?.toLowerCase() || ''
    const code = error?.code?.toString() || ''
    
    // Rate limiting
    if (message.includes('rate limit') || message.includes('throttle') || code === '429') {
      return 'rateLimit'
    }
    
    // Authentication/Authorization
    if (message.includes('unauthorized') || message.includes('forbidden') || 
        code === '401' || code === '403') {
      return 'auth'
    }
    
    // Network errors
    if (message.includes('network') || message.includes('timeout') || 
        message.includes('econnreset') || message.includes('enotfound')) {
      return 'network'
    }
    
    // Not found - user might not exist or no manager
    if (message.includes('not found') || code === '404') {
      return 'notFound'
    }
    
    return 'other'
  }

  private _statusId = 'manager_enrichment'

  public async getStatus(): Promise<GraphUsersEnrichmentStatusDoc | null> {
    return (await this.collection.findOne({ id: this._statusId })) as any
  }

  public async start(concurrency = 10): Promise<GraphUsersEnrichmentStatusDoc> {
    // Check for existing running process with heartbeat validation
    const existing = await this.getStatus()
    if (existing?.running) {
      // Check if process is actually running (heartbeat within last 5 minutes)
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
      if (existing.lastHeartbeat && existing.lastHeartbeat > fiveMinutesAgo) {
        return existing
      }
      // Stale process, mark as stopped
      await this.collection.updateOne(
        { id: this._statusId },
        { $set: { running: false, finishedAt: new Date() } }
      )
    }
    
    const totalUsers = await this._graphUsers.collection.countDocuments({})
    const safeConcurrency = Math.min(Math.max(MIN_CONCURRENCY, concurrency), MAX_CONCURRENCY)
    const doc: GraphUsersEnrichmentStatusDoc = {
      id: this._statusId,
      startedAt: new Date(),
      totalUsers,
      processed: 0,
      failures: 0,
      rateLimitErrors: 0,
      networkErrors: 0,
      authErrors: 0,
      otherErrors: 0,
      running: true,
      concurrency: safeConcurrency,
      lastHeartbeat: new Date()
    }
    await this.collection.updateOne(
      { id: this._statusId },
      { $set: doc },
      { upsert: true }
    )
    this._launchWorker(safeConcurrency)
    return doc
  }

  private async _launchWorker(concurrency: number) {
    if (this._isWorkerRunning) return
    this._isWorkerRunning = true
    debug('Starting enrichment worker with concurrency %d...', concurrency)
    
    let batchCount = 0
    
    try {
      // Process users without manager field OR manager null
      while (true) {
        // Check status every N batches to allow for graceful stopping
        if (batchCount % STATUS_CHECK_INTERVAL === 0) {
          const status = await this.getStatus()
          if (!status?.running) {
            debug('Enrichment stopped by external request')
            break
          }
          
          // Update heartbeat to indicate worker is alive
          await this.collection.updateOne(
            { id: this._statusId },
            { $set: { lastHeartbeat: new Date() } }
          )
        }
        
        const batch = await this._graphUsers.collection
          .find({ $or: [{ manager: { $exists: false } }, { manager: null }] })
          .limit(concurrency)
          .toArray()
          
        if (batch.length === 0) {
          await this.collection.updateOne(
            { id: this._statusId },
            { $set: { running: false, finishedAt: new Date() } }
          )
          debug('Enrichment complete - no more users to process')
          break
        }
        
        debug('Processing batch of %d users (batch #%d)', batch.length, batchCount + 1)
        
        // Process batch with enhanced error handling
        const promises = batch.map(async (user) => {
          try {
            const { result: manager, errorType } = await this._retryWithBackoff(
              () => this._msGraph.getUserManager(user.id),
              user.id
            )
            
            if (errorType) {
              // Increment specific error counter
              let errorField: string
              switch (errorType) {
                case 'rateLimit': {
                  errorField = 'rateLimitErrors'
                  break
                }
                case 'network': {
                  errorField = 'networkErrors'
                  break
                }
                case 'auth': {
                  errorField = 'authErrors'
                  break
                }
                default: {
                  errorField = 'otherErrors'
                  break
                }
              }
              
              await this.collection.updateOne(
                { id: this._statusId },
                { $inc: { failures: 1, [errorField]: 1 } }
              )
              
              // For 'notFound' errors, still update the user with null manager
              if (errorType === 'notFound') {
                await this._graphUsers.collection.updateOne(
                  { id: user.id },
                  { $set: { manager: null } }
                )
                await this.collection.updateOne(
                  { id: this._statusId },
                  { $inc: { processed: 1 }, $set: { lastUserId: user.id } }
                )
              }
              return { success: false, userId: user.id, error: errorType }
            }
            
            // Success - update user and increment processed count
            await this._graphUsers.collection.updateOne(
              { id: user.id },
              { $set: { manager: manager || null } }
            )
            await this.collection.updateOne(
              { id: this._statusId },
              { $inc: { processed: 1 }, $set: { lastUserId: user.id } }
            )
            return { success: true, userId: user.id, error: null }
          } catch (error) {
            debug('Unexpected error processing user %s: %s', user.id, error.message)
            return { success: false, userId: user.id, error: error.message }
          }
        })
        
        const results = await Promise.all(promises)
        
        // Log any unexpected errors
        for (const result of results) {
          if (!result.success && result.error) {
            debug('Processing error for user %s: %s', result.userId, result.error)
          }
        }
        
        batchCount++
        
        // Add delay between batches to prevent sustained high load
        if (batch.length > 0) {
          await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS))
        }
      }
    } catch (error) {
      debug('Critical error in enrichment worker: %s', error.message)
      await this.collection.updateOne(
        { id: this._statusId },
        { $set: { running: false, finishedAt: new Date() } }
      )
    } finally {
      this._isWorkerRunning = false
      debug('Enrichment worker stopped')
    }
  }
  public async stop(): Promise<void> {
    await this.collection.updateOne(
      { id: this._statusId },
      { $set: { running: false, finishedAt: new Date() } }
    )
  }
}
