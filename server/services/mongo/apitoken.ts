import { Db as MongoDatabase, FilterQuery } from 'mongodb'
import env from 'utils/env'
import { ApiToken } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './document'
import { sign } from 'jsonwebtoken'
import { omit } from 'underscore'

export class ApiTokenMongoService extends MongoDocumentService<ApiToken> {
  constructor(db: MongoDatabase) {
    super(db, 'api_tokens')
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
  public async addToken(token: ApiToken, subscriptionId: string): Promise<string> {
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
  public async deleteToken(name: string, subscriptionId: string): Promise<void> {
    try {
      await this.collection.deleteOne({ name, subscriptionId })
    } catch (err) {
      throw err
    }
  }
}
