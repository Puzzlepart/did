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
      const query = this.tableUtil.createQuery(1).where('RowKey eq ?', tenantId)
      var { entries } = await this.tableUtil.queryTable('Subscriptions', query)
      return this.tableUtil.parseEntity(first(entries))
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
      const query = this.tableUtil.createQuery(1).where('Token eq ?', token)
      var { entries } = await this.tableUtil.queryTable('ApiTokens', query)
      let tokenEntry = this.tableUtil.parseEntity(first(entries))
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
      const { string } = this.tableUtil.entGen()
      const entity = await this.tableUtil.addEntity(
        'ApiTokens',
        {
          PartitionKey: string(tenantId),
          RowKey: string(name),
          Token: string(token)
        }
      )
      return entity
    } catch (error) {
      console.log(error)
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
      const { string } = this.tableUtil.entGen()
      const result = await this.tableUtil.deleteEntity(
        'ApiTokens',
        {
          PartitionKey: string(tenantId),
          RowKey: string(name),
        }
      )
      return result
    } catch (error) {
      console.log(error)
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
      const query = this.tableUtil.createQuery(100).where('PartitionKey eq ?', tenantId)
      const result = await this.tableUtil.queryTable('ApiTokens', query)
      return this.tableUtil.parseEntities(result, { RowKey: 'name' }).entries
    } catch (error) {
      return null;
    }
  }
}

module.exports = new SubscriptionService()