async function def() {



    // TODO: Need to get weeks in month dynamically. Start from (Current week number -1), traverse (n) 5? weeks
    // TODO: Change name to weeksToCheck etc
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
        // TODO :Remove for now
        context.services.storage.getNotifications(),
    ])

    const confirmedWeeks = _.unique(confirmedTimeEntries, entry => entry.weekNumber).map(entry => entry.weekNumber);
    const unconfirmedWeeks = _.difference(weeksInMonth, confirmedWeeks);

    // TODO: Adding unconfirmed weeks notifications
    // TODO: i18n for text, need to move i18n to root
    return unconfirmedWeeks.map(week => ({
        id: uuid(),
        type: NOTIFICATION_TYPE.WEEK_NOT_CONFIRMED,
        text: `You have not confirmed week ${week}.`,
        severity: NOTIFICATION_SEVERITY.HIGH,
        dismissType: DISMISSIBILITY_TYPE.NEVER,
    }));
}

module.exports = def;