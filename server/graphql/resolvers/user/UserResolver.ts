import createDebug from 'debug'
import 'reflect-metadata'
import Format from 'string-format'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import _ from 'underscore'
import { PermissionScope } from '../../../../shared/config/security'
import {
  GitHubService,
  MSGraphService,
  SubscriptionService,
  UserService
} from '../../../services'
import { environment } from '../../../utils'
import { IAuthOptions } from '../../authChecker'
import { RequestContext } from '../../requestContext'
import { BaseResult } from '../types'
import {
  ActiveDirectoryUser,
  User,
  UserFeedback,
  UserFeedbackResult,
  UserInput,
  UserQuery
} from './types'
const debug = createDebug('graphql/resolvers/user')

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
   * @param _msgraph - MS Graph service
   * @param _userSvc - User service
   * @param _subSvc - Subscription service
   * @param _githubSvc - GitHub service
   */
  constructor(
    private readonly _msgraph: MSGraphService,
    private readonly _userSvc: UserService,
    private readonly _subSvc: SubscriptionService,
    private readonly _githubSvc: GitHubService
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
  async currentUser(@Ctx() context: RequestContext): Promise<User> {
    const user = await this._userSvc.getById(context.userId)
    if (!user) return null
    return {
      ...user,
      subscription: _.pick(context.subscription, 'id', 'name', 'owner')
    }
  }

  /**
   * Get Active Directory users
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.LIST_USERS })
  @Query(() => [ActiveDirectoryUser], {
    description: 'Get all users from Active Directory'
  })
  activeDirectoryUsers(): Promise<ActiveDirectoryUser[]> {
    return this._msgraph.getUsers()
  }

  /**
   * Get users in the system.
   *
   * @param query - Query
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.LIST_USERS })
  @Query(() => [User], { description: 'Get users' })
  users(
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
  async addOrUpdateUser(
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
  async addUsers(
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
  async updateUsers(
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
  async updateUserConfiguration(
    @Arg('user', { nullable: true }) user: string,
    @Arg('lastActive', { nullable: true }) lastActive?: string
  ): Promise<BaseResult> {
    await this._userSvc.updateCurrentUserConfiguration(user, lastActive)
    return { success: true }
  }

  /**
   * Submit feedback to GitHub repository configured in the
   * environment.
   *
   * @param feedback - Feedback model
   */
  @Mutation(() => UserFeedbackResult, { description: 'Submit feedback' })
  async submitFeedback(
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
