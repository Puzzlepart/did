const _ = require('underscore');
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
    let [customers, labels] = await Promise.all([
        context.services.storage.getCustomers(),
        context.services.storage.getLabels(),
    ]);
    customers = customers.map(customer => ({
        ...customer,
        labels: _.filter(labels, l => (customer.labels || '').indexOf(l.id) !== -1),
    }));
    log('Retrieved %s customers from storage', customers.length);
    return customers;
};

module.exports = customers;