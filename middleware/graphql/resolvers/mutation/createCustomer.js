const log = require('debug')('middleware/graphql/resolvers/mutation/createCustomer');
const _ = require('underscore');

/**
 * Create customer
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args
 * @param {*} context Context
 */
async function createCustomer(_obj, args, context) {
    try {
        log('Attempting to create customer in storage: ', JSON.stringify(args));
        await context.services.storage.createCustomer(args, context.user.profile.oid);
        log('Created customer with key %s in storage', args.key);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = createCustomer;