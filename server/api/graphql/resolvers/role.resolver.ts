/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata'
import { MongoService } from '../..//services/mongo'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import { IAuthOptions } from '../authChecker'
import { Role, RoleInput } from './role.types'
import { BaseResult } from './types'

@Service()
@Resolver(Role)
export class RoleResolver {
  /**
   * Constructor for RoleResolver
   *
   * @param {MongoService} _mongo Mongo service
   */
  constructor(private readonly _mongo: MongoService) { }

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
    return await Promise.resolve({ success: true, error: null })
    // try {
    //   await this._azstorage.addOrUpdateRole(role, update)
    //   return { success: true, error: null }
    // } catch (error) {
    //   return {
    //     success: false,
    //     error: pick(error, 'name', 'message', 'code', 'statusCode')
    //   }
    // }
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
  async deleteRole(@Arg('name', () => String) name: string) {
    return await Promise.resolve({ success: true, error: null })
    // try {
    //   await this._azstorage.deleteRole(name)
    //   return { success: true, error: null }
    // } catch (error) {
    //   return {
    //     success: false,
    //     error: pick(error, 'name', 'message', 'code', 'statusCode')
    //   }
    // }
  }
}
