const { startOfMonth, endOfMonth, getWeek } = require('../../../utils')
const uuid = require('uuid/v1')
const { unique, difference } = require('underscore')

module.exports = async function (user, StorageService) {
    // TODO: Need to get weeks in month dynamically. Start from (Current week number -1), traverse (n) 5? weeks
    // TODO: Change name to weeksToCheck etc
    const currentWeek = getWeek();
    const weeks = [];

    for (let i = 1; i <= 5; i++) {
        weeks.push(currentWeek - i);
    }

    console.log(weeks)

    var d = await StorageService.getConfirmedPeriods({
        resourceId: 'b4c98e99-8265-4890-85fa-04aff6ab5b13',
        year: 2020,
    })
    console.log(d)


    // TODO startDateTime = start of week oldest week, end endDateTime = endOfWeek last week
    // const startDateTime = startOfMonth(startOfMonth().subtract(1, 'month'))
    // const endDateTime = endOfMonth(endOfMonth().subtract(1, 'month'))
    // let confirmedTimeEntries = await StorageService.getConfirmedTimeEntries({
    //     resourceId: user.profile.oid,
    //     startDateTime: startDateTime.toISOString(),
    //     endDateTime: endDateTime.toISOString(),
    // })

    // const confirmedWeeks = unique(confirmedTimeEntries, entry => entry.weekNumber)
    //     .map(entry => entry.weekNumber)
    // const unconfirmedWeeks = difference(weeksInMonth, confirmedWeeks)

    // TODO: i18n for text
    // return weeksInMonth.map(week => ({
    //     id: uuid(),
    //     type: 0,
    //     text: `You have not confirmed week ${week}.`,
    //     severity: 2,
    //     dismissable: 0,
    // }))
    return []
}