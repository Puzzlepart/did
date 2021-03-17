/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { LabelService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { BaseResult } from '../types'
import { LabelInput, LabelObject as Label } from './types'

/**
 * Resolver for `Label`.
 *
 * `LabelService` are injected through
 * _dependendy injection_.
 *
 * @see https://typegraphql.com/docs/dependency-injection.html
 *
 * @category GraphQL Resolver
 */
@Service()
@Resolver(Label)
export class LabelResolver {
  /**
   * Constructor for LabelResolver
   *
   * @param _label - Label service
   */
  constructor(private readonly _label: LabelService) {}

  /**
   * Get labels
   */
  @Authorized()
  @Query(() => [Label], { description: 'Get labels' })
  labels() {
    return this._label.getLabels()
  }

  /**
   * Add or update label
   *
   * @param label - Label
   * @param update - Update
   */
  // @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Add or update label' })
  async addOrUpdateLabel(
    @Arg('label', () => LabelInput) label: LabelInput,
    @Arg('update', { nullable: true }) update: boolean
  ): Promise<BaseResult> {
    const l = new Label(label)
    await (update ? this._label.updateLabel(l) : this._label.addLabel(l))
    return { success: true, error: null }
  }

  /**
   * Delete label by name
   *
   * @param name - Name
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, { description: 'Delete label' })
  async deleteLabel(@Arg('name') name: string): Promise<BaseResult> {
    await this._label.deleteLabel(name)
    return { success: true, error: null }
  }
}

export * from './types'
