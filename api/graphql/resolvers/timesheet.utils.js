const utils = require('../../../utils')

/**
 * Get periods between specified dates
 * 
 * @param startDateTime Start date time in ISO format
 * @param endDateTime End date time in ISO format
 * @param locale User locale for moment formatting
 */
function getPeriods(startDateTime, endDateTime, locale) {
    const week = utils.getWeek(startDateTime)
    const startMonthIdx = utils.getMonthIndex(startDateTime)
    const endMonthIdx = utils.getMonthIndex(endDateTime)
    const isSplit = endMonthIdx !== startMonthIdx

    let periods = [{
        id: utils.getPeriod(startDateTime),
        week,
        month: utils.formatDate(startDateTime, 'MMMM', locale),
        startDateTime,
        endDateTime: isSplit
            ? utils.endOfMonth(startDateTime, true)
            : endDateTime,
    }]

    if (isSplit) {
        periods.push({
            id: utils.getPeriod(endDateTime),
            week,
            month: utils.formatDate(endDateTime, 'MMMM', locale),
            startDateTime: utils.startOfMonth(endDateTime, true),
            endDateTime: endDateTime,
        })
    }

    return periods;
}

module.exports = { getPeriods }