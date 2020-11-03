import 'reflect-metadata'
import { Context } from '../context'
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql'
import { pick } from 'underscore'
import { BaseResult } from '../types'
import { Subscription, SubscriptionSettingsInput } from './subscription.types'

@Resolver(Subscription)
export class SubscriptionResolver {
  /**
   * Update subscription
   *
   * @param {string} id Subscription ID
   * @param {SubscriptionSettingsInput} settings Settings
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Update subscription' })
  async updateSubscription(
    @Arg('id') id: string,
    @Arg('settings', () => SubscriptionSettingsInput) settings: SubscriptionSettingsInput,
    @Ctx() ctx: Context
  ): Promise<BaseResult> {
    try {
      await ctx.services.subscription.updateSubscription<SubscriptionSettingsInput>(id, settings)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode'),
      }
    }
  }
}

export * from './subscription.types'
