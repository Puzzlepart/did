import { sign } from 'jsonwebtoken'
import { FilterQuery } from 'mongodb'
import { omit } from 'underscore'
import { Context } from '../../graphql/context'
import { ApiToken } from '../../graphql/resolvers/types'
import env from '../../utils/env'
import { MongoDocumentService } from './@document'

export class ApiTokenService extends MongoDocumentService<ApiToken> {
  constructor(context: Context) {
    super(context, 'api_tokens')
  }

  /**
   * Get tokens
   *
   * @param {FilterQuery<ApiToken>} query Query
   */
  public async getTokens(query?: FilterQuery<ApiToken>): Promise<ApiToken[]> {
    try {
      const tokens = await this.find(query)
      return tokens
    } catch (err) {
      throw err
    }
  }

  /**
   * Add API token
   *
   * @param {ApiToken} token Token to add
   * @param {string} subscriptionId Subscription id
   */
  public async addToken(
    token: ApiToken,
    subscriptionId: string
  ): Promise<string> {
    try {
      token.subscriptionId = subscriptionId
      token.created = new Date()
      const apiKey = sign(omit(token, 'created'), env('API_TOKEN_SECRET'))
      await this.collection.insertOne({
        ...token,
        apiKey
      })
      return apiKey
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete token
   *
   * @param {string} name Token name
   * @param {string} subscriptionId Subscription id
   */
  public async deleteToken(
    name: string,
    subscriptionId: string
  ): Promise<void> {
    try {
      await this.collection.deleteOne({ name, subscriptionId })
    } catch (err) {
      throw err
    }
  }
}
