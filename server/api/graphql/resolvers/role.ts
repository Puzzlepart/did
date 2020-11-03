import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { pick } from 'underscore'
import { Context } from '../context'
import { BaseResult } from '../types'
import { Role, RoleInput } from './role.types'

@Resolver(Role)
export class RoleResolver {
  /**
   * Get roles
   *
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Query(() => [Role], { description: 'Get roles' })
  async roles(@Ctx() ctx: Context) {
    return await ctx.services.azstorage.getRoles()
  }

  /**
   * Add or update role
   *
   * @param {RoleInput} role Role
   * @param {boolean} update Update
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Add or update role' })
  async addOrUpdateRole(
    @Arg('role', () => RoleInput) role: RoleInput,
    @Arg('update', { nullable: true }) update: boolean,
    @Ctx() ctx: Context
  ) {
    try {
      await ctx.services.azstorage.addOrUpdateRole(role, update)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}

export * from './role.types'
