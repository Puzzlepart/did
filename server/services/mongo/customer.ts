import { FilterQuery } from 'mongodb'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { RequestContext } from '../../graphql/requestContext'
import { Customer } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './document'
import { LabelService } from './label'

/**
 * Customer service
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class CustomerService extends MongoDocumentService<Customer> {
  /**
   * Constructor for `CustomerService`
   *
   * @param context - Injected context through `typedi`
   * @param _labelSvc - Injected `LabelService` through `typedi`
   */
  constructor(
    @Inject('CONTEXT') readonly context: RequestContext,
    private readonly _labelSvc: LabelService
  ) {
    super(context, 'customers', CustomerService.name)
  }

  /**
   * Adds a new customer to the database.
   *
   * @param customer - The customer object to be added.
   * @returns A promise that resolves when the customer has been added.
   *
   * @remarks
   * This method clears the cache for 'getcustomers' before adding the new customer.
   * The customer's key is converted to uppercase and used as the `_id` in the database.
   */
  public async addCustomer(customer: Customer): Promise<void> {
    await this.cache.clear('getcustomers')
    const key = customer.key.toUpperCase()
    await this.insert({
      _id: key,
      ...customer,
      key
    })
  }

  /**
   * Update customer
   *
   * @param customer - Customer to update
   */
  public async updateCustomer(customer: Customer): Promise<void> {
    try {
      await this.cache.clear('getcustomers')
      await this.update(_.pick(customer, 'key'), customer)
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete customer by key.
   *
   * @param key - Customer key
   */
  public async deleteCustomer(key: string): Promise<boolean> {
    try {
      await this.cache.clear('getcustomers')
      const { result } = await this.collection.deleteOne({ key })
      return result.ok === 1 && result.n === 1
    } catch (error) {
      throw error
    }
  }

  /**
   * Get customers from cache or database using the provided `query`.
   * The result is sorted by the `name` property, then labels are
   * added to each customer based on the `labels` property.
   *
   * @param query - Query
   */
  public getCustomers(query?: FilterQuery<Customer>): Promise<Customer[]> {
    try {
      return this.cache.usingCache<Customer[]>(
        async () => {
          const [customers, labels] = await Promise.all([
            this.find(query, { name: 1 }) as Promise<Customer[]>,
            this._labelSvc.getLabels()
          ])
          const _customers = customers.map((c) => {
            c.labels = _.filter(labels, (l) => _.contains(c.labels, l.name))
            return c
          })
          return _customers
        },
        { key: ['getcustomers', query] }
      )
    } catch (error) {
      throw error
    }
  }
}
