import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import { AzStorageService } from '../../services'
import { IAuthOptions } from '../authChecker'
import { Context } from '../context'
import { LabelInput, LabelObject } from './label.types'
import { BaseResult } from './types'

@Service()
@Resolver(LabelObject)
export class LabelResolver {
  /**
   * Constructor for LabelResolver
   *
   * AzStorageService is automatically injected using Container from typedi
   *
   * @param {AzStorageService} _azstorage AzStorageService
   */
  constructor(private readonly _azstorage: AzStorageService) { }

  /**
   * Get labels
   */
  @Authorized()
  @Query(() => [LabelObject], { description: 'Get labels' })
  async labels() {
    return await this._azstorage.getLabels()
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
    try {
      await this._azstorage.addOrUpdateLabel(label, ctx.userId, update)
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
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Delete label' })
  async deleteLabel(@Arg('name') name: string) {
    try {
      await this._azstorage.deleteLabel(name)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}
