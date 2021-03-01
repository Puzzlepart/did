/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { ApiTokenService } from '../../../services/mongo'
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
   * @param _apiToken - API token service
   */
  constructor(private readonly _apiToken: ApiTokenService) {}

  /**
   * Get API tokens
   *
   * @param ctx - GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [ApiToken], { description: 'Get API tokens' })
  apiTokens(@Ctx() context: Context): Promise<ApiToken[]> {
    return this._apiToken.getTokens({
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
    return this._apiToken.addToken(token, context.subscription.id)
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
    await this._apiToken.deleteToken(name, context.subscription.id)
    return { success: true, error: null }
  }
}

export * from './types'
