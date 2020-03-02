const log = require('debug')('middleware/graphql/resolvers/mutation/updateUser');

/**
 * Update week
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args
 * @param {*} context Context
 */
async function updateUser(_obj, args, context) {
    await context.services.storage.updateUser(args.user);
    return { success: true, error: null };
}

module.exports = updateUser;