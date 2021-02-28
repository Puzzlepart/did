/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { MongoService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { Context } from '../../context'
import { BaseResult } from '../types'
import { ApiToken, ApiTokenInput } from './types'

/**
 * @category Resolver
 */
@Service()
@Resolver(ApiToken)
export class ApiTokenResolver {
  /**
   * Constructor for ApiTokenResolver
   *
   * @param _mongo - Mongo service
   */
  constructor(private readonly _mongo: MongoService) {}

  /**
   * Get API tokens
   *
   * @param ctx - GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [ApiToken], { description: 'Get API tokens' })
  apiTokens(@Ctx() context: Context): Promise<ApiToken[]> {
    return this._mongo.apiToken.getTokens({
      subscriptionId: context.subscription.id
    })
  }

  /**
   * Add API token
   *
   * @param token - Token
   * @param ctx - GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => String, { description: 'Add API token' })
  addApiToken(
    @Arg('token') token: ApiTokenInput,
    @Ctx() context: Context
  ): Promise<string> {
    return this._mongo.apiToken.addToken(token, context.subscription.id)
  }

  /**
   * Delete API token
   *
   * @param name - Name
   * @param ctx - GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Delete API tokens' })
  async deleteApiToken(
    @Arg('name') name: string,
    @Ctx() context: Context
  ): Promise<BaseResult> {
    await this._mongo.apiToken.deleteToken(name, context.subscription.id)
    return { success: true, error: null }
  }
}

export * from './types'
