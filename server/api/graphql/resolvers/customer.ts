/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { pick } from 'underscore'
import AzTableUtilities from '../../../utils/table'
import { Context } from '../context'
import { BaseResult } from '../types'
import { Customer, CustomerInput } from './customer.types'
const { executeBatch, createAzBatch } = new AzTableUtilities()

@Resolver(Customer)
export class CustomerResolver {
  /**
   * Get customers
   *
   * @param {string} sortBy Sort by
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Query(() => [Customer], { description: 'Get customers' })
  async customers(@Arg('sortBy', { nullable: true }) sortBy: string, @Ctx() ctx: Context) {
    return await ctx.services.azstorage.getCustomers({ sortBy })
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
      await ctx.services.azstorage.createOrUpdateCustomer(customer, ctx.user.id, update)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode'),
      }
    }
  }

  /**
   * Delete customer
   *
   * @param {string} key Key
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Delete customer' })
  async deleteCustomer(@Arg('key') key: string, @Ctx() ctx: Context) {
    try {
      const projects = await ctx.services.azstorage.getProjects(key, {
        noParse: true,
      })
      if (projects.length > 0) {
        const batch = projects.reduce((b, entity) => {
          b.deleteEntity(entity)
          return b
        }, createAzBatch())
        await executeBatch('Projects', batch)
      }
      await ctx.services.azstorage.deleteCustomer(key)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode'),
      }
    }
  }
}

export * from './customer.types'
