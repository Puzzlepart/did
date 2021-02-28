import { FilterQuery } from 'mongodb'
import { pick } from 'underscore'
import { Context } from '../../graphql/context'
import { Customer } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

export class CustomerService extends MongoDocumentService<Customer> {
  constructor(context: Context) {
    super(context, 'customers', CustomerService.name)
  }

  /**
   * Add customer
   *
   * @param customer - Customer to add
   */
  public async addCustomer(customer: Customer): Promise<void> {
    try {
      await this.cache.clear({ key: 'getcustomers' })
      await this.collection.insertOne(customer)
    } catch (error) {
      throw error
    }
  }

  /**
   * Update customer
   *
   * @param customer - Customer to update
   */
  public async updateCustomer(customer: Customer): Promise<void> {
    try {
      await this.cache.clear({ key: 'getcustomers' })
      await this.collection.updateOne(pick(customer, 'key'), { $set: customer })
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete customer
   *
   * @param key - Customer key
   */
  public async deleteCustomer(key: string): Promise<void> {
    try {
      await this.cache.clear({ key: 'getcustomers' })
      await this.collection.deleteOne({ key })
    } catch (error) {
      throw error
    }
  }

  /**
   * Get customers
   *
   * @param query - Query
   */
  public getCustomers(query?: FilterQuery<Customer>): Promise<Customer[]> {
    try {
      return this.cache.usingCache<Customer[]>(
        async () => {
          const customers = await this.find(query)
          return customers
        },
        { key: 'getcustomers' }
      )
    } catch (error) {
      throw error
    }
  }
}
