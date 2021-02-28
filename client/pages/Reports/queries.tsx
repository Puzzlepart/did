/* eslint-disable tsdoc/syntax */
import { DateObject } from 'DateUtils'
import { TFunction } from 'i18next'
import { capitalize } from 'underscore.string'
import { IReportsQuery } from './types'

/**
 * Get last month query
 *
 * @param now - Current date and time
 * @param t - Translate function
 */
const lastMonthQuery = (now: DateObject, t: TFunction) => {
  const object = now.add('-1month').toObject()
  return {
    key: 'last_month',
    text: t('common.exportTypeLastMonth', object),
    iconName: 'CalendarDay',
    variables: { query: { preset: 'LAST_MONTH' } },
    exportFileName: `TimeEntries-${capitalize(object.monthName)}-{0}.xlsx`
  } as IReportsQuery
}

/**
 * Get current month query
 *
 * @param now - Current date and time
 * @param t - Translate function
 */
const currentMonthQuery = (now: DateObject, t: TFunction) => {
  const object = now.toObject()
  return {
    key: 'current_month',
    text: t('common.exportTypeCurrentMonth', object),
    iconName: 'Calendar',
    variables: {
      query: {
        preset: 'CURRENT_MONTH'
      }
    },
    exportFileName: `TimeEntries-${capitalize(object.monthName)}-{0}.xlsx`
  } as IReportsQuery
}

/**
 * Get last year query
 *
 * @param now - Current date and time
 * @param t - Translate function
 */
const lastYearQuery = (now: DateObject, t: TFunction) => {
  const { year } = now.toObject('year')
  const object = { year: year - 1 }
  return {
    key: 'last_year',
    text: t('common.exportTypeLastYear', object),
    iconName: 'Previous',
    variables: {
      query: {
        preset: 'LAST_YEAR'
      }
    },
    exportFileName: `TimeEntries-${object.year}-{0}.xlsx`
  } as IReportsQuery
}

/**
 * Get current year query
 *
 * @param now - Current date and time
 * @param t - Translate function
 */
const currentYearQuery = (now: DateObject, t: TFunction) => {
  const object = now.toObject('year')
  return {
    key: 'current_year',
    text: t('common.exportTypeCurrentYear', object),
    iconName: 'CalendarReply',
    variables: {
      query: {
        preset: 'CURRENT_YEAR'
      }
    },
    exportFileName: `TimeEntries-${object.year}-{0}.xlsx`
  } as IReportsQuery
}

/**
 * Get forecast query
 *
 * @param now - Current date and time
 * @param t - Translate function
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
        preset: 'FORECAST'
      }
    },
    exportFileName: 'Forecast-{0}.xlsx'
  } as IReportsQuery
}

/**
 * Get query presets
 *
 * @category Reports
 *
 * @param t - Translate function
 */
export function getQueryPresets<T = IReportsQuery>(t: TFunction): T[] {
  const now = new DateObject()
  return [
    lastMonthQuery,
    currentMonthQuery,
    lastYearQuery,
    currentYearQuery,
    forecastQuery
  ].map((q) => (q(now, t) as unknown) as T)
}
