const log = require('debug')('middleware/graphql/resolvers/mutation/createCustomer');

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
        await context.services.storage.createCustomer(args);
        log('Created customer with key %s in storage', args.key);
        return { success: true, error: null };
    } catch (error) {
        log('Failed to create customer with key %s in storage: %s', args.key, error.message);
        return { success: false, error: error.message };
    }
}

module.exports = createCustomer;