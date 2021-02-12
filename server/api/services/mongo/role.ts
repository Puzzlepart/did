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
   * Get roles
   * 
   * @param {Mongo.FilterQuery<Role>} query Query
   */
  public async getRoles(query?: Mongo.FilterQuery<Role>): Promise<Role[]> {
    try {
      const roles = await this._collection.find(query).toArray()
      return roles
    } catch (err) {
      throw err
    }
  }

  /**
   * Get Role by name
   *
   * @param {string} name Role name
   */
  public async getByName(name: string): Promise<Role> {
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
