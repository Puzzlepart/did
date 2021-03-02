/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import {Arg, Authorized, Ctx, Mutation, Query, Resolver} from 'type-graphql'
import {Service} from 'typedi'
import {SubscriptionService} from '../../../services/mongo'
import {IAuthOptions} from '../../authChecker'
import {Context} from '../../context'
import {BaseResult} from '../types'
import {Subscription, SubscriptionSettingsInput} from './types'

/**
 * Resolver for `Subscription`.
 *
 * `SubscriptionService` are injected through
 * _dependendy injection_.
 *
 * @see https://typegraphql.com/docs/dependency-injection.html
 *
 * @category Resolver
 */
@Service()
@Resolver(Subscription)
export class SubscriptionResolver {
  /**
   * Constructor for SubscriptionResolver
   *
   * @param _subscription - Subscription service
   */
  constructor(private readonly _subscription: SubscriptionService) {}

  /**
   * Get current subscription
   */
  @Authorized({userContext: true})
  @Query(() => Subscription, {
    description: 'Get current subscription',
    nullable: true
  })
  subscription(@Ctx() context: Context): Promise<Subscription> {
    return this._subscription.getById(context.subscription.id)
  }

  /**
   * Update subscription
   *
   * @param settings - Settings
   */
  @Authorized<IAuthOptions>({permission: '67ba6efc'})
  @Mutation(() => BaseResult, {description: 'Update subscription'})
  async updateSubscription(
    @Arg('settings', () => SubscriptionSettingsInput)
    settings: SubscriptionSettingsInput
  ): Promise<BaseResult> {
    await this._subscription.updateSubscription(settings)
    return {success: true}
  }
}

export * from './types'
