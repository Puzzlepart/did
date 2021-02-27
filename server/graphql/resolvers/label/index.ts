/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { MongoService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { BaseResult } from '../types'
import { LabelInput, LabelObject as Label } from './types'

@Service()
@Resolver(Label)
export class LabelResolver {
  /**
   * Constructor for LabelResolver
   *
   * @param _mongo Mongo service
   */
  constructor(private readonly _mongo: MongoService) {}

  /**
   * Get labels
   */
  @Authorized()
  @Query(() => [Label], { description: 'Get labels' })
  labels() {
    return this._mongo.label.getLabels()
  }

  /**
   * Add or update label
   *
   * @param {LabelInput} label Label
   * @param {boolean} update Update
   */
  // @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Add or update label' })
  async addOrUpdateLabel(
    @Arg('label', () => LabelInput) label: LabelInput,
    @Arg('update', { nullable: true }) update: boolean
  ): Promise<BaseResult> {
    const l = new Label(label)
    if (update) await this._mongo.label.updateLabel(l)
    else await this._mongo.label.addLabel(l)
    return { success: true, error: null }
  }

  /**
   * Delete label
   *
   * @param name Name
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Delete label' })
  async deleteLabel(@Arg('name') name: string): Promise<BaseResult> {
    await this._mongo.label.deleteLabel(name)
    return { success: true, error: null }
  }
}

export * from './types'
