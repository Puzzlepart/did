const { first } = require('underscore')
const tableUtil = require('../utils/table')
const { createTableService, TableQuery, TableUtilities } = require('azure-storage')

class SubscriptionService {
  /**
   * Checks if the tenant id has a active subscription
   */
  async getSubscription(tenantId) {
    try {
      tableUtil.tableService = createTableService(process.env.AZURE_STORAGE_CONNECTION_STRING)
      const query = tableUtil.createQuery(1).where('RowKey eq ?', tenantId)
      var { entries } = await tableUtil.queryTable('Subscriptions', query)
      return first(tableUtil.parseEntities(entries));
    } catch (error) {
      return null;
    }
  }

  /**
   * Get user
   *
   * @param {*} tenantId
   * @param {*} userId
   */
  async getUser(tenantId, userId) {
    const subscription = await this.getSubscription(tenantId)
    tableUtil.tableService  = createTableService(subscription.conectionString)
    let filter = TableQuery.stringFilter('RowKey', TableUtilities.QueryComparisons.EQUAL, userId);
    const query = tableUtil.createQuery(1).where(filter)
    const { entries } = await tableUtil.queryTable('Users', query)
    return first(tableUtil.parseEntities(entries))
  }
}

module.exports = SubscriptionService