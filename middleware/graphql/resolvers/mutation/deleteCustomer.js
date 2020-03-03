const log = require('debug')('middleware/graphql/resolvers/mutation/deleteCustomer');
const _ = require('underscore');

/**
 * Delete customer
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args
 * @param {*} context Context
 */
async function deleteCustomer(_obj, args, context) {
    log('Deleting customer: %s', args.key);
    try {
        await context.services.storage.deleteCustomer(args.key);
        return { success: true, error: null };
    } catch (error) {
        console.log(Object.keys(error));
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = deleteCustomer;