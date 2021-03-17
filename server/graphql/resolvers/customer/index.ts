/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
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
  constructor(private readonly _customer: CustomerService) {}

  /**
   * Get customers
   *
   * @param sortBy - Sort by
   **/
  @Authorized()
  @Query(() => [Customer], { description: 'Get customers' })
  customers(@Arg('sortBy', { nullable: true }) sortBy: string) {
    return this._customer.getCustomers()
  }

  /**
   * Create or update customer
   *
   * @param customer - Customer
   * @param update - Update
   */
  @Authorized<IAuthOptions>({ permission: '09909241' })
  @Mutation(() => BaseResult, { description: 'Create or update customer' })
  async createOrUpdateCustomer(
    @Arg('customer', () => CustomerInput) customer: CustomerInput,
    @Arg('update', { nullable: true }) update: boolean
  ) {
    const c = new Customer().fromInput(customer)
    await (update
      ? this._customer.updateCustomer(c)
      : this._customer.addCustomer(c))
    return { success: true, error: null }
  }

  /**
   * Delete customer
   *
   * @param key - Key
   */
  @Authorized({ permission: '8b39db3d' })
  @Mutation(() => BaseResult, { description: 'Delete customer' })
  deleteCustomer(@Arg('key') key: string) {
    return this._customer.deleteCustomer(key)
  }
}

export * from './types'
