import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { filter, find, pick } from 'underscore'
import { AzStorageService, MSGraphService } from '../../services'
import { Context } from '../context'
import { BaseResult } from './types'
import { User, UserInput } from './user.types'

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
  @Authorized()
  @Query(() => User, { description: 'Get the currently logged in user' })
  async currentUser(@Ctx() ctx: Context) {
    try {
      const [user, roles] = await Promise.all([this._azstorage.getUser(ctx.user.id), this._azstorage.getRoles()])
      return {
        ...ctx.user,
        ...user,
        role: find(roles, (role) => role.name === user.role)
      }
    } catch (error) {
      return null
    }
  }

  /**
   * Get AD users
   */
  @Authorized()
  @Query(() => [User], { description: 'Get all users from Active Directory' })
  async adUsers() {
    return await this._msgraph.getUsers()
  }

  /**
   * Get users
   */
  @Authorized()
  @Query(() => [User], { description: 'Get all users' })
  async users() {
    // eslint-disable-next-line prefer-const
    let [users, roles] = await Promise.all([this._azstorage.getUsers(), this._azstorage.getRoles()])
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
   * Bulk add users
   *
   * @param {UserInput[]} users Users
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Bulk add users' })
  async bulkAddUsers(@Arg('users', () => [UserInput]) users: UserInput[]): Promise<BaseResult> {
    try {
      await this._azstorage.bulkAddUsers(users)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}
