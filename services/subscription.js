const { first } = require('underscore')
const tableUtil = require('../utils/table')
const { createTableService } = require('azure-storage')

class SubscriptionService {
  /**
   * Get the subscription for the specified tenant id 
   * 
   * Returns null if there's no active subscription
   * 
   * @param tenantId Tenant ID
   */
  async getSubscription(tenantId) {
    try {
      tableUtil.tableService = createTableService(process.env.AZURE_STORAGE_CONNECTION_STRING)
      const query = tableUtil.createQuery(1, ['Name', 'ConnectionString']).where('RowKey eq ?', tenantId)
      var { entries } = await tableUtil.queryTable('Subscriptions', query)
      return tableUtil.parseEntity(first(entries))
    } catch (error) {
      return null;
    }
  }
}

module.exports = SubscriptionService