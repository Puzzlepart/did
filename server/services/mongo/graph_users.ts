import { Inject, Service } from 'typedi'
import { RequestContext } from '../../graphql/requestContext'
import { ActiveDirectoryUser } from '../../graphql/resolvers/user/types'
import { MongoDocumentService } from './document'

/**
 * Graph Users service for managing Active Directory users from MS Graph
 * stored in MongoDB for efficient retrieval and delta synchronization.
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class GraphUsersService extends MongoDocumentService<ActiveDirectoryUser> {
  /**
   * Constructor for `GraphUsersService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
    super(context, 'graph_users')
    // Ensure indexes exist for optimal performance
    this.ensureIndexes().catch((error) => {
      const debug = require('debug')('services/mongo/graph_users')
      debug('Warning: Failed to create indexes:', error.message)
    })
  }

  /**
   * Ensure required indexes exist for optimal query performance
   */
  private async ensureIndexes(): Promise<void> {
    try {
      // Index on id field for upsert operations (unique)
      await this.collection.createIndex(
        { id: 1 },
        { unique: true, background: true }
      )

      // Text index for search functionality on displayName, givenName, surname, mail
      await this.collection.createIndex(
        {
          displayName: 'text',
          givenName: 'text',
          surname: 'text',
          mail: 'text'
        },
        { background: true }
      )
    } catch (error) {
      // Index might already exist, which is fine
      if (error.code !== 85 && error.code !== 86) {
        throw error
      }
    }
  }

  /**
   * Get all users from the graph_users collection
   *
   * @param sortField - Field to sort by (default: 'displayName')
   * @param sortOrder - Sort order (default: 1 for ascending)
   */
  public async getAllUsers(
    sortField: string = 'displayName',
    sortOrder: number = 1
  ): Promise<ActiveDirectoryUser[]> {
    try {
      const users = await this.find({}, { [sortField]: sortOrder })
      return users
    } catch (error) {
      throw error
    }
  }

  /**
   * Search users by display name, given name, surname, or email
   *
   * @param search - Search term
   * @param limit - Maximum number of results (default: 10)
   */
  public async searchUsers(
    search: string,
    limit: number = 10
  ): Promise<ActiveDirectoryUser[]> {
    try {
      const term = (search ?? '').trim()
      if (!term) return []
      // NOTE: Requires a text index on displayName, givenName, surname, mail fields.
      // db.graph_users.createIndex({ displayName: "text", givenName: "text", surname: "text", mail: "text" })
      const safe = term.slice(0, 200)
      const users = await this.collection
        .find({ $text: { $search: safe } })
        .limit(limit)
        .sort({ score: { $meta: 'textScore' } })
        .project({ score: { $meta: 'textScore' } })
        .toArray()
      return users as ActiveDirectoryUser[]
    } catch (error) {
      throw error
    }
  }

  /**
   * Upsert a user (insert or update based on id)
   *
   * @param user - User object to upsert
   */
  public async upsertUser(user: ActiveDirectoryUser): Promise<void> {
    try {
      await this.collection.updateOne(
        { id: user.id },
        { $set: user },
        { upsert: true }
      )
    } catch (error) {
      throw error
    }
  }

  /**
   * Bulk upsert users (insert or update multiple users)
   * Uses batching to prevent MongoDB timeout on large datasets
   *
   * @param users - Array of user objects to upsert
   * @param batchSize - Number of users to process per batch (default: 500)
   */
  public async bulkUpsertUsers(
    users: ActiveDirectoryUser[],
    batchSize: number = 500
  ): Promise<void> {
    const debug = require('debug')('services/mongo/graph_users')
    try {
      if (users.length === 0) return

      const totalBatches = Math.ceil(users.length / batchSize)
      debug(
        `📦 Starting bulk upsert: ${users.length} users in ${totalBatches} batches (${batchSize} per batch)`
      )
      debug(
        `Starting bulk upsert of ${users.length} users in batches of ${batchSize}`
      )

      // Process users in batches to prevent timeout
      for (let i = 0; i < users.length; i += batchSize) {
        const batch = users.slice(i, i + batchSize)
        const currentBatch = Math.floor(i / batchSize) + 1
        const batchStartTime = Date.now()

        debug(
          `  ⏳ Processing batch ${currentBatch}/${totalBatches} (${batch.length} users)...`
        )
        debug(
          `Processing batch ${currentBatch}/${totalBatches} (${batch.length} users)`
        )

        const bulkOps = batch.map((user) => ({
          updateOne: {
            filter: { id: user.id },
            update: { $set: user },
            upsert: true
          }
        }))

        // Use ordered:false for better performance (doesn't stop on first error)
        await this.collection.bulkWrite(bulkOps, { ordered: false })

        const batchDuration = Date.now() - batchStartTime
        debug(
          `  ✅ Batch ${currentBatch}/${totalBatches} completed in ${batchDuration}ms`
        )
        debug(`Completed batch ${currentBatch}/${totalBatches}`)
      }

      debug(`✅ Bulk upsert completed for ${users.length} users`)
      debug(`Bulk upsert completed for ${users.length} users`)
    } catch (error) {
      debug('❌ Error in bulkUpsertUsers:', error.message)
      debug('Error in bulkUpsertUsers:', error.message)
      throw error
    }
  }

  /**
   * Delete a user by ID
   *
   * @param userId - User ID to delete
   */
  public async deleteUser(userId: string): Promise<void> {
    try {
      await this.collection.deleteOne({ id: userId })
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete multiple users by IDs
   * Uses batching to prevent MongoDB timeout on large datasets
   *
   * @param userIds - Array of user IDs to delete
   * @param batchSize - Number of users to delete per batch (default: 1000)
   */
  public async bulkDeleteUsers(
    userIds: string[],
    batchSize: number = 1000
  ): Promise<void> {
    const debug = require('debug')('services/mongo/graph_users')
    try {
      if (userIds.length === 0) return

      const totalBatches = Math.ceil(userIds.length / batchSize)
      debug(
        `🗑️  Starting bulk delete: ${userIds.length} users in ${totalBatches} batches (${batchSize} per batch)`
      )
      debug(
        `Starting bulk delete of ${userIds.length} users in batches of ${batchSize}`
      )

      // Process deletions in batches to prevent timeout
      for (let i = 0; i < userIds.length; i += batchSize) {
        const batch = userIds.slice(i, i + batchSize)
        const currentBatch = Math.floor(i / batchSize) + 1
        const batchStartTime = Date.now()

        debug(
          `  ⏳ Deleting batch ${currentBatch}/${totalBatches} (${batch.length} users)...`
        )
        debug(
          `Deleting batch ${currentBatch}/${totalBatches} (${batch.length} users)`
        )
        await this.collection.deleteMany({ id: { $in: batch } })
        const batchDuration = Date.now() - batchStartTime
        debug(
          `  ✅ Deletion batch ${currentBatch}/${totalBatches} completed in ${batchDuration}ms`
        )
        debug(`Completed deletion batch ${currentBatch}/${totalBatches}`)
      }

      debug(`✅ Bulk delete completed for ${userIds.length} users`)
      debug(`Bulk delete completed for ${userIds.length} users`)
    } catch (error) {
      debug('❌ Error in bulkDeleteUsers:', error.message)
      debug('Error in bulkDeleteUsers:', error.message)
      throw error
    }
  }

  /**
   * Get user count
   */
  public async getUserCount(): Promise<number> {
    try {
      return await this.collection.countDocuments()
    } catch (error) {
      throw error
    }
  }

  /**
   * Clear all users from the collection
   */
  public async clearAllUsers(): Promise<void> {
    try {
      await this.collection.deleteMany({})
    } catch (error) {
      throw error
    }
  }
}
