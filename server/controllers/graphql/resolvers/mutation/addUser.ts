const debug = require('debug')('middleware/graphql/resolvers/mutation/addUser');
import _ from 'underscore';

/**
 * Update week
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
export default async function addUser(_obj, variables, context) {
    debug('Adding user: %s', JSON.stringify(variables.user));
    try {
        await context.services.storage.addUser(variables.user);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}