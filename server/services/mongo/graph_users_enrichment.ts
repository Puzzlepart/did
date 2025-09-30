import { Inject, Service } from 'typedi'
import { RequestContext } from '../../graphql/requestContext'
import { MongoDocumentService } from './document'
import { GraphUsersService } from './graph_users'
import { MSGraphService } from '../msgraph'
const debug = require('debug')('services/enrichment/graph_users')

export interface GraphUsersEnrichmentStatusDoc {
  _id?: string
  id: string // fixed: 'manager_enrichment'
  startedAt: Date
  finishedAt?: Date
  totalUsers: number
  processed: number
  failures: number
  running: boolean
  lastUserId?: string
  concurrency: number
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
    this._msGraph = new MSGraphService((null as unknown) as any, null, context)
  }

  private _statusId = 'manager_enrichment'

  public async getStatus(): Promise<GraphUsersEnrichmentStatusDoc | null> {
    return (await this.collection.findOne({ id: this._statusId })) as any
  }

  public async start(concurrency = 10): Promise<GraphUsersEnrichmentStatusDoc> {
    const existing = await this.getStatus()
    if (existing?.running) return existing
    const totalUsers = await this._graphUsers.collection.countDocuments({})
    const doc: GraphUsersEnrichmentStatusDoc = {
      id: this._statusId,
      startedAt: new Date(),
      totalUsers,
      processed: 0,
      failures: 0,
      running: true,
      concurrency
    }
    await this.collection.updateOne(
      { id: this._statusId },
      { $set: doc },
      { upsert: true }
    )
    this._launchWorker(concurrency)
    return doc
  }

  private async _launchWorker(concurrency: number) {
    if (this._isWorkerRunning) return
    this._isWorkerRunning = true
    debug('Starting enrichment worker...')
    try {
      // process users without manager field OR manager null
      while (true) {
        const status = await this.getStatus()
        if (!status?.running) break
        const batch = await this._graphUsers.collection
          .find({ $or: [{ manager: { $exists: false } }, { manager: null }] })
          .limit(concurrency)
          .toArray()
        if (batch.length === 0) {
          await this.collection.updateOne(
            { id: this._statusId },
            { $set: { running: false, finishedAt: new Date() } }
          )
          debug('Enrichment complete.')
          break
        }
        await Promise.all(
          batch.map(async (user) => {
            try {
              const manager = await this._msGraph.getUserManager(user.id)
              await this._graphUsers.collection.updateOne(
                { id: user.id },
                { $set: { manager: manager || null } }
              )
              await this.collection.updateOne(
                { id: this._statusId },
                { $inc: { processed: 1 }, $set: { lastUserId: user.id } }
              )
            } catch (error) {
              debug('Failed manager fetch for user %s: %s', user.id, error.message)
              await this.collection.updateOne(
                { id: this._statusId },
                { $inc: { processed: 1, failures: 1 } }
              )
            }
          })
        )
      }
    } finally {
      this._isWorkerRunning = false
    }
  }

  public async stop(): Promise<void> {
    await this.collection.updateOne(
      { id: this._statusId },
      { $set: { running: false, finishedAt: new Date() } }
    )
  }
}
