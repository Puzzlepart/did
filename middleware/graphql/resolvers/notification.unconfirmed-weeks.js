const { startOfMonth, endOfMonth } = require('../../../utils')
const uuid = require('uuid/v1')
const { unique, difference } = require('underscore')

module.exports = async function (user, StorageService) {
    // TODO: Need to get weeks in month dynamically. Start from (Current week number -1), traverse (n) 5? weeks
    // TODO: Change name to weeksToCheck etc
    const weeksInMonth = [9, 10, 11, 12, 13, 14]

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