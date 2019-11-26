const { TableQuery } = require('azure-storage');
const { queryTable, parseArray } = require('../../../services/table');

module.exports = async () => {
    const result = await queryTable(process.env.AZURE_STORAGE_CUSTOMERS_TABLE_NAME, new TableQuery().top(10).select('RowKey', 'CustomerKey', 'Name'));
    return parseArray(result).map(r => ({ ...r, key: r.customerKey }));;
};