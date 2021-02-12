import * as Mongo from 'mongodb'
import { User } from 'server/api/graphql/resolvers/types'
import { RoleMongoService } from './role'

export class UserMongoService {
  private _collectionName = 'users'
  private _collection: Mongo.Collection<User>

  /**
   * Constructor
   *
   * @param {Mongo.Db} _db Mongo database
   */
  constructor(private _db: Mongo.Db) {
    this._collection = _db.collection(this._collectionName)
  }

  /**
   * Get users
   * 
   * @param {Mongo.FilterQuery<User>} query Query
   */
  public async getUsers(query?: Mongo.FilterQuery<User>): Promise<User[]> {
    try {
      const users = await this._collection.find(query).toArray()
      return users
    } catch (err) {
      throw err
    }
  }

  /**
   * Get user by ID
   *
   * @param {string} id User ID
   */
  public async getById(id: string) {
    try {
      const user = await this._collection.findOne({ id })
      if (!user.role) throw new Error()
      user.role = await new RoleMongoService(this._db).getByName(user.role as string)
      return user
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
