import * as Mongo from 'mongodb'
import { Role } from '../../graphql/resolvers/types'

export class RoleMongoService {
  private _collectionName = 'roles'
  private _collection: Mongo.Collection<Role>

  /**
   * Constructor
   *
   * @param {Mongo.Db} db Mongo database
   */
  constructor(db: Mongo.Db) {
    this._collection = db.collection(this._collectionName)
  }

  /**
   * Get Role by name
   *
   * @param {string} name Role name
   */
  public async getByName(name: string) {
    try {
      const role = await this._collection.findOne({ name })
      return role
    } catch (err) {
      throw err
    }
  }

  /**
   * Add role
   *
   * @param {Role} role Role
   */
  public async addRole(role: Role) {
    try {
      const result = await this._collection.insertOne(role)
      return result
    } catch (err) {
      throw err
    }
  }
}
