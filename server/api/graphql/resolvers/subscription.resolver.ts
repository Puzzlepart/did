import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import { SubscriptionService } from '../../services'
import { IAuthOptions } from '../authChecker'
import { Context } from '../context'
import { Subscription, SubscriptionSettingsInput } from './subscription.types'
import { BaseResult } from './types'

@Service()
@Resolver(Subscription)
export class SubscriptionResolver {
  /**
   * Constructor for SubscriptionResolver
   *
   * SubscriptionService is automatically injected using Container from typedi
   *
   * @param {SubscriptionService} _subscription SubscriptionService
   */
  constructor(private readonly _subscription: SubscriptionService) { }

  /**
   * Get current subscription
   */
  @Authorized({ userContext: true })
  @Query(() => Subscription, { description: 'Get current subscription' })
  async subscription(@Ctx() ctx: Context): Promise<Subscription> {
    try {
      return await this._subscription.getSubscription(ctx.subscription.id)
    } catch (error) {
      return null
    }
  }

  /**
   * Update subscription
   * 
   * @permission MANAGE_SUBSCRIPTION (67ba6efc)
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
    try {
      await this._subscription.updateSubscription<SubscriptionSettingsInput>(id, settings)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}
