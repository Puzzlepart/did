/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import { MongoService, MSGraphService } from '../../../services'
import { IAuthOptions } from '../../authChecker'
import { Context } from '../../context'
import { BaseResult } from '../types'
import { User, UserInput, UserQuery } from './types'

/**
 * @category Resolver
 */
@Service()
@Resolver(User)
export class UserResolver {
  /**
   * Constructor for UserResolver
   *
   * @param _msgraph - MS Graph service
   * @param _mongo - Mongo service
   */
  constructor(
    private readonly _msgraph: MSGraphService,
    private readonly _mongo: MongoService
  ) {}

  /**
   * Get current user
   *
   * @param ctx - GraphQL context
   */
  @Query(() => User, { description: 'Get the currently logged in user' })
  async currentUser(@Ctx() context: Context): Promise<User> {
    const user = await this._mongo.user.getById(context.userId)
    return {
      ...user,
      subscription: pick(context.subscription, 'id', 'name')
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
    return this._mongo.user.getUsers(query)
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
    await (update ? this._mongo.user.updateUser(user) : this._mongo.user.addUser(user))
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
    await this._mongo.user.addUsers(users)
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
    await this._mongo.user.updateCurrentUserConfiguration(configuration)
    return { success: true }
  }
}

export * from './types'
