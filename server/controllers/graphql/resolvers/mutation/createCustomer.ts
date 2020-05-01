const debug = require('debug')('middleware/graphql/resolvers/mutation/createCustomer');
import _ from 'underscore';

/**
 * Create customer
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
export default async function createCustomer(_obj, variables, context) {
    try {
        debug('Attempting to create customer in storage: ', JSON.stringify(variables));
        await context.services.storage.createCustomer(variables, context.user.profile.oid);
        debug('Created customer with key %s in storage', variables.key);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}