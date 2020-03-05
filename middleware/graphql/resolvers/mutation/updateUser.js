const log = require('debug')('middleware/graphql/resolvers/mutation/updateUser');
const _ = require('underscore');

/**
 * Update week
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args
 * @param {*} context Context
 */
async function updateUser(_obj, args, context) {
    log('Updating user: %s', JSON.stringify(args.user));
    try {
        await context.services.storage.updateUser(args.user);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = updateUser;