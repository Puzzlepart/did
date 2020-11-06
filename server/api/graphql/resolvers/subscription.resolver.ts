import 'reflect-metadata'
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { pick } from 'underscore'
import { SubscriptionService } from '../../services'
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
   * Update subscription
   *
   * @param {string} id Subscription ID
   * @param {SubscriptionSettingsInput} settings Settings
   */
  @Authorized()
  @Mutation(() => BaseResult, { description: 'Update subscription' })
  async updateSubscription(@Arg('id') id: string, @Arg('settings', () => SubscriptionSettingsInput) settings: SubscriptionSettingsInput): Promise<BaseResult> {
    try {
      await this._subscription.updateSubscription<SubscriptionSettingsInput>(id, settings)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode'),
      }
    }
  }
}
