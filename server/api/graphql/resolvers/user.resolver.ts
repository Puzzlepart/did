import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { filter, find, pick } from 'underscore'
import { Context } from '../context'
import { BaseResult } from './types'
import { User, UserInput } from './user.types'

@Resolver(User)
export class UserResolver {
  /**
   * Get current user
   *
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Query(() => User, { description: 'Get the currently logged in user' })
  async currentUser(@Ctx() ctx: Context) {
    if (!ctx.user) return null
    try {
      const [user, roles] = await Promise.all([
        ctx.services.azstorage.getUser(ctx.user.id),
        ctx.services.azstorage.getRoles()
      ])
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
   *
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Query(() => [User], { description: 'Get all users from Active Directory' })
  async adUsers(@Ctx() ctx: Context) {
    const users = await ctx.services.msgraph.getUsers()
    return users
  }

  /**
   * Get users
   *
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Query(() => [User], { description: 'Get all users' })
  async users(@Ctx() ctx: Context) {
    // eslint-disable-next-line prefer-const
    let [users, roles] = await Promise.all([ctx.services.azstorage.getUsers(), ctx.services.azstorage.getRoles()])
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
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Add or update user' })
  async addOrUpdateUser(
    @Arg('user', () => UserInput) user: UserInput,
    @Arg('update', { nullable: true }) update: boolean,
    @Ctx() ctx: Context
  ): Promise<BaseResult> {
    try {
      await ctx.services.azstorage.addOrUpdateUser(user, update)
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
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Bulk add users' })
  async bulkAddUsers(@Arg('users', () => [UserInput]) users: UserInput[], @Ctx() ctx: Context): Promise<BaseResult> {
    try {
      await ctx.services.azstorage.bulkAddUsers(users)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}
