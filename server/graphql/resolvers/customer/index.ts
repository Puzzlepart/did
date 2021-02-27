/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { MongoService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { BaseResult } from '../types'
import { Customer, CustomerInput } from './types'

@Service()
@Resolver(Customer)
export class CustomerResolver {
  /**
   * Constructor for CustomerResolver
   *
   * @param _mongo Mongo service
   */
  constructor(private readonly _mongo: MongoService) {}

  /**
   * Get customers
   *
   * @param sortBy Sort by
   **/
  @Authorized()
  @Query(() => [Customer], { description: 'Get customers' })
  customers(@Arg('sortBy', { nullable: true }) sortBy: string) {
    return this._mongo.customer.getCustomers()
  }

  /**
   * Create or update customer
   *
   * @param {CustomerInput} customer Customer
   * @param {boolean} update Update
   */
  @Authorized<IAuthOptions>({ permission: '09909241' })
  @Mutation(() => BaseResult, { description: 'Create or update customer' })
  async createOrUpdateCustomer(
    @Arg('customer', () => CustomerInput) customer: CustomerInput,
    @Arg('update', { nullable: true }) update: boolean
  ) {
    const c = new Customer().fromInput(customer)
    if (update) await this._mongo.customer.updateCustomer(c)
    else await this._mongo.customer.addCustomer(c)
    return { success: true, error: null }
  }

  /**
   * Delete customer
   *
   * @param key Key
   */
  @Authorized({ permission: '8b39db3d' })
  @Mutation(() => BaseResult, { description: 'Delete customer' })
  deleteCustomer(@Arg('key') key: string) {
    return this._mongo.customer.deleteCustomer(key)
  }
}

export * from './types'
