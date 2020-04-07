const log = require('debug')('middleware/graphql/resolvers/mutation/createCustomer');
const _ = require('underscore');

/**
 * Create customer
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
async function createCustomer(_obj, variables, context) {
    try {
        log('Attempting to create customer in storage: ', JSON.stringify(variables));
        await context.services.storage.createCustomer(variables, context.user.profile.oid);
        log('Created customer with key %s in storage', variables.key);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = createCustomer;