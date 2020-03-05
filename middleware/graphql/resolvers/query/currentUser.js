const log = require('debug')('middleware/graphql/resolvers/query/currentUser');

/**
 * Get current user
 * 
 * @param {*} _obj Unused object
 * @param {*} _args Unused args
 * @param {*} context Context
 */
async function currentUser(_obj, _args, context) {
    let user = await context.services.storage.getUser(context.user.profile.oid);
    log('Retrieved current user from storage');
    return user;
}

module.exports = currentUser;