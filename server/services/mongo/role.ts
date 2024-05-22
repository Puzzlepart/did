import { FilterQuery } from 'mongodb'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { RequestContext } from '../../graphql/requestContext'
import { Role } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './document'

/**
 * Role service
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class RoleService extends MongoDocumentService<Role> {
  /**
   * Constructor for `RoleService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
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
      await this.update(_.pick(role, 'name'), role)
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
