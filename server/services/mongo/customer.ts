import { Db as MongoDatabase, FilterQuery } from 'mongodb'
import { pick } from 'underscore'
import { Customer } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

export class CustomerMongoService extends MongoDocumentService<Customer> {
  constructor(db: MongoDatabase) {
    super(db, 'customers')
  }

  /**
   * Add customer
   *
   * @param {Customer} customer Customer to add
   */
  public async addCustomer(customer: Customer): Promise<void> {
    try {
      await this.collection.insertOne(customer)
    } catch (err) {
      throw err
    }
  }

  /**
   * Update customer
   *
   * @param {Customer} customer Customer to update
   */
  public async updateCustomer(customer: Customer): Promise<void> {
    try {
      await this.collection.updateOne(pick(customer, 'key'), { $set: customer })
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete customer
   *
   * @param {string} key Customer key
   */
  public async deleteCustomer(key: string): Promise<void> {
    try {
      await this.collection.deleteOne({ key })
    } catch (err) {
      throw err
    }
  }

  /**
   * Get customers
   *
   * @param {FilterQuery<Customer>} query Query
   */
  public async getCustomers(query?: FilterQuery<Customer>): Promise<Customer[]> {
    try {
      const customers = await this.find(query)
      return customers
    } catch (err) {
      throw err
    }
  }
}
