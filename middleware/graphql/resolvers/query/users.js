const log = require('debug')('middleware/graphql/resolvers/query/users');

/**
 * Users
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} _args Unused args
 * @param {*} context Context
 */
async function users(_obj, _args, context) {
    let users = await context.services.storage.getUsers();
    log('Retrieved %s users from storage', users.length);
    return users;
}

module.exports = users;