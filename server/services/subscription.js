const { first } = require('underscore')
const AzTableUtilities = require('../utils/table')
const env = require('../utils/env')
const { createTableService } = require('azure-storage')

class SubscriptionService {
  constructor() {
    this.tableService = createTableService(env('AZURE_STORAGE_CONNECTION_STRING'))
    this.tableUtil = new AzTableUtilities(this.tableService)
  }
  /**
   * Get the subscription for the specified tenant id
   *
   * Returns null if there's no active subscription
   *
   * @param subscriptionId Subscription ID
   */
  async getSubscription(subscriptionId) {
    try {
      const query = this.tableUtil.createAzQuery(1).where('RowKey eq ?', subscriptionId)
      const { entries } = await this.tableUtil.queryAzTable('Subscriptions', query)
      return this.tableUtil.parseAzEntity(first(entries), { RowKey: 'id' })
    } catch (error) {
      return null
    }
  }

  /**
   * Find subscription for the specified token
   *
   * @param token Request token
   */
  async findSubscriptionWithToken(token) {
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
   * @param name Token name
   * @param subscriptionId Subscription id
   * @param token Request token
   */
  async addApiToken(name, subscriptionId, token) {
    try {
      const { string } = this.tableUtil.azEntGen()
      const entity = await this.tableUtil.addAzEntity('ApiTokens', {
        PartitionKey: string(subscriptionId),
        RowKey: string(name),
        Token: string(token),
      })
      return entity
    } catch (error) {
      return null
    }
  }

  /**
   * Remove token for the user subscription
   *
   * @param name Token name
   * @param subscriptionId Subscription id
   */
  async deleteApiToken(name, subscriptionId) {
    try {
      const { string } = this.tableUtil.azEntGen()
      const result = await this.tableUtil.deleteEntity('ApiTokens', {
        PartitionKey: string(subscriptionId),
        RowKey: string(name),
      })
      return result
    } catch (error) {
      return null
    }
  }

  /**
   * Get tokens for the user subscription
   *
   * @param subscriptionId Subscription id
   */
  async getApiTokens(subscriptionId) {
    try {
      const query = this.tableUtil.createAzQuery(100).where('PartitionKey eq ?', subscriptionId)
      const result = await this.tableUtil.queryAzTable('ApiTokens', query)
      return this.tableUtil.parseAzEntities(result, { RowKey: 'name' }).entries
    } catch (error) {
      return null
    }
  }
}

module.exports = new SubscriptionService()
