import * as Mongo from 'mongodb'
import { Role } from '../../graphql/resolvers/types'
import { MongoDocumentServiceService } from './document'

export class RoleMongoService extends MongoDocumentServiceService<Role> {
  constructor(db: Mongo.Db) {
    super(db, 'roles')
  }

  /**
   * Get roles
   *
   * @param {Mongo.FilterQuery<Role>} query Query
   */
  public async getRoles(query?: Mongo.FilterQuery<Role>): Promise<Role[]> {
    try {
      const roles = await this.find(query)
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
      const role = await this.collection.findOne({ name })
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
      const result = await this.collection.insertOne(role)
      return result
    } catch (err) {
      throw err
    }
  }
}
