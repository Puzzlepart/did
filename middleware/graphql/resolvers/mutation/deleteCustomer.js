const log = require('debug')('middleware/graphql/resolvers/mutation/deleteCustomer');

/**
 * Delete customer
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args
 * @param {*} context Context
 */
async function deleteCustomer(_obj, args, context) {
    log('Deleting customer: %s', args.key);
    await context.services.storage.deleteCustomer(args.key);
    return { success: true, error: null };
}

module.exports = deleteCustomer;