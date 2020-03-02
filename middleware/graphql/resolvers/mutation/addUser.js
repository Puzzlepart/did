const log = require('debug')('middleware/graphql/resolvers/mutation/addUser');

/**
 * Add user
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args
 * @param {*} context Context
 */
async function addUser(_obj, args, context) {
    log('Adding user: %s', JSON.stringify(args.user));
    await context.services.storage.addUser(args.user);
    return { success: true, error: null };
}

module.exports = addUser;