import { Inject, Service } from 'typedi'
import { RequestContext } from '../../graphql/requestContext'
import { MongoDocumentService } from './document'

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
  }

  /**
   * Get delta link for a specific resource type
   *
   * @param resourceType - Resource type (e.g., 'users')
   */
  public async getDeltaLink(resourceType: string): Promise<DeltaLink | null> {
    try {
      const deltaLink = await this.collection.findOne({ resourceType })
      return deltaLink
    } catch (error) {
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
      await this.collection.updateOne(
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
    } catch (error) {
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
      await this.collection.deleteOne({ resourceType })
    } catch (error) {
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
