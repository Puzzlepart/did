/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { GraphQLError } from 'graphql'
import { Service } from 'typedi'
import _ from 'underscore'
import { PermissionScope } from '../../../../shared/config/security'
import { ApiTokenService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { RequestContext } from '../../requestContext'
import { BaseResult } from '../types'
import { ApiToken, ApiTokenInput } from './types'

/**
 * Resolver for `ApiToken`.
 *
 * `ApiTokenService` are injected through
 * _dependendy injection_.
 *
 * @see https://typegraphql.com/docs/dependency-injection.html
 *
 * @category GraphQL Resolver
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
   * Token management must be performed from an interactive user session.
   */
  private assertInteractiveSession(context: RequestContext): void {
    if (context.tokenSource) {
      throw new GraphQLError(
        'Interactive session required to manage API tokens.',
        { extensions: { code: 'FORBIDDEN' } }
      )
    }
  }

  /**
   * Get API tokens
   *
   * @param ctx - GraphQL context
   */
  @Authorized<IAuthOptions>({
    requiresUserContext: true,
    scope: PermissionScope.LIST_API_TOKENS
  })
  @Query(() => [ApiToken], { description: 'Get API tokens' })
  async apiTokens(@Ctx() context: RequestContext): Promise<ApiToken[]> {
    this.assertInteractiveSession(context)
    const canManageTokens = _.contains(
      context.permissions,
      PermissionScope.MANAGE_API_TOKENS
    )
    const tokens = await this._apiToken.getTokens({
      subscriptionId: context.subscription.id
    })
    return tokens.map((token) => ({
      ...token,
      apiKey:
        canManageTokens && token.type !== 'personal' ? token.apiKey : undefined
    }))
  }

  /**
   * Add API token
   *
   * @param token - Token
   * @param ctx - GraphQL context
   */
  @Authorized<IAuthOptions>({
    requiresUserContext: true,
    scope: PermissionScope.MANAGE_API_TOKENS
  })
  @Mutation(() => String, { description: 'Add API token' })
  addApiToken(
    @Arg('token') token: ApiTokenInput,
    @Ctx() context: RequestContext
  ): Promise<string> {
    this.assertInteractiveSession(context)
    return this._apiToken.addToken(token, context.subscription.id)
  }

  /**
   * Delete API token
   *
   * @param name - Name
   * @param ctx - GraphQL context
   */
  @Authorized<IAuthOptions>({
    requiresUserContext: true,
    scope: PermissionScope.MANAGE_API_TOKENS
  })
  @Mutation(() => BaseResult, { description: 'Delete API tokens' })
  async deleteApiToken(
    @Arg('name') name: string,
    @Ctx() context: RequestContext,
    @Arg('type', () => String, { nullable: true })
    type?: 'subscription' | 'personal',
    @Arg('userId', () => String, { nullable: true }) userId?: string
  ): Promise<BaseResult> {
    this.assertInteractiveSession(context)
    await this._apiToken.deleteToken(name, context.subscription.id, {
      type,
      userId
    })
    return { success: true, error: null }
  }
}

export * from './types'
