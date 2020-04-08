const log = require('debug')('middleware/graphql/resolvers/query/weeks');

/**
 * Get projects
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} _args Unused args
 * @param {*} context Context
 */
async function weeks(_obj, _args, context) {
    let weeks = await context.services.storage.getWeeks();
    log('Retrieved %s weeks from storage', weeks.length);
    return weeks;
}

module.exports = weeks;