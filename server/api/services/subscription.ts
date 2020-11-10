import { first } from 'underscore'
import AzTableUtilities from '../../utils/table'
import env from '../../utils/env'
import azurestorage from 'azure-storage'
import 'reflect-metadata'
import { Service } from 'typedi'

@Service({ global: true })
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
  async getSubscription(subscriptionId: string) {
    try {
      const query = this.tableUtil.createAzQuery(1).where('RowKey eq ?', subscriptionId)
      const { entries } = await this.tableUtil.queryAzTable('Subscriptions', query, {
        columnMap: { RowKey: 'id' }
      })
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
  async updateSubscription<T = any>(
    subscriptionId: string,
    settings: T
  ): Promise<azurestorage.TableService.EntityMetadata> {
    const entityDescriptor = this.tableUtil.convertToAzEntity(subscriptionId, { settings }, 'Default', {
      typeMap: { settings: 'json' }
    })
    return await this.tableUtil.updateAzEntity('Subscriptions', entityDescriptor, true)
  }

  /**
   * Find subscription for the specified token
   *
   * @param {string} token Request token
   */
  async findSubscriptionWithToken(token: string) {
    try {
      const query = this.tableUtil.createAzQuery(1).where('Token eq ?', token)
      const { entries } = await this.tableUtil.queryAzTable('ApiTokens', query, {
        columnMap: {
          PartitionKey: 'subscriptionId'
        }
      })
      const { subscriptionId } = first(entries)
      return this.getSubscription(subscriptionId)
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
  async addApiToken(name: string, subscriptionId: string, token: string) {
    try {
      const { string } = this.tableUtil.azEntGen()
      const entity = await this.tableUtil.addAzEntity('ApiTokens', {
        PartitionKey: string(subscriptionId),
        RowKey: string(name),
        Token: string(token)
      })
      return entity
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
  async deleteApiToken(name: string, subscriptionId: string) {
    try {
      const { string } = this.tableUtil.azEntGen()
      const result = await this.tableUtil.deleteEntity('ApiTokens', {
        PartitionKey: string(subscriptionId),
        RowKey: string(name)
      })
      return result
    } catch (error) {
      return null
    }
  }

  /**
   * Get tokens for the user subscription
   *
   * @param {string} subscriptionId Subscription id
   */
  async getApiTokens(subscriptionId: string) {
    try {
      const query = this.tableUtil.createAzQuery(100).where('PartitionKey eq ?', subscriptionId)
      const { entries } = await this.tableUtil.queryAzTable('ApiTokens', query, {
        columnMap: {
          RowKey: 'name',
          Timestamp: 'created'
        }
      })
      return entries
    } catch (error) {
      return null
    }
  }
}

export default SubscriptionService
