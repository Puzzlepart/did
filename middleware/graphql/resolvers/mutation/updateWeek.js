const log = require('debug')('middleware/graphql/resolvers/mutation/updateWeek');

/**
 * Update week
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
async function updateWeek(_obj, variables, context) {
    await context.services.storage.updateWeek(variables.weekNumber, variables.closed);
    if (variables.closed) log('Closing week %s', variables.weekNumber);
    else log('Opening week %s', variables.weekNumber);
    return variables.closed;
}

module.exports = updateWeek;