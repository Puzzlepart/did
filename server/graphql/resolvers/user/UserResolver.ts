import 'reflect-metadata'
import Format from 'string-format'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import _ from 'underscore'
import { PermissionScope } from '../../../../shared/config/security'
import {
  GitHubService,
  MSGraphService,
  MSGraphDeltaService,
  SubscriptionService,
  UserService,
  GraphUsersEnrichmentService
} from '../../../services'
import { environment } from '../../../utils'
import { IAuthOptions } from '../../authChecker'
import { RequestContext } from '../../requestContext'
import { BaseResult } from '../types'
import {
  ActiveDirectoryUser,
  UpdateUserTimebankResult,
  User,
  UserFeedback,
  UserFeedbackResult,
  UserInput,
  UserQuery,
  UserSyncResult,
  ActiveDirectoryManagerEnrichmentStatus
} from './types'
const debug = require('debug')('graphql/resolvers/user')

/**
 * Resolver for `User`.
 *
 * `MSGraphService`, `UserService` and
 * `SubscriptionService` are injected through
 * _dependendy injection_.
 *
 * @see https://typegraphql.com/docs/dependency-injection.html
 *
 * @category GraphQL Resolver
 */
@Service()
@Resolver(User)
export class UserResolver {
  /**
   * Constructor for UserResolver
   *
   * @param _msgraphSvc - MS Graph service
   * @param _msgraphDeltaSvc - MS Graph Delta sync service
   * @param _userSvc - User service
   * @param _subSvc - Subscription service
   * @param _githubSvc - GitHub service
   * @param _graphUsersEnrichmentSvc - Graph Users Enrichment service
   */
  constructor(
    private readonly _msgraphSvc: MSGraphService,
    private readonly _msgraphDeltaSvc: MSGraphDeltaService,
    private readonly _userSvc: UserService,
    private readonly _subSvc: SubscriptionService,
    private readonly _githubSvc: GitHubService,
    private readonly _graphUsersEnrichmentSvc: GraphUsersEnrichmentService
  ) {}

  /**
   * Get auth providers available in the environment.
   */
  @Query(() => [String], { description: 'Get auth providers' })
  authProviders(): string[] {
    return (process.env.AUTH_PROVIDERS || '').split(' ')
  }

  /**
   * Get current user, aswell as `id`, `name` and `owner` of
   * the current subscription. If the user is not logged in,
   * `null` is returned.
   *
   * @param ctx - GraphQL context
   */
  @Query(() => User, {
    nullable: true,
    description: 'Get the currently logged in user'
  })
  public async currentUser(@Ctx() context: RequestContext): Promise<User> {
    const user = await this._userSvc.getById(context.userId)
    if (!user) return null
    return {
      ...user,
      subscription: _.pick(context.subscription, 'id', 'name', 'owner')
    }
  }

