import { FilterQuery } from 'mongodb'
import { Inject, Service } from 'typedi'
import { pick } from 'underscore'
import { Context } from '../../graphql/context'
import { Role } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

@Service({ global: false })
export class RoleService extends MongoDocumentService<Role> {
  constructor(@Inject('CONTEXT') readonly context: Context) {
    super(context, 'roles')
  }

  /**
   * Get roles
   *
   * @param query - Query
   */
  public async getRoles(query?: FilterQuery<Role>): Promise<Role[]> {
    try {
      const roles = await this.find(query)
      return roles
    } catch (error) {
      throw error
    }
  }

  /**
   * Get Role by name
   *
   * @param name - Role name
   */
  public async getByName(name: string): Promise<Role> {
    try {
      const role = await this.collection.findOne({ name })
      return role
    } catch (error) {
      throw error
    }
  }

  /**
   * Add role
   *
   * @param role - Role
   */
  public async addRole(role: Role) {
    try {
      const result = await this.insert(role)
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Update role
   *
   * @param role - Role
   */
  public async updateRole(role: Role): Promise<void> {
    try {
      await this.collection.updateOne(pick(role, 'name'), role)
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete role
   *
   * @param name - Role name
   */
  public async deleteRole(name: string): Promise<void> {
    try {
      await this.collection.deleteOne({ name })
    } catch (error) {
      throw error
    }
  }
}
