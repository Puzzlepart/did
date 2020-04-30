const debug = require('debug')('middleware/graphql/resolvers/query/customers');

/**
 * Customers
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} _args Unused args
 * @param {*} context Context
 */
export default async function customers(_obj, _args, context) {
    debug('Retrieving customers from storage');
    let customers = await context.services.storage.getCustomers();
    debug('Retrieved %s customers from storage', customers.length);
    return customers;
};