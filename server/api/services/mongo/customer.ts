import * as Mongo from 'mongodb'
import { Customer } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './document'

export class CustomerMongoService extends MongoDocumentService<Customer> {
  constructor(db: Mongo.Db) {
    super(db, 'customers')
  }

  /**
   * Get customers
   *
   * @param {Mongo.FilterQuery<Customer>} query Query
   */
  public async getCustomers(query?: Mongo.FilterQuery<Customer>): Promise<Customer[]> {
    try {
      const customers = await this.find(query)
      return customers
    } catch (err) {
      throw err
    }
  }
}
