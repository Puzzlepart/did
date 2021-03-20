/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { DateObject } from 'DateUtils'
import { TFunction } from 'i18next'
import { useMemo } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { capitalize } from 'underscore.string'
import { IReportsQuery } from '../types'
import report_current_month from './queries/report-current-month.gql'
import report_current_year from './queries/report-current-year.gql'
import report_forecast from './queries/report-forecast.gql'
import report_last_month from './queries/report-last-month.gql'
import report_last_year from './queries/report-last-year.gql'
import report_summary from './queries/report-summary.gql'

/**
 * Returns query properties for preset
 * **LAST_MONTH**
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param t - Translate function
 * @param query - GraphQL query
 *
 * @category Reports
 */
export function lastMonthQuery(
  t: TFunction,
  query = report_last_month
): IReportsQuery {
  const { monthName } = new DateObject().add('-1month').toObject()
  return {
    itemKey: 'last_month',
    headerText: t('common.exportTypeLastMonth', {
      monthName: isBrowser ? `(${monthName})` : ''
    }),
    itemIcon: 'CalendarDay',
    query,
    exportFileName: `TimeEntries-${capitalize(monthName)}-{0}.xlsx`
  } as IReportsQuery
}

/**
 * Returns query properties for preset
 * **CURRENT_MONTH**
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param t - Translate function
 * @param query - GraphQL query
 *
 * @category Reports
 */
export function currentMonthQuery(
  t: TFunction,
  query = report_current_month
): IReportsQuery {
  const { monthName } = new DateObject().toObject()
  return {
    itemKey: 'current_month',
    headerText: t('common.exportTypeCurrentMonth', {
      monthName: isBrowser ? `(${monthName})` : ''
    }),
    itemIcon: 'Calendar',
    query,
    exportFileName: `TimeEntries-${capitalize(monthName)}-{0}.xlsx`
  } as IReportsQuery
}

/**
 * Returns query properties for preset
 * **LAST_YEAR**
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param t - Translate
 * @param query - GraphQL query
 *
 * @category Reports
 */
export function lastYearQuery(
  t: TFunction,
  query = report_last_year
): IReportsQuery {
  const object = new DateObject().toObject('year')
  const year = object.year - 1
  return {
    itemKey: 'last_year',
    headerText: t('common.exportTypeLastYear', {
      year: isBrowser ? `(${year})` : ''
    }),
    itemIcon: 'Previous',
    query,
    exportFileName: `TimeEntries-${year}-{0}.xlsx`
  } as IReportsQuery
}

/**
 * Returns query properties for preset
 * **CURRENT_YEAR**
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param t - Translate function
 * @param query - GraphQL query
 *
 * @category Reports
 */
export function currentYearQuery(
  t: TFunction,
  query = report_current_year
): IReportsQuery {
  const { year } = new DateObject().toObject('year')
  return {
    itemKey: 'current_year',
    headerText: t('common.exportTypeCurrentYear', {
      year: isBrowser ? `(${year})` : ''
    }),
    itemIcon: 'CalendarReply',
    query,
    exportFileName: `TimeEntries-${year}-{0}.xlsx`
  } as IReportsQuery
}

/**
 * Returns query properties for preset
 * **FORECAST**
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param t - Translate function
 * @param query - GraphQL query
 *
 * @category Reports
 */
export function forecastQuery(
  t: TFunction,
  query = report_forecast
): IReportsQuery {
  return {
    itemKey: 'forecast',
    headerText: t('reports.forecast'),
    itemIcon: 'TimeSheet',
    query,
    exportFileName: 'Forecast-{0}.xlsx'
  } as IReportsQuery
}

/**
 * Returns query properties for
 * Summary view
 *
 * @param t - Translate function
 *
 * @category Reports
 */
export function summaryQuery(t: TFunction): IReportsQuery {
  const periods = []
  let now = new DateObject()
  for (let index = 0; index < 8; index++) {
    now = now.add('-1w')
    const { week, year } = now.toObject()
    periods.unshift([week, year])
  }
  return {
    itemKey: 'summary',
    headerText: t('admin.summary'),
    hidden: true,
    periods,
    query: report_summary,
    variables: {
      userQuery: { hiddenFromReports: false },
      queries: periods.map(([week, year]) => ({ week, year }))
    }
  } as IReportsQuery
}

/**
 * Use queries
 *
 * @category Reports
 */
export function useReportsQueries(): IReportsQuery[] {
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

export { report_current_month as default_query }
