/* eslint-disable tsdoc/syntax */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import {
  MSGraphService,
  SubscriptionService,
  UserService
} from '../../../services'
import { IAuthOptions } from '../../authChecker'
import { Context } from '../../context'
import { BaseResult } from '../types'
import { User, UserInput, UserQuery } from './types'

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
   */
  constructor(
    private readonly _msgraph: MSGraphService,
    private readonly _userSvc: UserService,
    private readonly _subSvc: SubscriptionService
  ) {}

  /**
   * Get auth providers
   */
  @Query(() => [String], { description: 'Get auth providers' })
  authProviders(): string[] {
    return (process.env.AUTH_PROVIDERS || 'microsoft').split(' ')
  }

  /**
   * Get current user
   *
   * @param ctx - GraphQL context
   */
  @Query(() => User, {
    nullable: true,
    description: 'Get the currently logged in user'
  })
  async currentUser(@Ctx() context: Context): Promise<User> {
    const user = await this._userSvc.getById(context.userId)
    if (!user) return null
    return {
      ...user,
      subscription: pick(context.subscription, 'id', 'name', 'owner')
    }
  }

  /**
   * Get Active Directory users
   */
  @Query(() => [User], { description: 'Get all users from Active Directory' })
  activeDirectoryUsers(): Promise<User[]> {
    return this._msgraph.getUsers()
  }

  /**
   * Get users
   *
   * @param query - Query
   */
  @Authorized()
  @Query(() => [User], { description: 'Get users' })
  users(
    @Arg('query', () => UserQuery, { nullable: true }) query: UserQuery
  ): Promise<User[]> {
    return this._userSvc.getUsers(query)
  }

  /**
   * Add or update user
   *
   * @param user - User
   * @param update - Update
   */
  @Authorized()
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
   * Add users
   *
   * @param users - Users
   */
  @Authorized<IAuthOptions>({ userContext: true })
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
   * Update user configuration
   *
   * @param configuration - Configuration
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Update user configuration' })
  async updateUserConfiguration(
    @Arg('configuration') configuration: string
  ): Promise<BaseResult> {
    await this._userSvc.updateCurrentUserConfiguration(configuration)
    return { success: true }
  }
}

export * from './types'
