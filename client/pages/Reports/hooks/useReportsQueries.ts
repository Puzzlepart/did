// External imports
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { isBrowser } from 'react-device-detect'
import _ from 'underscore'
import s from 'underscore.string'

// Project imports
import { DateObject } from 'DateUtils'
import { TabItems } from 'components/Tabs'
import { useTimesheetPeriods } from 'hooks'
import { useSubscriptionSettings } from 'AppContext'
import { ReportTab } from '../ReportTab'
import {
  report_current_month,
  report_current_year,
  report_forecast,
  report_last_month,
  report_last_year,
  report_summary
} from '../queries'
import { IReportsQuery } from '../types'

type QueryHook = (query?: any, ...args: any[]) => IReportsQuery

/**
 * Returns query properties for preset **LAST_MONTH**.
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param query - GraphQL query to use for the report
 * @returns Report query configuration
 *
 * @category Reports
 */
export const useLastMonthQuery: QueryHook = (query = report_last_month) => {
  const { t } = useTranslation()
  const dateObject = new DateObject().add('-1month').toObject()
  const monthName = s.capitalize(dateObject.monthName)
  return {
    id: 'last_month',
    text: t('common.exportTypeLastMonth'),
    description: isBrowser && monthName,
    icon: 'CalendarDay',
    query,
    exportFileName: `TimeEntries-${monthName}-{0}.xlsx`,
    variables: {
      userQuery: { hiddenFromReports: false }
    },
    reportLinkRef: [dateObject.year, dateObject.month].join('_')
  }
}

/**
 * Returns query properties for preset **CURRENT_MONTH**
 * 
 * Report link ref (`reportLinkRef`) is added to find 
 * potential report links for this query.
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param query - GraphQL query to use for the report
 * @returns Report query configuration
 *
 * @category Reports
 */
export const useCurrentMonthQuery: QueryHook = (
  query = report_current_month
) => {
  const { t } = useTranslation()
  const dateObject = new DateObject().toObject()
  const monthName = s.capitalize(dateObject.monthName)
  return {
    id: 'current_month',
    text: t('common.exportTypeCurrentMonth'),
    description: isBrowser && monthName,
    icon: 'Calendar',
    query,
    exportFileName: `TimeEntries-${monthName}-{0}.xlsx`,
    variables: {
      userQuery: { hiddenFromReports: false }
    },
    reportLinkRef: [dateObject.year, dateObject.month].join('_')
  }
}

/**
 * Returns query properties for preset **LAST_YEAR**
 * 
 * Report link ref (`reportLinkRef`) is added to find 
 * potential report links for this query.
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param query - GraphQL query to use for the report
 * @returns Report query configuration
 *
 * @category Reports
 */
export const useLastYearQuery: QueryHook = (query = report_last_year) => {
  const { t } = useTranslation()
  const dateObject = new DateObject().toObject('year')
  const previousYear = dateObject.year - 1
  return {
    id: 'last_year',
    text: t('common.exportTypeLastYear'),
    description: isBrowser && `${previousYear}`,
    icon: 'Previous',
    query,
    exportFileName: `TimeEntries-${previousYear}-{0}.xlsx`,
    variables: {
      userQuery: { hiddenFromReports: false }
    },
    reportLinkRef: previousYear.toString()
  }
}

/**
 * Returns query properties for preset **CURRENT_YEAR**
 * 
 * Report link ref (`reportLinkRef`) is added to find 
 * potential report links for this query.
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param query - GraphQL query to use for the report
 * @returns Report query configuration
 *
 * @category Reports
 */
export const useCurrentYearQuery: QueryHook = (
  query = report_current_year
) => {
  const { t } = useTranslation()
  const { year: currentYear } = new DateObject().toObject('year')
  return {
    id: 'current_year',
    text: t('common.exportTypeCurrentYear'),
    description: isBrowser && `${currentYear}`,
    icon: 'CalendarReply',
    query,
    exportFileName: `TimeEntries-${currentYear}-{0}.xlsx`,
    variables: {
      userQuery: { hiddenFromReports: false }
    },
    reportLinkRef: currentYear.toString()
  }
}

/**
 * Returns query properties for preset **FORECAST**
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param query - GraphQL query to use for the report
 * @returns Report query configuration
 *
 * @category Reports
 */
export const useForecastQuery: QueryHook = (query = report_forecast) => {
  const { t } = useTranslation()
  const isForecastEnabled = useSubscriptionSettings<boolean>(
    'forecast.enabled',
    false
  )
  return {
    id: 'forecast',
    text: t('reports.forecast'),
    icon: 'TimeSheet',
    query,
    exportFileName: 'Forecast-{0}.xlsx',
    variables: {
      userQuery: { hiddenFromReports: false }
    },
    disabled: !isForecastEnabled
  }
}

/**
 * Returns query properties for Summary view.
 *
 * @param query - GraphQL query to use for the report
 * @param weeksCount - Number of weeks to include in the summary
 * @returns Report query configuration
 *
 * @category Reports
 */
export const useSummaryQuery: QueryHook = (query = report_summary, weeksCount = 8) => {
  const { t } = useTranslation()
  const { periods, queries } = useTimesheetPeriods(weeksCount, true)
  return {
    id: 'summary',
    text: t('reports.summaryHeaderText'),
    icon: 'CalendarWeek',
    hidden: true,
    periods,
    query,
    variables: {
      queries,
      userQuery: { hiddenFromReports: false }
    }
  }
}

/**
 * Returns all queries and query tabs available
 * for `<Reports />`.
 * 
 * @returns Object containing available queries and query tabs
 *
 * @category Reports
 */
export function useReportsQueries() {
  const lastMonthQuery = useLastMonthQuery()
  const currentMonthQuery = useCurrentMonthQuery()
  const currentYearQuery = useCurrentYearQuery()
  const lastYearQuery = useLastYearQuery()
  const forecastQuery = useForecastQuery()
  const summaryQuery = useSummaryQuery()

  const allQueries = [
    lastMonthQuery,
    currentMonthQuery,
    currentYearQuery,
    lastYearQuery,
    forecastQuery,
    summaryQuery
  ]

  const queryTabs = useMemo(
    () =>
      _.reduce(
        _.filter(allQueries, (query) => !query.hidden),
        (tabs, query) => {
          tabs[query.id] = [
            ReportTab,
            {
              text: query.text,
              description: query.description,
              disabled: query.disabled
            }
          ]
          return tabs
        },
        {} as TabItems
      ),
    [allQueries]
  )

  return { queries: allQueries, queryTabs }
}

export { default as default_query } from '../queries/report-current-month.gql'
