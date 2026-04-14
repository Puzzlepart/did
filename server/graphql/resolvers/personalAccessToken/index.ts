import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { GraphQLError } from 'graphql'
import _ from 'underscore'
import get from 'get-value'
import { ApiTokenService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { RequestContext } from '../../requestContext'
import { BaseResult } from '../types'
import { ApiToken, ApiTokenInput } from '../apiToken/types'

const debug = require('debug')('graphql/personalAccessToken')

/**
 * Resolver for Personal Access Tokens.
 *
 * Unlike subscription API tokens, PATs are owned by individual users
 * and carry user identity when used for authentication.
 *
 * @category GraphQL Resolver
 */
@Service()
@Resolver(ApiToken)
export class PersonalAccessTokenResolver {
  constructor(private readonly _apiToken: ApiTokenService) {}

  /**
   * PAT management must be performed from an interactive user session.
   */
  private assertInteractiveSession(context: RequestContext): void {
    if (context.tokenSource) {
      throw new GraphQLError(
        'Interactive session required to manage personal access tokens.',
        { extensions: { code: 'FORBIDDEN' } }
      )
    }
  }

  /**
   * Get the current user's personal access tokens.
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Query(() => [ApiToken], {
    description: 'Get personal access tokens for the current user'
  })
  async personalAccessTokens(
    @Ctx() context: RequestContext
  ): Promise<ApiToken[]> {
    this.assertInteractiveSession(context)
    const tokens = await this._apiToken.getTokens({
      subscriptionId: context.subscription.id,
      userId: context.userId,
      type: 'personal'
    })
    return tokens.map((token) => ({
      ...token,
      apiKey: undefined
    }))
  }

  /**
   * Create a personal access token.
   * Validates that requested permissions are a subset of the user's current permissions.
   * Checks that PATs are enabled for the subscription.
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Mutation(() => String, { description: 'Create a personal access token' })
  async addPersonalAccessToken(
    @Arg('token') token: ApiTokenInput,
    @Ctx() context: RequestContext
  ): Promise<string> {
    this.assertInteractiveSession(context)
    const patEnabled = get(
      context.subscription,
      'settings.security.personalAccessTokensEnabled',
      { default: true }
    )
    if (!patEnabled) {
      throw new GraphQLError(
        'Personal access tokens are disabled for this organization',
        { extensions: { code: 'FORBIDDEN' } }
      )
    }

    const invalidPermissions = token.permissions.filter(
      (p) => !_.contains(context.permissions, p)
    )
    if (invalidPermissions.length > 0) {
      debug(
        `User ${context.userId} attempted to create PAT with permissions they don't have: ${invalidPermissions.join(', ')}`
      )
      throw new GraphQLError(
        'Cannot create token with permissions you do not have',
        { extensions: { code: 'FORBIDDEN' } }
      )
    }

    const existing = await this._apiToken.getTokens({
      subscriptionId: context.subscription.id,
      userId: context.userId,
      type: 'personal',
      name: token.name
    })
    if (existing.length > 0) {
      throw new GraphQLError(
        'A personal access token with this name already exists',
        { extensions: { code: 'BAD_USER_INPUT' } }
      )
    }

    const patToken = {
      ...token,
      type: 'personal' as const,
      userId: context.userId
    }
    return this._apiToken.addToken(patToken, context.subscription.id)
  }

  /**
   * Delete a personal access token owned by the current user.
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Mutation(() => BaseResult, {
    description: 'Delete a personal access token'
  })
  async deletePersonalAccessToken(
    @Arg('name') name: string,
    @Ctx() context: RequestContext
  ): Promise<BaseResult> {
    this.assertInteractiveSession(context)
    const [token] = await this._apiToken.getTokens({
      subscriptionId: context.subscription.id,
      userId: context.userId,
      type: 'personal',
      name
    })
    if (!token) {
      throw new GraphQLError('Token not found', {
        extensions: { code: 'NOT_FOUND' }
      })
    }
    await this._apiToken.deleteToken(
      name,
      context.subscription.id,
      {
        type: 'personal',
        userId: context.userId
      }
    )
    return { success: true, error: null }
  }
}
