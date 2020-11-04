import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import { AzStorageService } from '../../services'
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
  constructor(private readonly _azstorage: AzStorageService) {}

  /**
   * Get roles
   */
  @Authorized()
  @Query(() => [Role], { description: 'Get roles' })
  async roles() {
    return await this._azstorage.getRoles()
  }

  /**
   * Add or update role
   *
   * @param {RoleInput} role Role
   * @param {boolean} update Update
   */
  @Authorized()
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
}
