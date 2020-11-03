/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { pick } from 'underscore'
import { Context } from '../context'
import { BaseResult, OutlookCategory } from '../types'

@Resolver(OutlookCategory)
export class OutlookCategoryResolver {
  /**
   * Get Outlook categories
   *
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Query(() => [OutlookCategory], { description: 'Get Outlook categories' })
  async outlookCategories(@Ctx() ctx: Context) {
    const categories = await ctx.services.msgraph.getOutlookCategories()
    return categories.map((c) => ({ ...c, key: c.id }))
  }

  /**
   * Create Outlook category
   *
   * @param {string} category Category
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Create Outlook category' })
  async createOutlookCategory(@Arg('category') category: string, @Ctx() ctx: Context) {
    try {
      await ctx.services.msgraph.createOutlookCategory(category)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}