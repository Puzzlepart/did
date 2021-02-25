import { FilterQuery } from 'mongodb'
import { pick } from 'underscore'
import { Context } from '../../graphql/context'
import { Role } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

export class RoleService extends MongoDocumentService<Role> {
  constructor(context: Context) {
    super(context, 'roles')
  }


  /**
   * Get roles
   *
   * @param {FilterQuery<Role>} query Query
   */
  public async getRoles(query?: FilterQuery<Role>): Promise<Role[]> {
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

  /**
   * Update role
   *
   * @param {Role} role Role
   */
  public async updateRole(role: Role): Promise<void> {
    try {
      await this.collection.updateOne(pick(role, 'name'), { $set: role })
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete role
   *
   * @param {string} name Role name
   */
  public async deleteRole(name: string): Promise<void> {
    try {
      await this.collection.deleteOne({ name })
    } catch (err) {
      throw err
    }
  }
}
