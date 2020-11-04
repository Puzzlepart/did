import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import AzTableUtilities from '../../../utils/table'
import { AzStorageService } from '../../services'
import { Context } from '../context'
import { Customer, CustomerInput } from './customer.types'
import { BaseResult } from './types'
const { executeBatch, createAzBatch } = new AzTableUtilities()

@Service()
@Resolver(Customer)
export class CustomerResolver {
  /**
   * Constructor for CustomerResolver
   * 
   * AzStorageService is automatically injected using Container from typedi
   * 
   * @param {AzStorageService} _azstorage AzStorageService
   */
  constructor(private readonly _azstorage: AzStorageService) {}

  /**
   * Get customers
   *
   * @param {string} sortBy Sort by
   **/
  @Authorized()
  @Query(() => [Customer], { description: 'Get customers' })
  async customers(@Arg('sortBy', { nullable: true }) sortBy: string) {
    return await this._azstorage.getCustomers({ sortBy })
  }

  /**
   * Create or update customer
   *
   * @param {CustomerInput} customer Customer
   * @param {boolean} update Update
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Create or update customer' })
  async createOrUpdateCustomer(
    @Arg('customer', () => CustomerInput) customer: CustomerInput,
    @Arg('update', { nullable: true }) update: boolean,
    @Ctx() ctx: Context
  ) {
    try {
      await this._azstorage.createOrUpdateCustomer(customer, ctx.user.id, update)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }

  /**
   * Delete customer
   *
   * @param {string} key Key
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Delete customer' })
  async deleteCustomer(@Arg('key') key: string) {
    try {
      const projects = await this._azstorage.getProjects(key, {
        noParse: true
      })
      if (projects.length > 0) {
        const batch = projects.reduce((b, entity) => {
          b.deleteEntity(entity)
          return b
        }, createAzBatch())
        await executeBatch('Projects', batch)
      }
      await this._azstorage.deleteCustomer(key)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}
