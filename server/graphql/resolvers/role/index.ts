/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { MongoService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { BaseResult } from '../types'
import { Role, RoleInput } from './types'

@Service()
@Resolver(Role)
export class RoleResolver {
  /**
   * Constructor for RoleResolver
   *
   * @param _mongo - Mongo service
   */
  constructor(private readonly _mongo: MongoService) {}

  /**
   * Get roles
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [Role], { description: 'Get roles' })
  roles() {
    return this._mongo.role.getRoles()
  }

  /**
   * Add or update role
   *
   * @param role - Role
   * @param update - Update
   */
  @Authorized<IAuthOptions>({ permission: 'cd52a735' })
  @Mutation(() => BaseResult, { description: 'Add or update role' })
  async addOrUpdateRole(
    @Arg('role', () => RoleInput) role: RoleInput,
    @Arg('update', { nullable: true }) update: boolean
  ) {
    if (update) await this._mongo.role.updateRole(role)
    else await this._mongo.role.addRole(role)
    return { success: true, error: null }
  }

  /**
   * Delete role
   *
   * @param name - Name
   */
  @Authorized<IAuthOptions>({ permission: 'cd52a735' })
  @Mutation(() => BaseResult, { description: 'Delete role' })
  async deleteRole(@Arg('name', () => String) name: string) {
    await this._mongo.role.deleteRole(name)
    return { success: true, error: null }
  }
}

export * from './types'
