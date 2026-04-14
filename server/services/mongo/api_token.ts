import { sign } from 'jsonwebtoken'
import { FilterQuery } from 'mongodb'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { RequestContext } from '../../graphql/requestContext'
import { ApiToken } from '../../graphql/resolvers/types'
import { environment } from '../../utils'
import { MongoDocumentService } from './document'

/**
 * API token service
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class ApiTokenService extends MongoDocumentService<ApiToken> {
  /**
   * Builds a token query for lookup/delete operations.
   *
   * `type` is included to avoid ambiguous deletes between subscription
   * tokens and personal tokens that happen to share the same name.
   */
  private buildTokenQuery(
    name: string,
    subscriptionId: string,
    options?: {
      type?: 'subscription' | 'personal'
      userId?: string
    }
  ): FilterQuery<ApiToken> {
    const query: FilterQuery<ApiToken> = { name, subscriptionId }
    if (options?.type) {
      query.type =
        options.type === 'subscription'
          ? { $in: ['subscription', null] }
          : options.type
    }
    if (options?.userId) {
      query.userId = options.userId
    }
    return query
  }

  /**
   * Constructor for `ApiTokenService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
    super(
      context,
      'api_tokens',
      null,
      context?.mcl?.db(environment('MONGO_DB_DB_NAME'))
    )
  }

  /**
   * Get tokens
   *
   * @param query - Query
   */
  public async getTokens(query?: FilterQuery<ApiToken>): Promise<ApiToken[]> {
    try {
      const tokens = await this.find(query)
      return tokens
    } catch (error) {
      throw error
    }
  }

  /**
   * Add API token
   *
   * @param token - Token to add
   * @param subscriptionId - Subscription id
   */
  public async addToken(
    token: ApiToken,
    subscriptionId: string
  ): Promise<string> {
    try {
      token.subscriptionId = subscriptionId
      token.created = new Date()
      const apiKey = sign(
        _.omit(token, 'created'),
        environment('API_TOKEN_SECRET')
      )
      await this.insert({
        ...token,
        apiKey
      })
      return apiKey
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete token
   *
   * @param name - Token name
   * @param subscriptionId - Subscription id
   * @param userId - Optional user id (for personal tokens, ensures ownership)
   */
  public async deleteToken(
    name: string,
    subscriptionId: string,
    options?: {
      type?: 'subscription' | 'personal'
      userId?: string
    }
  ): Promise<void> {
    try {
      const query = this.buildTokenQuery(name, subscriptionId, options)
      await this.collection.deleteOne(query)
    } catch (error) {
      throw error
    }
  }
}
