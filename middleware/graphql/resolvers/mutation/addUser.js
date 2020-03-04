const log = require('debug')('middleware/graphql/resolvers/mutation/addUser');
const _ = require('underscore');

/**
 * Update week
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args
 * @param {*} context Context
 */
async function addUser(_obj, args, context) {
    log('Adding user: %s', JSON.stringify(args.user));
    try {
        await context.services.storage.addUser(args.user);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = addUser;