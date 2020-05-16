const { formatDate, getMonthIndex, getWeek, startOfMonth, endOfMonth } = require('../../../utils')

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
        id: `${week}_${startMonthIdx}`,
        week,
        month: formatDate(startDateTime, 'MMMM', locale),
        startDateTime,
        endDateTime: isSplit
            ? endOfMonth(startDateTime).toISOString()
            : endDateTime,
    }]

    if (isSplit) {
        periods.push({
            id: `${week}_${endMonthIdx}`,
            week,
            month: formatDate(endDateTime, 'MMMM', locale),
            startDateTime: startOfMonth(endDateTime).toISOString(),
            endDateTime: endDateTime,
        })
    }

    return periods;
}

module.exports = { getPeriods }