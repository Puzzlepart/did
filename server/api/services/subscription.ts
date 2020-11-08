import { first } from 'underscore'
import AzTableUtilities from '../../utils/table'
import env from '../../utils/env'
import azurestorage from 'azure-storage'
import 'reflect-metadata'
import { Service } from 'typedi'
import jwt from 'jsonwebtoken'

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
   * Get token by apiKey
   *
   * @param {string} apiKey API key
   */
  async getToken(apiKey: string) {
    try {
      const query = this.tableUtil.createAzQuery(1).where('ApiKey eq ?', apiKey)
      const { entries } = await this.tableUtil.queryAzTable('ApiTokens', query, {
        PartitionKey: 'subscriptionId',
      })
      // eslint-disable-next-line no-console
      console.log(entries)
      // eslint-disable-next-line no-console
      console.log('ApiKey eq ?', apiKey)
      const { subscriptionId } = first(entries)
      const subscription = await this.getSubscription(subscriptionId)
      const data = jwt.verify(apiKey, subscription.apiTokenSecret) as any
      return { subscription, ...data }
    } catch (error) {
      return null
    }
  }

  /**
   * Add token for the user subscription
   *
   * @param {any} name Token name
   * @param {string} subscriptionId Subscription id
   */
  async addApiToken(token: any, subscriptionId: string) {
    try {
      const { string, datetime } = this.tableUtil.azEntGen()
      const apiKey = jwt.sign(
        {
          permissions: token.permissions,
          expires: token.expires,
        },
        env('API_TOKEN_SECRET')
      )
      await this.tableUtil.addAzEntity('ApiTokens', {
        PartitionKey: string(subscriptionId),
        RowKey: string(token.name),
        Expires: datetime(token.expires),
        ApiKey: string(apiKey)
      })
      return apiKey
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
        RowKey: 'name',
        Timestamp: 'created'
      })
      return entries
    } catch (error) {
      return null
    }
  }
}

export default SubscriptionService
