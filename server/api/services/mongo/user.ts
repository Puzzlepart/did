import * as Mongo from 'mongodb'
import { User } from 'server/api/graphql/resolvers/types'

export class UserMongoService {
  private _collectionName = 'users'
  private _collection: Mongo.Collection<User>

  /**
   * Constructor
   *
   * @param {Mongo.Db} db Mongo database
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

  /**
   * Add user
   *
   * @param {User} user User
   */
  public async addUser(user: User) {
    try {
      const result = await this._collection.insertOne(user)
      return result
    } catch (err) {
      throw err
    }
  }
}
