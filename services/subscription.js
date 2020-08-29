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
   * Find subscription for the speicifed apiKey
   * 
   * @param headers Request headers
   */
  async findSubscription({ authorization }) {
    try {
      const query = this.tableUtil.createQuery(1).where('RowKey eq ?', authorization)
      var { entries } = await this.tableUtil.queryTable('ApiKeys', query)
      let apiKeyEntry = this.tableUtil.parseEntity(first(entries))
      if (apiKeyEntry) return this.getSubscription(entry.partitionKey)
      return null
    } catch (error) {
      return null;
    }
  }
}

module.exports = new SubscriptionService()