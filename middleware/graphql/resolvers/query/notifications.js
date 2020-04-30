const log = require('debug')('middleware/graphql/resolvers/query/notifications');
const uuid = require('uuid/v1');
const { startOfMonth, endOfMonth, getWeeksInMonth } = require('../../../../utils');
const _ = require('underscore');

const NOTIFICATION_TYPE = {
    WEEK_NOT_CONFIRMED: 0,
    SERVICE_ANNOUNCEMENT: 1,
    FEATURE_ANNOUNCEMENT: 2,
}


const NOTIFICATION_SEVERITY = {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2,
}

/**
 * Get notifications
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} _args Unused args
 * @param {*} context Context
 */
async function notifications(_obj, _args, context) {
    
    

    //TODO: Need to get weeks in month dynamically
    // Start from (Current week number -1), traverse (n) 5? weeks
    // Change to weeksToCheck etc
    const weeksInMonth = [9, 10, 11, 12, 13, 14];
    
    // TODO startDateTime = start of week oldest week, end endDateTime = endOfWeek last week
    const startDateTime = startOfMonth(startOfMonth().subtract(1, 'month'));
    const endDateTime = endOfMonth(endOfMonth().subtract(1, 'month'));
    let [confirmedTimeEntries, notifications] = await Promise.all([
        context.services.storage.getConfirmedTimeEntries({
            resourceId: context.user.profile.oid,
            startDateTime: startDateTime.toISOString(),
            endDateTime: endDateTime.toISOString(),
        }),
        context.services.storage.getNotifications(),
    ])

    const confirmedWeeks = _.unique(confirmedTimeEntries, entry => entry.weekNumber).map(entry => entry.weekNumber);
    const unconfirmedWeeks = _.difference(weeksInMonth, confirmedWeeks);

    //TODO: Adding unconfirmed weeks notifications
    // TODO: i18n for text, need to move i18n to root
    notifications.push(...unconfirmedWeeks.map(week => ({
        id: uuid(),
        type: NOTIFICATION_TYPE.WEEK_NOT_CONFIRMED,
        text: `You have not confirmed week ${week}.`,
        severity: NOTIFICATION_SEVERITY.HIGH,
    })));


    log('Returning %s notifications', notifications.length);
    return notifications;
}

module.exports = notifications;
