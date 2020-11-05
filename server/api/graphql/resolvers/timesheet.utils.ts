import * as utils from '../../../utils/date'
import { first, find, filter } from 'underscore'
import { contains } from 'underscore.string'
import get from 'get-value'
import { TimesheetPeriodObject } from './timesheet.types'

/**
 * Get periods between specified dates
 *
 * @param {string | moment.Moment} startDateTime Start date time in ISO format
 * @param {string | moment.Moment} endDateTime End date time in ISO format
 * @param {string} locale User locale for moment formatting
 */
export function getPeriods(startDateTime: string, endDateTime: string, locale: string): any[] {
  const week = utils.getWeek(startDateTime)
  const startMonthIdx = utils.getMonthIndex(startDateTime)
  const endMonthIdx = utils.getMonthIndex(endDateTime)
  const isSplit = endMonthIdx !== startMonthIdx

  const periods: TimesheetPeriodObject[] = [
    {
      id: utils.getPeriod(startDateTime),
      week,
      month: utils.formatDate(startDateTime, 'MMMM', locale),
      startDateTime,
      endDateTime: isSplit ? utils.endOfMonth(startDateTime) : endDateTime,
      isForecast: utils.isAfterToday(startDateTime),
      isConfirmed: false,
      isForecasted: false
    }
  ]

  if (isSplit) {
    const startDateTime = utils.startOfMonth(endDateTime)
    periods.push({
      id: utils.getPeriod(endDateTime),
      week,
      month: utils.formatDate(endDateTime, 'MMMM', locale),
      startDateTime,
      endDateTime,
      isForecast: utils.isAfterToday(startDateTime),
      isConfirmed: false,
      isForecasted: false
    })
  }

  return periods
}

/**
 * Connect time entries to projects, customers and labels
 *
 * @param {any[]} timeentries Time entries
 * @param {any[]} projects Projects
 * @param {any[]} customers Customers
 * @param {any[]} labels Labels
 */
export function connectTimeEntries(timeentries: any[], projects: any[], customers: any[], labels: any[]) {
  return timeentries.map((entry) => {
    const customerKey = first(entry.projectId.split(' '))
    return {
      ...entry,
      project: find(projects, (p) => p.id === entry.projectId),
      customer: find(customers, (c) => c.key === customerKey),
      labels: filter(labels, (lbl) => {
        const val = get(entry, 'labels', { default: '' })
        return contains(val, lbl.name)
      })
    }
  })
}
