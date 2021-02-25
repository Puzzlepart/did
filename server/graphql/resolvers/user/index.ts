/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import { MSGraphService } from '../../../services'
import { MongoService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { Context } from '../../context'
import { BaseResult } from '../types'
import { User, UserInput, UserQuery } from './types'

@Service()
@Resolver(User)
export class UserResolver {
  /**
   * Constructor for UserResolver
   *
   * @param {MSGraphService} _msgraph MS Graph service
   * @param {MongoService} _mongo Mongo service
   */
  constructor(private readonly _msgraph: MSGraphService, private readonly _mongo: MongoService) { }

  /**
   * Get current user
   *
   * @param {Context} ctx GraphQL context
   */
  @Query(() => User, { description: 'Get the currently logged in user' })
  async currentUser(@Ctx() ctx: Context) {
    const user = await this._mongo.user.getById(ctx.userId)
    return {
      ...user,
      subscription: pick(ctx.subscription, 'id', 'name')
    }
  }

  /**
   * Get Active Directory users
   */
  @Query(() => [User], { description: 'Get all users from Active Directory' })
  activeDirectoryUsers() {
    return this._msgraph.getUsers()
  }

  /**
   * Get users
   *
   * @param {UserQuery} query Query
   */
  @Authorized()
  @Query(() => [User], { description: 'Get users' })
  users(@Arg('query', () => UserQuery, { nullable: true }) query: UserQuery) {
    return this._mongo.user.getUsers(query)
  }

  /**
   * Add or update user
   *
   * @param {UserInput} user User
   * @param {boolean} update Update
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Add or update user' })
  async addOrUpdateUser(
    @Arg('user', () => UserInput) user: UserInput,
    @Arg('update', { nullable: true }) update: boolean
  ): Promise<BaseResult> {
    if (update) await this._mongo.user.updateUser(user)
    else await this._mongo.user.addUser(user)
    return { success: true, error: null }
  }

  /**
   * Add users
   *
   * @param {UserInput[]} users Users
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Add users' })
  async addUsers(@Arg('users', () => [UserInput]) users: UserInput[]): Promise<BaseResult> {
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
   * @param {string} configuration Configuration
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Update user configuration' })
  async updateUserConfiguration(@Arg('configuration') configuration: string): Promise<BaseResult> {
    await this._mongo.user.updateCurrentUserConfiguration(configuration)
    return { success: true }
  }
}

export * from './types'
