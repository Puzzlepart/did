/* eslint-disable @typescript-eslint/no-unused-vars */
import { Context } from 'mocha'
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import { MSGraphService } from '../../../services'
import { MongoService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { BaseResult } from '../types'
import { User, UserInput, UserQuery, UserQueryOptions } from './types'

@Service()
@Resolver(User)
export class UserResolver {
  /**
   * Constructor for UserResolver
   *
   * @param {MSGraphService} _msgraph MS Graph service
   * @param {MongoService} _mongo Mongo service
   */
  constructor(private readonly _msgraph: MSGraphService, private readonly _mongo: MongoService) {}

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
   * Get AD users
   *
   * @param {UserQueryOptions} options Options
   */
  @Query(() => [User], { description: 'Get all users from Active Directory' })
  adUsers(@Arg('options', () => UserQueryOptions) options: UserQueryOptions) {
    return this._msgraph.getUsers(options?.sortBy)
  }

  /**
   * Get users
   *
   * @param {UserQueryOptions} options Options
   * @param {UserQuery} query Query
   */
  @Authorized()
  @Query(() => [User], { description: 'Get users' })
  users(
    @Arg('options', () => UserQueryOptions, { nullable: true }) options: UserQueryOptions,
    @Arg('query', () => UserQuery, { nullable: true }) query: UserQuery
  ) {
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
    return await Promise.resolve({ success: true, error: null })
  }

  /**
   * Bulk import users
   *
   * @param {UserInput[]} users Users
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Bulk import users' })
  async bulkImport(@Arg('users', () => [UserInput]) users: UserInput[]): Promise<BaseResult> {
    return await Promise.resolve({ success: true, error: null })
  }
}

export * from './types'