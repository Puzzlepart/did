import * as Mongo from 'mongodb'
import { User } from 'server/api/graphql/resolvers/types'

export class UserMongoService {
  private _collectionName = 'users'
  private _collection: Mongo.Collection<User>

  /**
   * Constructor
   *
   * @param {Mongo.Db} _client Client
   */
  constructor(db: Mongo.Db) {
    this._collection = db.collection(this._collectionName)
  }

  /**
   * Get user by ID
   *
   * @param {string} id User ID
   */
  public async getById(id: string) {
    try {
      const result = await this._collection.findOne({ id })
      return result
    } catch (err) {
      throw err
    }
  }
}
