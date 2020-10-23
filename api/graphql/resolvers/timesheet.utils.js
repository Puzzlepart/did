const utils = require('../../../utils')
const { first, find, filter } = require('underscore')
const { contains } = require('underscore.string')
const get = require('get-value')

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

  let periods = [
    {
      id: utils.getPeriod(startDateTime),
      week,
      month: utils.formatDate(startDateTime, 'MMMM', locale),
      startDateTime,
      endDateTime: isSplit ? utils.endOfMonth(startDateTime) : endDateTime,
      isForecast: utils.isAfterToday(startDateTime),
    },
  ]

  if (isSplit) {
    let startDateTime = utils.startOfMonth(endDateTime)
    periods.push({
      id: utils.getPeriod(endDateTime),
      week,
      month: utils.formatDate(endDateTime, 'MMMM', locale),
      startDateTime,
      endDateTime,
      isForecast: utils.isAfterToday(startDateTime),
    })
  }

  return periods
}

/**
 * Connect time entries to projects, customers and labels
 *
 * @param timeentries Time entries
 * @param projects Projects
 * @param customers Customers
 * @param labels Labels
 */
function connectTimeEntries(timeentries, projects, customers, labels) {
  return timeentries.map(entry => {
    const customerKey = first(entry.projectId.split(' '))
    return {
      ...entry,
      project: find(projects, p => p.id === entry.projectId),
      customer: find(customers, c => c.key === customerKey),
      labels: filter(labels, lbl => {
        const val = get(entry, 'labels', { default: '' })
        return contains(val, lbl.name)
      }),
    }
  })
}

module.exports = { getPeriods, connectTimeEntries }
