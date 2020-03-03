const log = require('debug')('middleware/graphql/resolvers/query/customers');

/**
 * Customers
 * 
 * @param {*} _obj Unused object
 * @param {*} _args Unused args
 * @param {*} context Context
 */
async function customers(_obj, _args, context) {
    log('Retrieving customers from storage');
    let customers = await context.services.storage.getCustomers();
    log('Retrieved %s customers from storage', customers.length);
    return customers;
};

module.exports = customers;