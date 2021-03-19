/* eslint-disable tsdoc/syntax */
import { sign } from 'jsonwebtoken'
import { FilterQuery } from 'mongodb'
import { Inject, Service } from 'typedi'
import { omit } from 'underscore'
import { Context } from '../../graphql/context'
import { ApiToken } from '../../graphql/resolvers/types'
import { environment } from '../../utils'
import { MongoDocumentService } from './@document'

/**
 * API token service
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class ApiTokenService extends MongoDocumentService<ApiToken> {
  /**
   * Constructor for `ApiTokenService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: Context) {
    super(
      context,
      'api_tokens',
      null,
      context?.mongoClient?.db(environment('MONGO_DB_DB_NAME'))
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
        omit(token, 'created'),
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
   */
  public async deleteToken(
    name: string,
    subscriptionId: string
  ): Promise<void> {
    try {
      await this.collection.deleteOne({ name, subscriptionId })
    } catch (error) {
      throw error
    }
  }
}
