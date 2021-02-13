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
}
