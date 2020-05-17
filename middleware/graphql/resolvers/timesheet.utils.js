const { formatDate, getMonthIndex, getWeek, startOfMonth, endOfMonth, getPeriod } = require('../../../utils')

/**
 * Get periods between specified dates
 * 
 * @param startDateTime
 * @param endDateTime
 * @param locale
 */
function getPeriods(startDateTime, endDateTime, locale) {
    const week = getWeek(startDateTime)
    const startMonthIdx = getMonthIndex(startDateTime)
    const endMonthIdx = getMonthIndex(endDateTime)
    const isSplit = endMonthIdx !== startMonthIdx

    let periods = [{
        id: getPeriod(startDateTime),
        week,
        month: formatDate(startDateTime, 'MMMM', locale),
        startDateTime,
        endDateTime: isSplit
            ? endOfMonth(startDateTime).toISOString()
            : endDateTime,
    }]

    if (isSplit) {
        periods.push({
            id: getPeriod(endDateTime),
            week,
            month: formatDate(endDateTime, 'MMMM', locale),
            startDateTime: startOfMonth(endDateTime).toISOString(),
            endDateTime: endDateTime,
        })
    }

    return periods;
}

module.exports = { getPeriods }