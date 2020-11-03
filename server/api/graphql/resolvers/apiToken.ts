import jwt from 'jsonwebtoken'
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { pick } from 'underscore'
import env from '../../../utils/env'
import { Context } from '../context'
import { BaseResult } from '../types'
import { ApiToken } from './apiToken.types'

@Resolver(ApiToken)
export class ApiTokenResolver {
  /**
   * Get API tokens
   *
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Query(() => [ApiToken], { description: 'Get API tokens' })
  async apiTokens(@Ctx() ctx: Context): Promise<ApiToken[]> {
    const tokens = await ctx.services.subscription.getApiTokens(ctx.user.subscription.id)
    return tokens
  }

  /**
   * Add API token
   *
   * @param {string} name Name    *
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Mutation(() => String, { description: 'Add API token' })
  async addApiToken(@Arg('name') name: string, @Ctx() ctx: Context): Promise<string> {
    const token = jwt.sign(
      {
        data: pick(ctx.user, 'id')
      },
      env('API_TOKEN_SECRET')
    )
    const entry = await ctx.services.subscription.addApiToken(name, ctx.user.subscription.id, token)
    return entry ? token : null
  }

  /**
   * Delete API token
   *
   * @param {string} name Name
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Delete API tokens' })
  async deleteApiToken(@Arg('name') name: string, @Ctx() ctx: Context): Promise<BaseResult> {
    try {
      await ctx.services.subscription.deleteApiToken(name, ctx.user.subscription.id)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}

export * from './apiToken.types'
