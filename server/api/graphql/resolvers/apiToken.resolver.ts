import { ApolloError } from 'apollo-server-express'
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import { SubscriptionService } from '../../services'
import { IAuthOptions } from '../authChecker'
import { Context } from '../context'
import { ApiToken, ApiTokenInput } from './apiToken.types'
import { BaseResult } from './types'

@Service()
@Resolver(ApiToken)
export class ApiTokenResolver {
  /**
   * Constructor for ApiTokenResolver
   *
   * AzStorageService is automatically injected using Container from typedi
   *
   * @param {SubscriptionService} _subscription SubscriptionService
   */
  constructor(private readonly _subscription: SubscriptionService) {}

  /**
   * Get API tokens
   *
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [ApiToken], { description: 'Get API tokens' })
  async apiTokens(@Ctx() ctx: Context): Promise<ApiToken[]> {
    const tokens = await this._subscription.getApiTokens(ctx.subscription.id)
    return tokens
  }

  /**
   * Add API token
   *
   * @param {ApiTokenInput} token Name    *
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => String, { description: 'Add API token' })
  addApiToken(@Arg('token') token: ApiTokenInput, @Ctx() ctx: Context): Promise<string> {
    try {
      return this._subscription.addApiToken(token, ctx.subscription.id)
    } catch (error) {
      throw new ApolloError('Failed to create API token.')
    }
  }

  /**
   * Delete API token
   *
   * @param {string} name Name
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Delete API tokens' })
  async deleteApiToken(@Arg('name') name: string, @Ctx() ctx: Context): Promise<BaseResult> {
    try {
      await this._subscription.deleteApiToken(name, ctx.subscription.id)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}
