const { startOfMonth, endOfMonth, getWeek } = require('../../../utils')
const uuid = require('uuid/v1')
const { unique, difference, filter, find } = require('underscore')
const format = require('string-format')

module.exports = async function (template, user, StorageService) {
    const currentWeek = getWeek();
    const weeks = [];

    for (let i = 1; i <= 5; i++)  weeks.push(currentWeek - i)

    var confirmedPeriods = await StorageService.getConfirmedPeriods({
        resourceId: 'b4c98e99-8265-4890-85fa-04aff6ab5b13',
        year: 2020,
    })

    const missingWeeks = filter(weeks, wn => !find(confirmedPeriods, cp => cp.weekNumber === wn))

    // TODO: i18n for text
    return missingWeeks.map(wn => ({
        id: uuid(),
        type: 0,
        text: format(template, wn),
        severity: 2,
        dismissable: 0,
    }))
}