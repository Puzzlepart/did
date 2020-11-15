import { ApolloError } from 'apollo-server-express'
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { filter, find, pick } from 'underscore'
import { AzStorageService, MSGraphService } from '../../services'
import { IAuthOptions } from '../authChecker'
import { Context } from '../context'
import { BaseResult } from './types'
import { User, UserInput, UserQueryOptions } from './user.types'

@Service()
@Resolver(User)
export class UserResolver {
  /**
   * Constructor for UserResolver
   *
   * AzStorageService and MSGraphService is automatically injected using Container from typedi
   *
   * @param {AzStorageService} _azstorage AzStorageService
   * @param {MSGraphService} _msgraph MSGraphService
   */
  constructor(private readonly _azstorage: AzStorageService, private readonly _msgraph: MSGraphService) {}

  /**
   * Get current user
   *
   * @param {Context} ctx GraphQL context
   */
  @Query(() => User, { description: 'Get the currently logged in user' })
  async currentUser(@Ctx() ctx: Context) {
    if (!ctx.userId) return null
    try {
      const user = await this._azstorage.getUser(ctx.userId)
      const role = await this._azstorage.getRoleByName(user.role)
      return {
        ...user,
        subscription: pick(ctx.subscription, 'id', 'name'),
        role
      }
    } catch (error) {
      return new ApolloError(error.message)
    }
  }

  /**
   * Get AD users
   *
   * @param {UserQueryOptions} options Options
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [User], { description: 'Get all users from Active Directory' })
  async adUsers(@Arg('options', () => UserQueryOptions) options: UserQueryOptions) {
    return await this._msgraph.getUsers(options.sortBy)
  }

  /**
   * Get users
   *
   * @param {UserQueryOptions} options Options
   */
  @Authorized()
  @Query(() => [User], { description: 'Get all users' })
  async users(@Arg('options', () => UserQueryOptions) options: UserQueryOptions) {
    // eslint-disable-next-line prefer-const
    let [users, roles] = await Promise.all([this._azstorage.getUsers(options.sortBy), this._azstorage.getRoles()])
    users = filter(
      users.map((user) => ({
        ...user,
        role: find(roles, (role) => role.name === user.role)
      })),
      (user) => !!user.role
    )
    return users
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
    try {
      await this._azstorage.addOrUpdateUser(user, update)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }

  /**
   * Bulk import users
   *
   * @param {UserInput[]} users Users
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Bulk import users' })
  async bulkImport(@Arg('users', () => [UserInput]) users: UserInput[]): Promise<BaseResult> {
    try {
      await this._azstorage.bulkImport(users)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}
