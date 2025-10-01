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
      // Escape regex metacharacters to prevent injection / ReDoS
      const escaped = term.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&')
      // Optionally cap length to mitigate excessive backtracking on huge inputs
      const safe = escaped.slice(0, 200)
      const regex = new RegExp(safe, 'i')
      const users = await this.collection
        .find({
          $or: [
        { displayName: regex },
        { givenName: regex },
        { surname: regex },
        { mail: regex }
          ]
        })
        .limit(limit)
        .sort({ displayName: 1 })
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
   *
   * @param users - Array of user objects to upsert
   */
  public async bulkUpsertUsers(users: ActiveDirectoryUser[]): Promise<void> {
    try {
      if (users.length === 0) return

      const bulkOps = users.map((user) => ({
        updateOne: {
          filter: { id: user.id },
          update: { $set: user },
          upsert: true
        }
      }))

      await this.collection.bulkWrite(bulkOps)
    } catch (error) {
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
   *
   * @param userIds - Array of user IDs to delete
   */
  public async bulkDeleteUsers(userIds: string[]): Promise<void> {
    try {
      if (userIds.length === 0) return
      await this.collection.deleteMany({ id: { $in: userIds } })
    } catch (error) {
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
