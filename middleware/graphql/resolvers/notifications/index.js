const log = require('debug')('middleware/graphql/resolvers/query/notifications');
const _ = require('underscore');
const unconfirmed_weeks = require('./unconfirmed-weeks');


/**
 * Get notifications
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} _args Unused args
 * @param {*} context Context
 */
async function notifications(_obj, _args, context) {
    let [notifications] = await Promise.all([
        unconfirmed_weeks(context),
    ]);
    log('Returning %s notifications', notifications.length);
    return notifications;
}

module.exports = notifications;