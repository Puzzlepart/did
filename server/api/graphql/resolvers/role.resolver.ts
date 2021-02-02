import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { isEmpty, pick } from 'underscore'
import { AzStorageService } from '../../services'
import { IAuthOptions } from '../authChecker'
import { Role, RoleInput } from './role.types'
import { BaseResult } from './types'

@Service()
@Resolver(Role)
export class RoleResolver {
  /**
   * Constructor for RoleResolver
   *
   * AzStorageService is automatically injected using Container from typedi
   *
   * @param {AzStorageService} _azstorage AzStorageService
   */
  constructor(private readonly _azstorage: AzStorageService) { }

  /**
   * Get roles
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [Role], { description: 'Get roles' })
  async roles() {
    return await this._azstorage.getRoles()
  }

  /**
   * Add or update role
   *
   * @permission MANAGE_ROLESPERMISSIONS (cd52a735)
   *
   * @param {RoleInput} role Role
   * @param {boolean} update Update
   */
  @Authorized<IAuthOptions>({ permission: 'cd52a735' })
  @Mutation(() => BaseResult, { description: 'Add or update role' })
  async addOrUpdateRole(
    @Arg('role', () => RoleInput) role: RoleInput,
    @Arg('update', { nullable: true }) update: boolean
  ) {
    try {
      await this._azstorage.addOrUpdateRole(role, update)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }

  /**
   * Delete role
   *
   * @permission MANAGE_ROLESPERMISSIONS (cd52a735)
   *
   * @param {string} name Name
   */
  @Authorized<IAuthOptions>({ permission: 'cd52a735' })
  @Mutation(() => BaseResult, { description: 'Delete role' })
  async deleteRole(
    @Arg('name', () => String) name: string
  ) {
    try {
      await this._azstorage.deleteRole(name)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}
