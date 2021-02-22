/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { MongoService } from 'services/mongo'
import { IAuthOptions } from '../../authChecker'
import { Context } from '../../context'
import { BaseResult } from '../types'
import { Subscription, SubscriptionSettingsInput } from './types'

@Service()
@Resolver(Subscription)
export class SubscriptionResolver {
  /**
   * Constructor for SubscriptionResolver
   *
   * @param {MongoService} _mongo Mongo service
   */
  constructor(private readonly _mongo: MongoService) {}

  /**
   * Get current subscription
   */
  @Authorized({ userContext: true })
  @Query(() => Subscription, { description: 'Get current subscription', nullable: true })
  subscription(@Ctx() ctx: Context): Promise<Subscription> {
    return this._mongo.subscription.getById(ctx.subscription.id)
  }

  /**
   * Update subscription
   *
   * @param {string} id Subscription ID
   * @param {SubscriptionSettingsInput} settings Settings
   */
  @Authorized<IAuthOptions>({ permission: '67ba6efc' })
  @Mutation(() => BaseResult, { description: 'Update subscription' })
  async updateSubscription(
    @Arg('id') id: string,
    @Arg('settings', () => SubscriptionSettingsInput) settings: SubscriptionSettingsInput
  ): Promise<BaseResult> {
    return await Promise.resolve({
      success: true,
      error: null
    })
  }
}

export * from './types'
