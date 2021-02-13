/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { MongoService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { Context } from '../../context'
import { BaseResult } from '../types'
import { Customer, CustomerInput } from './types'

@Service()
@Resolver(Customer)
export class CustomerResolver {
  /**
   * Constructor for CustomerResolver
   * 
   * @param {MongoService} _mongo Mongo service
   */
  constructor(private readonly _mongo: MongoService) { }

  /**
   * Get customers
   *
   * @param {string} sortBy Sort by
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
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ permission: '09909241' })
  @Mutation(() => BaseResult, { description: 'Create or update customer' })
  async createOrUpdateCustomer(
    @Arg('customer', () => CustomerInput) customer: CustomerInput,
    @Arg('update', { nullable: true }) update: boolean,
    @Ctx() ctx: Context
  ) {
    return await Promise.resolve({ success: true, error: null })
  }

  /**
   * Delete customer
   *
   * @param {string} key Key
   */
  @Authorized({ permission: '8b39db3d' })
  @Mutation(() => BaseResult, { description: 'Delete customer' })
  async deleteCustomer(@Arg('key') key: string) {
    return await Promise.resolve({ success: true, error: null })
  }
}

export * from './types'
