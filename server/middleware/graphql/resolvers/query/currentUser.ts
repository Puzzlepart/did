const debug = require('debug')('middleware/graphql/resolvers/query/currentUser');

/**
 * Get current user
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} _args Unused args
 * @param {*} context Context
 */
export default async function currentUser(_obj, _args, context) {
    let user = await context.services.storage.getUser(context.user.profile.oid);
    debug('Retrieved current user from storage');
    return user;
}