const log = require('debug')('middleware/graphql/resolvers/mutation/addUser');
const _ = require('underscore');

/**
 * Update week
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
async function addUser(_obj, variables, context) {
    log('Adding user: %s', JSON.stringify(variables.user));
    try {
        await context.services.storage.addUser(variables.user);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = addUser;