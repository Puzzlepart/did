const { first } = require('underscore')
const tableUtil = require('../utils/table')
const StorageService = require('../services/storage')
const { createTableService } = require('azure-storage')

class SubscriptionService {
  /**
   * Checks if the tenant id has a active subscription
   */
  async getSubscription(tenantId) {
    try {
      tableUtil.tableService = createTableService(process.env.AZURE_STORAGE_CONNECTION_STRING)
      const query = tableUtil.createQuery(1).where('RowKey eq ?', tenantId)
      var { entries } = await tableUtil.queryTable('Subscriptions', query)
      return tableUtil.parseEntity(first(entries))
    } catch (error) {
      return null;
    }
  }
}

module.exports = SubscriptionService