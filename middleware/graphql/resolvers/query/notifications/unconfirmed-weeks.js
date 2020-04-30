const { startOfMonth, endOfMonth } = require('../../../../../utils');
const uuid = require('uuid/v1');
const _ = require('underscore');
const { UNCONFIRMED_WEEK } = require('./NOTIFICATION_TYPE');
const { HIGH } = require('./NOTIFICATION_SEVERITY');
const { NEVER } = require('./NOTIFICATION_DISMISSABLE');

module.exports = async function (context) {
    // TODO: Need to get weeks in month dynamically. Start from (Current week number -1), traverse (n) 5? weeks
    // TODO: Change name to weeksToCheck etc
    const weeksInMonth = [9, 10, 11, 12, 13, 14];

    // TODO startDateTime = start of week oldest week, end endDateTime = endOfWeek last week
    const startDateTime = startOfMonth(startOfMonth().subtract(1, 'month'));
    const endDateTime = endOfMonth(endOfMonth().subtract(1, 'month'));
    let confirmedTimeEntries = await context.services.storage.getConfirmedTimeEntries({
        resourceId: context.user.profile.oid,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
    });

    const confirmedWeeks = _.unique(confirmedTimeEntries, entry => entry.weekNumber).map(entry => entry.weekNumber);
    const unconfirmedWeeks = _.difference(weeksInMonth, confirmedWeeks);

    // TODO: i18n for text
    return unconfirmedWeeks.map(week => ({
        id: uuid(),
        type: UNCONFIRMED_WEEK,
        text: `You have not confirmed week ${week}.`,
        severity: HIGH,
        dismissable: NEVER,
    }));
}