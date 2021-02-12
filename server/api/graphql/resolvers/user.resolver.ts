/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { MSGraphService } from '../../services'
import { MongoService } from '../../services/mongo'
import { IAuthOptions } from '../authChecker'
import { Context } from '../context'
import { BaseResult } from './types'
import { User, UserInput, UserQuery, UserQueryOptions } from './user.types'

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
    return await Promise.resolve(null)
    // if (!ctx.userId) return null
    // try {
    //   const user = await this._azstorage.getUser(ctx.userId)
    //   const role = await this._azstorage.getRoleByName(user.role)
    //   return {
    //     ...user,
    //     subscription: pick(ctx.subscription, 'id', 'name'),
    //     role
    //   }
    // } catch (error) {
    //   return new ApolloError(error.message)
    // }
  }

  /**
   * Get AD users
   *
   * @param {UserQueryOptions} options Options
   */
  @Query(() => [User], { description: 'Get all users from Active Directory' })
  async adUsers(@Arg('options', () => UserQueryOptions) options: UserQueryOptions) {
    //return await this._msgraph.getUsers(options.sortBy)
    return await Promise.resolve([])
  }

  /**
   * Get user by id
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => User, { description: 'Get user by id' })
  public getUserById() {
    return this._mongo.user.getById('0d2a7e56-1519-4225-b7e3-ee857fd014d2')
  }

  /**
   * Get users
   *
   * @param {UserQueryOptions} options Options
   * @param {UserQuery} query Query
   */
  @Authorized()
  @Query(() => [User], { description: 'Get users' })
  async users(
    @Arg('options', () => UserQueryOptions, { nullable: true }) options: UserQueryOptions,
    @Arg('query', () => UserQuery, { nullable: true }) query: UserQuery
  ) {
    return await Promise.resolve([])
    // eslint-disable-next-line prefer-const
    // let [users, roles] = await Promise.all([
    //   this._azstorage.getUsers(options?.sortBy, query),
    //   this._azstorage.getRoles()
    // ])
    // users = filter(
    //   users.map((user) => ({
    //     ...user,
    //     role: find(roles, (role) => role.name === user.role)
    //   })),
    //   (user) => !!user.role
    // )
    // return users
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
    // try {
    //   await this._azstorage.addOrUpdateUser(user, update)
    //   return { success: true, error: null }
    // } catch (error) {
    //   return {
    //     success: false,
    //     error: pick(error, 'name', 'message', 'code', 'statusCode')
    //   }
    // }
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
    // try {
    //   await this._azstorage.bulkImport(users)
    //   return { success: true, error: null }
    // } catch (error) {
    //   return {
    //     success: false,
    //     error: pick(error, 'name', 'message', 'code', 'statusCode')
    //   }
    // }
  }
}
