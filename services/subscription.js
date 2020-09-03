const { first } = require('underscore')
const TableUtil = require('../utils/table')
const { createTableService } = require('azure-storage')

class SubscriptionService {
  constructor() {
    this.tableService = createTableService(process.env.AZURE_STORAGE_CONNECTION_STRING)
    this.tableUtil = new TableUtil(this.tableService)
  }
  /**
   * Get the subscription for the specified tenant id 
   * 
   * Returns null if there's no active subscription
   * 
   * @param tenantId Tenant ID
   */
  async getSubscription(tenantId) {
    try {
      const query = this.tableUtil.createAzQuery(1).where('RowKey eq ?', tenantId)
      var { entries } = await this.tableUtil.queryAzTable('Subscriptions', query)
      return this.tableUtil.parseAzEntity(first(entries))
    } catch (error) {
      return null;
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
      var { entries } = await this.tableUtil.queryAzTable('ApiTokens', query)
      let tokenEntry = this.tableUtil.parseAzEntity(first(entries))
      if (tokenEntry) return this.getSubscription(tokenEntry.partitionKey)
      return null
    } catch (error) {
      return null;
    }
  }

  /**
   * Add token for the user subscription
   * 
   * @param name Token name
   * @param tenantId Tenant id
   * @param token Request token
   */
  async addApiToken(name, tenantId, token) {
    try {
      const { string } = this.tableUtil.azEntGen()
      const entity = await this.tableUtil.addAzEntity(
        'ApiTokens',
        {
          PartitionKey: string(tenantId),
          RowKey: string(name),
          Token: string(token)
        }
      )
      return entity
    } catch (error) {
      return null;
    }
  }

  /**
   * Remove token for the user subscription
   * 
   * @param name Token name
   * @param tenantId Tenant id
   */
  async deleteApiToken(name, tenantId) {
    try {
      const { string } = this.tableUtil.azEntGen()
      const result = await this.tableUtil.deleteEntity(
        'ApiTokens',
        {
          PartitionKey: string(tenantId),
          RowKey: string(name),
        }
      )
      return result
    } catch (error) {
      return null;
    }
  }

  /**
   * Get tokens for the user subscription
   * 
   * @param tenantId Tenant id
   */
  async getApiTokens(tenantId) {
    try {
      const query = this.tableUtil.createAzQuery(100).where('PartitionKey eq ?', tenantId)
      const result = await this.tableUtil.queryAzTable('ApiTokens', query)
      return this.tableUtil.parseAzEntities(result, { RowKey: 'name' }).entries
    } catch (error) {
      return null;
    }
  }
}

module.exports = new SubscriptionService()