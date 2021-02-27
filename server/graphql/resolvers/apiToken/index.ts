/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata'
import { Context } from '../../context'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { MongoService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { BaseResult } from '../types'
import { ApiToken, ApiTokenInput } from './types'

@Service()
@Resolver(ApiToken)
export class ApiTokenResolver {
  /**
   * Constructor for ApiTokenResolver
   *
   * @param _mongo Mongo service
   */
  constructor(private readonly _mongo: MongoService) {}

  /**
   * Get API tokens
   *
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [ApiToken], { description: 'Get API tokens' })
  apiTokens(@Ctx() ctx: Context): Promise<ApiToken[]> {
    return this._mongo.apiToken.getTokens({
      subscriptionId: ctx.subscription.id
    })
  }

  /**
   * Add API token
   *
   * @param {ApiTokenInput} token Token
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => String, { description: 'Add API token' })
  addApiToken(
    @Arg('token') token: ApiTokenInput,
    @Ctx() ctx: Context
  ): Promise<string> {
    return this._mongo.apiToken.addToken(token, ctx.subscription.id)
  }

  /**
   * Delete API token
   *
   * @param name Name
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Delete API tokens' })
  async deleteApiToken(
    @Arg('name') name: string,
    @Ctx() ctx: Context
  ): Promise<BaseResult> {
    await this._mongo.apiToken.deleteToken(name, ctx.subscription.id)
    return { success: true, error: null }
  }
}

export * from './types'
