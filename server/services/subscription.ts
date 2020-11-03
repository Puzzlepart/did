import { first } from 'underscore'
import AzTableUtilities from '../utils/table'
import env from '../utils/env'
import azurestorage from 'azure-storage'

class SubscriptionService {
  public tableService: azurestorage.services.table.TableService
  public tableUtil: AzTableUtilities

  constructor() {
    this.tableService = azurestorage.createTableService(env('AZURE_STORAGE_CONNECTION_STRING'))
    this.tableUtil = new AzTableUtilities(this.tableService)
  }
  /**
   * Get the subscription for the specified tenant id
   *
   * Returns null if there's no active subscription
   *
   * @param {string} subscriptionId Subscription ID
   */
  async getSubscription<T = any>(subscriptionId: string): Promise<T> {
    try {
      const query = this.tableUtil.createAzQuery(1).where('RowKey eq ?', subscriptionId)
      const { entries } = await this.tableUtil.queryAzTable('Subscriptions', query, { RowKey: 'id' })
      return first(entries)
    } catch (error) {
      return null
    }
  }

  /**
   * Update subscription
   *
   * @param {string} subscriptionId Subscription ID
   * @param {T} settings Settings
   */
  async updateSubscription<T = any>(subscriptionId: string, settings: T): Promise<azurestorage.TableService.EntityMetadata> {
    const entityDescriptor = this.tableUtil.convertToAzEntity(subscriptionId, { settings }, 'Default', { typeMap: { settings: 'json' } })
    return await this.tableUtil.updateAzEntity('Subscriptions', entityDescriptor, true)
  }

  /**
   * Find subscription for the specified token
   *
   * @param {string} token Request token
   */
  async findSubscriptionWithToken<T = any>(token: string): Promise<T> {
    try {
      const query = this.tableUtil.createAzQuery(1).where('Token eq ?', token)
      const { entries } = await this.tableUtil.queryAzTable('ApiTokens', query)
      const tokenEntry = this.tableUtil.parseAzEntity(first(entries))
      if (tokenEntry) return this.getSubscription(tokenEntry.partitionKey)
      return null
    } catch (error) {
      return null
    }
  }

  /**
   * Add token for the user subscription
   *
   * @param {string} {string} name Token name
   * @param {string} subscriptionId Subscription id
   * @param {string} token Request token
   */
  async addApiToken(name: string, subscriptionId: string, token: string): Promise<azurestorage.TableService.EntityMetadata>  {
    try {
      const { string } = this.tableUtil.azEntGen()
      return await this.tableUtil.addAzEntity('ApiTokens', {
        PartitionKey: string(subscriptionId),
        RowKey: string(name),
        Token: string(token),
      })
    } catch (error) {
      return null
    }
  }

  /**
   * Remove token for the user subscription
   *
   * @param {string} name Token name
   * @param {string} subscriptionId Subscription id
   */
  async deleteApiToken(name: string, subscriptionId: string): Promise<void> {
    try {
      const { string } = this.tableUtil.azEntGen()
      await this.tableUtil.deleteEntity('ApiTokens', {
        PartitionKey: string(subscriptionId),
        RowKey: string(name),
      })
    } catch (error) {
      return null
    }
  }

  /**
   * Get tokens for the user subscription
   *
   * @param {string} subscriptionId Subscription id
   */
  async getApiTokens<T = any>(subscriptionId: string): Promise<T[]> {
    try {
      const query = this.tableUtil.createAzQuery(100).where('PartitionKey eq ?', subscriptionId)
      const result = await this.tableUtil.queryAzTable('ApiTokens', query, { RowKey: 'name' })
      return result.entries
    } catch (error) {
      return null
    }
  }
}

export default SubscriptionService
