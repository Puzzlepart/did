import { Inject, Service } from 'typedi'
import { omit } from 'underscore'
import { Context } from '../../graphql/context'
import {
  Subscription,
  SubscriptionSettings
} from '../../graphql/resolvers/types'
import { environment } from '../../utils'
import { MongoDocumentService } from './@document'

@Service({ global: false })
export class SubscriptionService extends MongoDocumentService<Subscription> {
  constructor(@Inject('CONTEXT') readonly context: Context) {
    super(
      context,
      'subscriptions',
      null,
      context?.mongoClient?.db(environment('MONGO_DB_DB_NAME'))
    )
  }

  /**
   * Replace id with _id
   *
   * @param subscription - Subscription
   */
  private _replaceId<T>(subscription: Subscription): T {
    return ({
      ...omit(subscription, 'id'),
      _id: subscription.id
    } as unknown) as T
  }

  /**
   * Get subscription by ID
   *
   * @remarks Returns null if no subscription is found.
   *
   * @param id - Subscription ID
   */
  public async getById(id: string): Promise<Subscription> {
    try {
      const subscription = await this.collection.findOne({ _id: id })
      if (!subscription) return null
      return {
        ...subscription,
        id: subscription._id
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Add subscription
   *
   * @param subscription - Subscription
   */
  public async addSubscription(subscription: Subscription) {
    try {
      const result = await this.collection.insertOne(
        this._replaceId(subscription)
      )
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Update subscription
   *
   * @param settings - Subscription settings
   */
  public async updateSubscription(settings: SubscriptionSettings) {
    try {
      const result = await this.update(
        { _id: this.context.subscription.id },
        settings
      )
      return result
    } catch (error) {
      throw error
    }
  }
}
