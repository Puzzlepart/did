import * as Mongo from 'mongodb'
import { Customer } from '../../graphql/resolvers/types'

export class CustomerMongoService {
  private _collectionName = 'customers'
  private _collection: Mongo.Collection<Customer>

  /**
   * Constructor
   *
   * @param {Mongo.Db} db Mongo database
   */
  constructor(db: Mongo.Db) {
    this._collection = db.collection(this._collectionName)
  }

  /**
   * Get customers
   *
   * @param {Mongo.FilterQuery<Customer>} query Query
   */
  public async getCustomers(query?: Mongo.FilterQuery<Customer>): Promise<Customer[]> {
    try {
      const customers = await this._collection.find(query).toArray()
      return customers
    } catch (err) {
      throw err
    }
  }
}
