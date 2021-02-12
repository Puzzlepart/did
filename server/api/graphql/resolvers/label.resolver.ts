/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import { IAuthOptions } from '../authChecker'
import { Context } from '../context'
import { LabelInput, LabelObject } from './label.types'
import { BaseResult } from './types'

@Service()
@Resolver(LabelObject)
export class LabelResolver {
  /**
   * Constructor for LabelResolver
   */
  constructor() {}

  /**
   * Get labels
   */
  @Authorized()
  @Query(() => [LabelObject], { description: 'Get labels' })
  async labels() {
    return await Promise.resolve([])
    //return await this._azstorage.getLabels()
  }

  /**
   * Add or update label
   *
   * @param {LabelInput} label Label
   * @param {boolean} update Update
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Add or update label' })
  async addOrUpdateLabel(
    @Arg('label', () => LabelInput) label: LabelInput,
    @Arg('update', { nullable: true }) update: boolean,
    @Ctx() ctx: Context
  ) {
    return await Promise.resolve({ success: true, error: null })
    // try {
    //   await this._azstorage.addOrUpdateLabel(label, ctx.userId, update)
    //   return { success: true, error: null }
    // } catch (error) {
    //   return {
    //     success: false,
    //     error: pick(error, 'name', 'message', 'code', 'statusCode')
    //   }
    // }
  }

  /**
   * Delete label
   *
   * @param {string} name Name
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Delete label' })
  async deleteLabel(@Arg('name') name: string) {
    return await Promise.resolve({ success: true, error: null })
    // try {
    //   await this._azstorage.deleteLabel(name)
    //   return { success: true, error: null }
    // } catch (error) {
    //   return {
    //     success: false,
    //     error: pick(error, 'name', 'message', 'code', 'statusCode')
    //   }
    // }
  }
}