  /**
   * Get Active Directory users from cached MongoDB collection
   * Uses delta sync for efficient updates. If no users exist in the database,
   * performs initial sync automatically.
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.LIST_USERS })
  @Query(() => [ActiveDirectoryUser], {
    description: 'Get all users from Entra ID (via cached MongoDB collection)'
  })
  public async activeDirectoryUsers(): Promise<ActiveDirectoryUser[]> {
    try {
      // Check if initial sync is needed
      const syncStatus = await this._msgraphDeltaSvc.getSyncStatus()
      
      // Perform initial sync if never synced before
      if (!syncStatus.hasBeenSynced || syncStatus.userCount === 0) {
        debug('No users in cache, performing initial sync')
        await this._msgraphDeltaSvc.syncUsers()
      }

      // Return cached users from MongoDB with Redis cache
      return await this._msgraphDeltaSvc.getUsers()
    } catch (error) {
      debug('Error getting Active Directory users:', error.message)
      throw error
    }
  }

  /**
   * Search Active Directory users with filters from cached MongoDB collection
   * Falls back to direct MS Graph search if cache is empty
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.LIST_USERS })
  @Query(() => [ActiveDirectoryUser], {
    description: 'Search users from Entra ID with filters'
  })
  public async searchActiveDirectoryUsers(
    @Arg('search', () => String) search: string,
    @Arg('limit', () => Number, { defaultValue: 10 }) limit: number
  ): Promise<ActiveDirectoryUser[]> {
    try {
      const syncStatus = await this._msgraphDeltaSvc.getSyncStatus()
      
      // Use cached search if users are synced, otherwise fall back to direct MS Graph
      if (syncStatus.hasBeenSynced && syncStatus.userCount > 0) {
        return await this._msgraphDeltaSvc.searchUsers(search, limit)
      } else {
        debug('Cache empty, falling back to direct MS Graph search')
        return await this._msgraphSvc.searchUsers(search, limit)
      }
    } catch (error) {
      debug('Error searching Active Directory users:', error.message)
      throw error
    }
  }

  /**
   * Get users in the system.
   *
   * @param query - Query
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.LIST_USERS })
  @Query(() => [User], { description: 'Get users' })
  public users(
    @Arg('query', () => UserQuery, { nullable: true }) query: UserQuery
  ): Promise<User[]> {
    return this._userSvc.getUsers(query)
  }

  /**
   * Add or update user in the system.
   *
   * @param user - User
   * @param update - Update
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_USERS })
  @Mutation(() => BaseResult, { description: 'Add or update user' })
  public async addOrUpdateUser(
    @Arg('user', () => UserInput) user: UserInput,
    @Arg('update', { nullable: true }) update: boolean
  ): Promise<BaseResult> {
    if (update) {
      await this._userSvc.updateUser(user)
    } else {
      await this._userSvc.addUser(user)
      if (user.provider !== 'microsoft') {
        await this._subSvc.registerExternalUser(user.provider, user.mail)
      }
    }
    return { success: true, error: null }
  }

  /**
   * Add users to the system.
   *
   * @param users - Users
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_USERS })
  @Mutation(() => BaseResult, { description: 'Add users' })
  public async addUsers(
    @Arg('users', () => [UserInput]) users: UserInput[]
  ): Promise<BaseResult> {
    users = users.map((user) => ({
      ...user,
      role: 'User'
    }))
    await this._userSvc.addUsers(users)
    return { success: true, error: null }
  }

  /**
   * Update users in the system.
   *
   * @param users - Users
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_USERS })
  @Mutation(() => BaseResult, { description: 'Update users' })
  public async updateUsers(
    @Arg('users', () => [UserInput]) users: UserInput[]
  ): Promise<BaseResult> {
    await this._userSvc.updateUsers(users)
    return { success: true, error: null }
  }

  /**
   * Update user configuration for the current user.
   *
   * @param configuration - Configuration
   * @param startPage - Start page
   * @param preferredLanguage - Preferred language
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Mutation(() => BaseResult, { description: 'Update user configuration' })
  public async updateUserConfiguration(
    @Arg('user', { nullable: true }) user: string,
    @Arg('lastActive', { nullable: true }) lastActive?: string
  ): Promise<BaseResult> {
    await this._userSvc.updateCurrentUserConfiguration(user, lastActive)
    return { success: true }
  }

  /**
   * Update user timebank for the current user.
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Mutation(() => UpdateUserTimebankResult, {
    description: 'Updates the balance of the user timebank'
  })
  public async updateUserTimebank(
    @Ctx() context: RequestContext,
    @Arg('balanceAdjustment', { nullable: false }) balanceAdjustment: number,
    @Arg('entryId', { nullable: false }) entryId: string,
    @Arg('reset', { nullable: true }) reset: boolean
  ): Promise<UpdateUserTimebankResult> {
    try {
      const user = await this._userSvc.getById(context.userId)
      user.timebank = {
        balance: reset ? 0 : (user.timebank?.balance ?? 0) + balanceAdjustment,
        lastUpdated: new Date(),
        entries: reset
          ? []
          : [
              ...(user.timebank?.entries ?? []),
              {
                id: entryId,
                balanceAdjustment
              }
            ]
      }
      await this._userSvc.updateUser(user, ['timebank'])
      return { success: true, balance: user.timebank.balance }
    } catch (error) {
      debug('There was an issue updating the user timebank: ', error.message)
      return { success: false }
    }
  }

  /**
   * Sync Active Directory users using delta query.
   * Performs incremental sync if delta link exists, otherwise full sync.
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_USERS })
  @Mutation(() => UserSyncResult, {
    description: 'Sync Active Directory users using delta query'
  })
  public async syncActiveDirectoryUsers(
    @Arg('forceFullSync', { nullable: true, defaultValue: false })
    forceFullSync: boolean
  ): Promise<UserSyncResult> {
    try {
      debug('Starting Active Directory user sync...')
      const result = await this._msgraphDeltaSvc.syncUsers(forceFullSync)
      return {
        success: true,
        error: null,
        upserted: result.upserted,
        deleted: result.deleted,
        totalUsers: result.totalUsers,
        isFullSync: result.isFullSync,
        duration: result.duration
      }
    } catch (error) {
      debug('Error syncing Active Directory users:', error.message)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Force a full sync of Active Directory users.
   * Clears all cached data and re-syncs from scratch.
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_USERS })
  @Mutation(() => UserSyncResult, {
    description: 'Force a full sync of Active Directory users'
  })
  public async forceFullSyncActiveDirectoryUsers(): Promise<UserSyncResult> {
    try {
      debug('Forcing full Active Directory user sync...')
      const result = await this._msgraphDeltaSvc.forceFullSync()
      return {
        success: true,
        error: null,
        upserted: result.upserted,
        deleted: result.deleted,
        totalUsers: result.totalUsers,
        isFullSync: result.isFullSync,
        duration: result.duration
      }
    } catch (error) {
      debug('Error forcing full sync:', error.message)
      return {
        success: false,
        error: error.message
      }
    }
  }

  /**
   * Start background enrichment of manager information for AD users.
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_USERS })
  @Mutation(() => ActiveDirectoryManagerEnrichmentStatus, {
    description: 'Start background manager enrichment for Active Directory users'
  })
  public async startActiveDirectoryManagerEnrichment(
    @Arg('concurrency', () => Number, { defaultValue: 10 }) concurrency: number
  ): Promise<ActiveDirectoryManagerEnrichmentStatus> {
    const status = await this._graphUsersEnrichmentSvc.start(concurrency)
    return {
      running: status.running,
      startedAt: status.startedAt,
      finishedAt: status.finishedAt,
      totalUsers: status.totalUsers,
      processed: status.processed,
      failures: status.failures,
      lastUserId: status.lastUserId,
      progressPercent:
        status.totalUsers > 0
          ? Math.round((status.processed / status.totalUsers) * (100 * 100)) / 100
          : 0
    }
  }

  /**
   * Get background manager enrichment status.
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_USERS })
  @Query(() => ActiveDirectoryManagerEnrichmentStatus, {
    nullable: true,
    description: 'Get background manager enrichment status'
  })
  public async activeDirectoryManagerEnrichmentStatus(): Promise<ActiveDirectoryManagerEnrichmentStatus> {
    const status = await this._graphUsersEnrichmentSvc.getStatus()
    if (!status) return null
    return {
      running: status.running,
      startedAt: status.startedAt,
      finishedAt: status.finishedAt,
      totalUsers: status.totalUsers,
      processed: status.processed,
      failures: status.failures,
      lastUserId: status.lastUserId,
      progressPercent:
        status.totalUsers > 0
          ? Math.round((status.processed / status.totalUsers) * (100 * 100)) / 100
          : 0
    }
  }

  /**
   * Submit feedback to GitHub repository configured in the
   * environment.
   *
   * @param feedback - Feedback model
   */
  @Mutation(() => UserFeedbackResult, { description: 'Submit feedback' })
  public async submitFeedback(
    @Arg('feedback') feedback: UserFeedback
  ): Promise<UserFeedbackResult> {
    try {
      const title = `${feedback.title} ${feedback.mood}`
      const labels = [feedback.label].filter(Boolean)
      let reporter = null
      const reporterTemplate = environment('GITHUB_FEEDBACK_REPORTER_INFO')
      if (reporterTemplate) {
        if (feedback.hasGitHubUser) {
          reporter = Format(reporterTemplate, `@${feedback.gitHubUsername}`)
        } else if (feedback.reporter) {
          reporter = Format(
            reporterTemplate,
            `[${feedback.reporter.displayName}](mailto:${feedback.reporter.mail})`
          )
        }
      }
      const ref = await this._githubSvc.createIssue(
        title,
        [feedback.body, reporter].filter(Boolean).join('\n\n'),
        labels
      )
      return { success: true, ref }
    } catch (error) {
      debug('There was an issue submitting feedback to GitHub: ', error.message)
      return { success: false }
    }
  }
}
