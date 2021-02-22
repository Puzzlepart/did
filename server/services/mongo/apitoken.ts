import * as Mongo from 'mongodb'
import env from '../../utils/env'
import { ApiToken } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './document'
import { sign } from 'jsonwebtoken'

export class ApiTokenMongoService extends MongoDocumentService<ApiToken> {
  constructor(db: Mongo.Db) {
    super(db, 'api_tokens')
  }

  /**
   * Get tokens
   *
   * @param {Mongo.FilterQuery<ApiToken>} query Query
   */
  public async getTokens(query?: Mongo.FilterQuery<ApiToken>): Promise<ApiToken[]> {
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
   */
  public async addToken(token: ApiToken): Promise<string> {
    try {
      const apiKey = sign(
        {
          permissions: token.permissions,
          expires: token.expires
        },
        env('API_TOKEN_SECRET')
      )
      await this.collection.insertOne({
        ...token,
        apiKey,
        created: new Date()
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
   */
  public async deleteToken(name: string): Promise<void> {
    try {
      await this.collection.deleteOne({ name })
    } catch (err) {
      throw err
    }
  }
}
