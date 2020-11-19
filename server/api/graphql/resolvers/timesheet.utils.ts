import get from 'get-value'
import { filter, find, first } from 'underscore'
import { contains } from 'underscore.string'
import * as DateUtils from '../../../utils/date'
import { Customer } from './customer.types'
import { LabelObject } from './label.types'
import { Project } from './project.types'
import { TimeEntry } from './timeentry.types'
import { TimesheetPeriodObject } from './timesheet.types'

/**
 * Get periods between specified dates
 *
 * @param {string} startDate Start date
 * @param {string} endDate End date
 * @param {string} locale User locale
 */
export function getPeriods(
  startDate: string,
  endDate: string,
  locale: string
): TimesheetPeriodObject[] {
  const isSplit = !DateUtils.isSameMonth(startDate, endDate)
  const periods: TimesheetPeriodObject[] = [
    new TimesheetPeriodObject(
      startDate,
      isSplit ? DateUtils.endOfMonth(startDate, 'YYYY-MM-DD') : endDate,
      locale
    )
  ]
  if (isSplit) {
    periods.push(
      new TimesheetPeriodObject(DateUtils.startOfMonth(endDate, 'YYYY-MM-DD'), endDate, locale)
    )
  }

  return periods
}

/**
 * Connect time entries to projects, customers and labels
 *
 * @param {TimeEntry[]} timeEntries Time entries
 * @param {Project[]} projects Projects
 * @param {Customer[]} customers Customers
 * @param {LabelObject[]} labels Labels
 */
export function connectTimeEntries(
  timeEntries: TimeEntry[],
  projects: Project[],
  customers: Customer[],
  labels: LabelObject[]
) {
  return timeEntries.map((e) => {
    const customerKey = first(e.projectId.split(' '))
    return {
      ...e,
      project: find(projects, (p) => p.id === e.projectId),
      customer: find(customers, (c) => c.key === customerKey),
      labels: filter(labels, (lbl) => {
        const val = get(e, 'labels', { default: '' })
        return contains(val, lbl.name)
      })
    }
  })
}
