import { TFunction } from 'i18next'
import { omit } from 'underscore'
import { capitalize } from 'underscore.string'
import { DateObject } from 'utils/date'
import { IReportsQuery } from './types'

/**
 * Get last month query
 * 
 * @param {DateObject} now Current date and time
 * @param {TFunction} t Translate function
 */
const lastMonthQuery = (now: DateObject, t: TFunction) => {
  const obj = now.add('-1month').toObject()
  return {
    key: 'lastMonth',
    text: t('common.exportTypeLastMonth', obj),
    iconName: 'CalendarDay',
    variables: { query: omit(obj, 'monthName', 'weekNumber') },
    exportFileName: `TimeEntries-${capitalize(obj.monthName)}-{0}.xlsx`
  } as IReportsQuery
}

/**
 * Get current month query
 * 
 * @param {DateObject} now Current date and time
 * @param {TFunction} t Translate function
 */
const currentMonthQuery = (now: DateObject, t: TFunction) => {
  const obj = now.toObject()
  return {
    key: 'currentMonth',
    text: t('common.exportTypeCurrentMonth', obj),
    iconName: 'Calendar',
    variables: {
      query: {
        ...omit(obj, 'monthName', 'weekNumber'),
        endDateTime: now.$.toISOString()
      }
    },
    exportFileName: `TimeEntries-${capitalize(obj.monthName)}-{0}.xlsx`
  } as IReportsQuery
}

/**
 * Get current year query
 * 
 * @param {DateObject} now Current date and time
 * @param {TFunction} t Translate function
 */
const currentYearQuery = (now: DateObject, t: TFunction) => {
  const obj = now.toObject('year')
  return {
    key: 'currentYear',
    text: t('common.exportTypeCurrentYear', obj),
    iconName: 'CalendarReply',
    variables: {
      query: {
        ...obj,
        endDateTime: now.$.toISOString()
      }
    },
    exportFileName: `TimeEntries-${obj.year}-{0}.xlsx`
  } as IReportsQuery
}

/**
 * Get forecast query
 * 
 * @param {DateObject} now Current date and time
 * @param {TFunction} t Translate function
 */
const forecastQuery = (now: DateObject, t: TFunction) => {
  return {
    key: 'forecast',
    text: t('reports.forecast'),
    iconName: 'TimeSheet',
    variables: {
      sortAsc: true,
      forecast: true,
      query: {
        startDateTime: now.$.toISOString()
      }
    },
    exportFileName: 'Forecast-{0}.xlsx'
  } as IReportsQuery
}

/**
 * Get queries
 *
 * @param {TFunction} t Translate function
 */
export function getQueries<T = IReportsQuery>(t: TFunction): T[] {
  const now = new DateObject()
  return [lastMonthQuery, currentMonthQuery, currentYearQuery, forecastQuery].map(
    (q) => (q(now, t) as unknown) as T
  )
}
