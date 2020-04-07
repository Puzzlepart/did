const log = require('debug')('middleware/graphql/resolvers/mutation/updateUser');
const _ = require('underscore');

/**
 * Update week
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
async function updateUser(_obj, variables, context) {
    log('Updating user: %s', JSON.stringify(variables.user));
    try {
        await context.services.storage.updateUser(variables.user);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = updateUser;