/* eslint-disable unicorn/no-array-callback-reference */
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { RequestContext } from '../../graphql/requestContext'
import { ActiveDirectoryUser } from '../../graphql/resolvers/user/types'
import { CacheScope, CacheService } from '../cache'
import { DeltaLinksService } from '../mongo/delta_links'
import { GraphUsersService } from '../mongo/graph_users'
import { MSGraphService } from './MSGraphService'
const debug = require('debug')('services/msgraph/delta')

/**
 * Delta sync result with metadata
 */
export interface DeltaSyncResult {
  /**
   * Users that were added or updated
   */
  upserted: number

  /**
   * Users that were deleted
   */
  deleted: number

  /**
   * Whether this was a full sync (no previous delta link)
   */
  isFullSync: boolean

  /**
   * Total users in the graph_users collection after sync
   */
  totalUsers: number

  /**
   * Sync duration in milliseconds
   */
  duration: number
}

/**
 * Microsoft Graph Delta Sync Service
 * Handles incremental synchronization of users using MS Graph delta queries
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
export class MSGraphDeltaService {
  private _cache: CacheService
  private _graphUsersService: GraphUsersService
  private _deltaLinksService: DeltaLinksService

  constructor(
    private _msGraphService: MSGraphService,
    @Inject('CONTEXT') readonly context?: RequestContext
  ) {
    this._cache = new CacheService(context, MSGraphDeltaService.name)
    this._graphUsersService = new GraphUsersService(context)
    this._deltaLinksService = new DeltaLinksService(context)
  }

  /**
   * Synchronize users using delta query
   * Performs full sync if no delta link exists, otherwise performs incremental sync
   *
   * @param forceFullSync - Force a full sync even if delta link exists
   */
  public async syncUsers(forceFullSync: boolean = false): Promise<DeltaSyncResult> {
    const startTime = Date.now()
    debug('Starting user sync...')

    let deltaLink: string | null = null

    try {
      // Get stored delta link
      const storedDelta = await this._deltaLinksService.getDeltaLink('users')
      deltaLink = forceFullSync ? null : storedDelta?.deltaLink

      const isFullSync = !deltaLink

      if (isFullSync) {
        debug('Performing full sync (no delta link found or forced)')
      } else {
        debug('Performing incremental sync using delta link')
      }

      // Perform delta sync
      const { users, deletedUserIds, newDeltaLink } = await this._msGraphService.getUsersDelta(deltaLink)

      // Process deletions
      if (deletedUserIds.length > 0) {
        debug(`Deleting ${deletedUserIds.length} users`)
        await this._graphUsersService.bulkDeleteUsers(deletedUserIds)
      }

      // Process additions/updates
      if (users.length > 0) {
        debug(`Upserting ${users.length} users`)
        await this._graphUsersService.bulkUpsertUsers(users)
      }

      // Save the new delta link
      if (newDeltaLink) {
        await this._deltaLinksService.saveDeltaLink('users', newDeltaLink)
      }

      // Get total count
      const totalUsers = await this._graphUsersService.getUserCount()

      // Clear cache
      await this._cache.clear('getusers_')

      const duration = Date.now() - startTime
      debug(
        `Sync completed in ${duration}ms: ${users.length} upserted, ${deletedUserIds.length} deleted, ${totalUsers} total users`
      )

      return {
        upserted: users.length,
        deleted: deletedUserIds.length,
        isFullSync,
        totalUsers,
        duration
      }
    } catch (error) {
      // Check if delta link is expired (older than 30 days)
      if (error.message?.includes('DeltaLink older than 30 days')) {
        debug('Delta link expired, clearing and retrying with full sync')
        await this._deltaLinksService.clearDeltaLink('users')
        // Retry with full sync if not already doing one
        if (!forceFullSync && deltaLink) {
          return await this.syncUsers(true)
        }
      }
      debug('Error during user sync:', error.message)
      throw error
    }
  }

  /**
   * Get all users from the graph_users collection with Redis caching
   *
   * @param cacheExpiry - Cache expiry in seconds (default: 300 = 5 minutes)
   */
  public async getUsers(cacheExpiry: number = 300): Promise<ActiveDirectoryUser[]> {
    try {
      return await this._cache.usingCache(
        async () => {
          const users = await this._graphUsersService.getAllUsers()
          return users
        },
        {
          key: 'getusers_all',
          expiry: cacheExpiry,
          scope: CacheScope.SUBSCRIPTION
        }
      )
    } catch (error) {
      debug('Error getting users:', error.message)
      throw error
    }
  }

  /**
   * Search users from the graph_users collection with Redis caching
   *
   * @param search - Search term
   * @param limit - Maximum number of results
   * @param cacheExpiry - Cache expiry in seconds (default: 60)
   */
  public async searchUsers(
    search: string,
    limit: number = 10,
    cacheExpiry: number = 60
  ): Promise<ActiveDirectoryUser[]> {
    try {
      return await this._cache.usingCache(
        async () => {
          const users = await this._graphUsersService.searchUsers(search, limit)
          return users
        },
        {
          key: ['searchusers', search, limit.toString()],
          expiry: cacheExpiry,
          scope: CacheScope.SUBSCRIPTION
        }
      )
    } catch (error) {
      debug('Error searching users:', error.message)
      throw error
    }
  }

  /**
   * Force a full sync by clearing the delta link and syncing all users
   */
  public async forceFullSync(): Promise<DeltaSyncResult> {
    debug('Forcing full sync - clearing delta link')
    await this._deltaLinksService.clearDeltaLink('users')
    await this._graphUsersService.clearAllUsers()
    return await this.syncUsers(true)
  }

  /**
   * Get sync status and statistics
   */
  public async getSyncStatus() {
    const deltaLink = await this._deltaLinksService.getDeltaLink('users')
    const userCount = await this._graphUsersService.getUserCount()

    return {
      hasBeenSynced: !!deltaLink,
      lastSync: deltaLink?.lastSync || null,
      userCount,
      deltaLinkExists: !!deltaLink?.deltaLink
    }
  }
}
