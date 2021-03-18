/* eslint-disable tsdoc/syntax */
import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { PermissionScope } from '../../../../shared/config/security'
import { RoleService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { BaseResult } from '../types'
import { Role, RoleInput } from './types'

/**
 * Resolver for `Role`.
 *
 * `RoleService` are injected through
 * _dependendy injection_.
 *
 * @see https://typegraphql.com/docs/dependency-injection.html
 *
 * @category GraphQL Resolver
 */
@Service()
@Resolver(Role)
export class RoleResolver {
  /**
   * Constructor for RoleResolver
   *
   * @param _role - Role service
   */
  constructor(private readonly _role: RoleService) {}

  /**
   * Get roles
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [Role], { description: 'Get roles' })
  roles() {
    return this._role.getRoles()
  }

  /**
   * Add or update role
   *
   * @param role - Role
   * @param update - Update
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_ROLESPERMISSIONS })
  @Mutation(() => BaseResult, { description: 'Add or update role' })
  async addOrUpdateRole(
    @Arg('role', () => RoleInput) role: RoleInput,
    @Arg('update', { nullable: true }) update: boolean
  ) {
    await (update ? this._role.updateRole(role) : this._role.addRole(role))
    return { success: true, error: null }
  }

  /**
   * Delete role
   *
   * @param name - Name
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_ROLESPERMISSIONS })
  @Mutation(() => BaseResult, { description: 'Delete role' })
  async deleteRole(@Arg('name', () => String) name: string) {
    await this._role.deleteRole(name)
    return { success: true, error: null }
  }
}

export * from './types'
