import { Inject, Service } from 'typedi'
import { RequestContext } from '../../graphql/requestContext'
import { MongoDocumentService } from './document'
const debug = require('debug')('services/mongo/delta_links')

/**
 * Delta link data structure for tracking MS Graph sync state
 */
export interface DeltaLink {
  /**
   * Unique identifier for the delta link (e.g., 'users_delta')
   */
  id: string

  /**
   * The delta link URL from MS Graph response
   */
  deltaLink: string

  /**
   * Last sync timestamp
   */
  lastSync: Date

  /**
   * Resource type (e.g., 'users', 'groups')
   */
  resourceType: string
}

/**
 * Delta Links service for managing MS Graph delta synchronization state
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class DeltaLinksService extends MongoDocumentService<DeltaLink> {
  /**
   * Constructor for `DeltaLinksService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
    super(context, 'delta_links')
    debug(
      `📍 DeltaLinksService initialized - Database: ${this.context.db.databaseName}, Collection: delta_links`
    )
  }

  /**
   * Get delta link for a specific resource type
   *
   * @param resourceType - Resource type (e.g., 'users')
   */
  public async getDeltaLink(resourceType: string): Promise<DeltaLink | null> {
    try {
      debug(
        `🔍 Looking for delta link in: ${this.context.db.databaseName}.delta_links (resourceType: ${resourceType})`
      )
      const deltaLink = await this.collection.findOne({ resourceType })
      if (deltaLink) {
        debug(
          `✅ Found existing delta link (lastSync: ${deltaLink.lastSync?.toISOString()})`
        )
      } else {
        debug('ℹ️  No delta link found - will perform full sync')
      }
      return deltaLink
    } catch (error) {
      debug('❌ Error getting delta link:', error.message)
      throw error
    }
  }

  /**
   * Save or update delta link for a resource type
   *
   * @param resourceType - Resource type (e.g., 'users')
   * @param deltaLink - Delta link URL from MS Graph
   */
  public async saveDeltaLink(
    resourceType: string,
    deltaLink: string
  ): Promise<void> {
    try {
      debug(
        `💾 Saving delta link to: ${this.context.db.databaseName}.delta_links`
      )
      debug(`   Resource: ${resourceType}`)
      debug(`   Delta Link (first 100 chars): ${deltaLink.slice(0, 100)}...`)

      const result = await this.collection.updateOne(
        { resourceType },
        {
          $set: {
            id: `${resourceType}_delta`,
            resourceType,
            deltaLink,
            lastSync: new Date()
          }
        },
        { upsert: true }
      )

      debug(
        `✅ Delta link saved successfully (matched: ${result.matchedCount}, modified: ${result.modifiedCount}, upserted: ${result.upsertedCount})`
      )
    } catch (error) {
      debug('❌ Error saving delta link:', error.message)
      throw error
    }
  }

  /**
   * Clear delta link for a resource type (forces full sync next time)
   *
   * @param resourceType - Resource type (e.g., 'users')
   */
  public async clearDeltaLink(resourceType: string): Promise<void> {
    try {
      debug(
        `🗑️  Clearing delta link from: ${this.context.db.databaseName}.delta_links (resourceType: ${resourceType})`
      )
      const result = await this.collection.deleteOne({ resourceType })
      debug(`✅ Delta link cleared (deleted: ${result.deletedCount})`)
    } catch (error) {
      debug('❌ Error clearing delta link:', error.message)
      throw error
    }
  }

  /**
   * Get all delta links
   */
  public async getAllDeltaLinks(): Promise<DeltaLink[]> {
    try {
      return await this.find({})
    } catch (error) {
      throw error
    }
  }
}
