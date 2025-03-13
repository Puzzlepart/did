/* eslint-disable @typescript-eslint/no-unused-vars */
import _ from 'lodash'
import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { PermissionScope } from '../../../../shared/config/security'
import { CustomerService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { BaseResult } from '../types'
import { Customer, CustomerInput } from './types'

/**
 * Resolver for `Customer`.
 *
 * `CustomerService` are injected through
 * _dependendy injection_.
 *
 * @see https://typegraphql.com/docs/dependency-injection.html
 *
 * @category GraphQL Resolver
 */
@Service()
@Resolver(Customer)
export class CustomerResolver {
  /**
   * Constructor for CustomerResolver
   *
   * @param _customer - Customer service
   */
  constructor(private readonly _customer: CustomerService) {
    // Empty constructor. Probably this will be empty
    // until they release the new GTA game.
    // I'm really looking forward to that.
  }

  /**
   * Get customers
   **/
  @Authorized()
  @Query(() => [Customer], { description: 'Get customers' })
  customers() {
    return this._customer.getCustomers()
  }

  /**
   * Create or update customer
   *
   * @param customer - Customer
   * @param update - Update
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_CUSTOMERS })
  @Mutation(() => BaseResult, { description: 'Create or update customer' })
  async createOrUpdateCustomer(
    @Arg('customer', () => CustomerInput) customer: CustomerInput,
    @Arg('update', { nullable: true }) update: boolean
  ) {
    await (update
      ? this._customer.updateCustomer(customer as Customer)
      : this._customer.addCustomer(customer as Customer))
    return { success: true }
  }

  /**
   * Delete customer by key.
   *
   * @param key - Key
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.DELETE_CUSTOMERS })
  @Mutation(() => BaseResult, { description: 'Delete customer' })
  public async deleteCustomer(@Arg('key') key: string) {
    try {
      const success = await this._customer.deleteCustomer(key)
      return { success, error: null }
    } catch (error) {
      return {
        success: false,
        error: _.pick(error, ['name', 'message', 'code', 'statusCode'])
      }
    }
  }
}

export * from './types'
