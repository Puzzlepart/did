/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { DateObject } from 'DateUtils'
import { TFunction } from 'i18next'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'underscore.string'
import { IReportsQuery } from '../../types'
import report_current_month from './report-current-month.gql'
import report_current_year from './report-current-year.gql'
import report_forecast from './report-forecast.gql'
import report_last_month from './report-last-month.gql'
import report_last_year from './report-last-year.gql'
import report_summary from './report-summary.gql'

/**
 * Last month query
 *
 * @param t - Translate function
 * @param query - GraphQL query
 */
export const lastMonthQuery = (t: TFunction, query = report_last_month) => {
  const object = new DateObject().add('-1month').toObject()
  return {
    key: 'last_month',
    text: t('common.exportTypeLastMonth', object),
    iconName: 'CalendarDay',
    query,
    exportFileName: `TimeEntries-${capitalize(object.monthName)}-{0}.xlsx`
  }
}

/**
 * Current month query
 *
 * @param t - Translate function
 * @param query - GraphQL query
 */
export const currentMonthQuery = (
  t: TFunction,
  query = report_current_month
) => {
  const object = new DateObject().toObject()
  return {
    key: 'current_month',
    text: t('common.exportTypeCurrentMonth', object),
    iconName: 'Calendar',
    query,
    exportFileName: `TimeEntries-${capitalize(object.monthName)}-{0}.xlsx`
  }
}

/**
 * Last year query preset
 *
 * @param t - Translate
 * @param query - GraphQL query
 */
export const lastYearQuery = (t: TFunction, query = report_last_year) => {
  const { year } = new DateObject().toObject('year')
  const object = { year: year - 1 }
  return {
    key: 'last_year',
    text: t('common.exportTypeLastYear', object),
    iconName: 'Previous',
    query,
    exportFileName: `TimeEntries-${object.year}-{0}.xlsx`
  }
}

/**
 * Current year query
 *
 * @param t - Translate function
 * @param query - GraphQL query
 */
export const currentYearQuery = (t: TFunction, query = report_current_year) => {
  const object = new DateObject().toObject('year')
  return {
    key: 'current_year',
    text: t('common.exportTypeCurrentYear', object),
    iconName: 'CalendarReply',
    query,
    exportFileName: `TimeEntries-${object.year}-{0}.xlsx`
  }
}

/**
 * Forecast query
 *
 * @param t - Translate function
 * @param query - GraphQL query
 */
export const forecastQuery = (t: TFunction, query = report_forecast) => {
  return {
    key: 'forecast',
    text: t('reports.forecast'),
    iconName: 'TimeSheet',
    query,
    exportFileName: 'Forecast-{0}.xlsx'
  }
}

/**
 * Summary query
 *
 * @param t - Translate function
 * @param query - GraphQL query
 */
export const summaryQuery = (_t: TFunction, query = report_summary) => {
  const periods = []
  let now = new DateObject()
  for (let index = 0; index < 8; index++) {
    now = now.add('-1w')
    const { week, year } = now.toObject()
    periods.unshift([week, year])
  }
  return {
    key: 'summary',
    text: undefined,
    periods,
    query,
    variables: {
      userQuery: { hiddenFromReports: false },
      queries: periods.map(([week, year]) => ({ week, year }))
    }
  }
}

/**
 * Use queries
 *
 * @category Reports
 */
export function useQueries(): IReportsQuery[] {
  const { t } = useTranslation()
  return useMemo(
    () =>
      [
        lastMonthQuery,
        currentMonthQuery,
        lastYearQuery,
        currentYearQuery,
        forecastQuery,
        summaryQuery
      ].map((queryFunction) => {
        return queryFunction(t)
      }),
    []
  )
}

export {
  report_current_month,
  report_last_month,
  report_current_year,
  report_last_year,
  report_forecast
}
