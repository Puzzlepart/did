const debug = require('debug')('middleware/graphql/resolvers/mutation/updateUser');
import _ from 'underscore';

/**
 * Update week
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
export default async function updateUser(_obj, variables, context) {
    debug('Updating user: %s', JSON.stringify(variables.user));
    try {
        await context.services.storage.updateUser(variables.user);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}