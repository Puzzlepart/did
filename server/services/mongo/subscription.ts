import { Context } from '../../graphql/context'
import { Subscription } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

export class SubscriptionService extends MongoDocumentService<Subscription> {
  constructor(context: Context) {
    super(context, 'subscriptions')
  }

  /**
   * Get subscription by ID
   *
   * @param {string} id Subscription ID
   */
  public async getById(id: string): Promise<Subscription> {
    try {
      const result = await this.collection.findOne({ id })
      return result
    } catch (err) {
      throw err
    }
  }

  /**
   * Add subscription
   *
   * @param {Subscription} subscription Subscription
   */
  public async addSubscription(subscription: Subscription) {
    try {
      const result = await this.collection.insertOne(subscription)
      return result
    } catch (err) {
      throw err
    }
  }
}
