import * as Mongo from 'mongodb'
import { Subscription } from 'server/api/graphql/resolvers/types'

export class SubscriptionMongoService {
  private _collectionName = 'subscriptions'
  private _collection: Mongo.Collection<Subscription>

  /**
   * Constructor
   *
   * @param {Mongo.Db} db Mongo database
   */
  constructor(db: Mongo.Db) {
    this._collection = db.collection(this._collectionName)
  }

  /**
   * Get subscription by ID
   *
   * @param {string} id Subscription ID
   */
  public async getById(id: string): Promise<Subscription> {
    try {
      const result = await this._collection.findOne({ id })
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
      const result = await this._collection.insertOne(subscription)
      return result
    } catch (err) {
      throw err
    }
  }
}
