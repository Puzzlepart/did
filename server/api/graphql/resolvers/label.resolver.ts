import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { pick } from 'underscore'
import { Context } from '../context'
import { BaseResult } from '../types'
import { LabelObject, LabelInput } from './label.types'

@Resolver(LabelObject)
export class LabelResolver {
  /**
   * Get labels
   *
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Query(() => [LabelObject], { description: 'Get labels' })
  async labels(@Ctx() ctx: Context) {
    return await ctx.services.azstorage.getLabels()
  }

  /**
   * Add or update label
   *
   * @param {LabelInput} label Label
   * @param {boolean} update Update
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Add or update label' })
  async addOrUpdateLabel(
    @Arg('label', () => LabelInput) label: LabelInput,
    @Arg('update', { nullable: true }) update: boolean,
    @Ctx() ctx: Context
  ) {
    try {
      await ctx.services.azstorage.addOrUpdateLabel(label, ctx.user.id, update)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }

  /**
   * Delete label
   *
   * @param {string} name Name
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Delete label' })
  async deleteLabel(@Arg('name') name: string, @Ctx() ctx: Context) {
    try {
      await ctx.services.azstorage.deleteLabel(name)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}