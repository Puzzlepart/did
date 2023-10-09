import { DateObject } from 'DateUtils'
import { TabItems } from 'components/Tabs'
import { useTimesheetPeriods } from 'hooks'
import { useMemo } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import s from 'underscore.string'
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

/**
 * Returns query properties for preset
 * **LAST_MONTH**
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param query - GraphQL query
 *
 * @category Reports
 */
export function useLastMonthQuery(query = report_last_month): IReportsQuery {
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
  } as IReportsQuery
}

/**
 * Returns query properties for preset
 * **CURRENT_MONTH**. Report link ref (`reportLinkRef`)
 * is added to find potential report links for
 * this query..
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param query - GraphQL query
 *
 * @category Reports
 */
export function useCurrentMonthQuery(
  query = report_current_month
): IReportsQuery {
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
  } as IReportsQuery
}

/**
 * Returns query properties for preset
 * **LAST_YEAR**. Report link ref (`reportLinkRef`)
 * is added to find potential report links for
 * this query.
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param query - GraphQL query
 *
 * @category Reports
 */
export function useLastYearQuery(query = report_last_year): IReportsQuery {
  const { t } = useTranslation()
  const dateObject = new DateObject().toObject('year')
  const year = dateObject.year - 1
  return {
    id: 'last_year',
    text: t('common.exportTypeLastYear'),
    description: isBrowser && `${year}`,
    icon: 'Previous',
    query,
    exportFileName: `TimeEntries-${year}-{0}.xlsx`,
    reportLinkRef: year.toString()
  } as IReportsQuery
}

/**
 * Returns query properties for preset
 * **CURRENT_YEAR**. Report link ref (`reportLinkRef`)
 * is added to find potential report links for
 * this query..
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param query - GraphQL query
 *
 * @category Reports
 */
export function useCurrentYearQuery(
  query = report_current_year
): IReportsQuery {
  const { t } = useTranslation()
  const { year } = new DateObject().toObject('year')
  return {
    id: 'current_year',
    text: t('common.exportTypeCurrentYear'),
    description: isBrowser && `${year}`,
    icon: 'CalendarReply',
    query,
    exportFileName: `TimeEntries-${year}-{0}.xlsx`,
    variables: {
      userQuery: { hiddenFromReports: false }
    },
    reportLinkRef: year.toString()
  } as IReportsQuery
}

/**
 * Returns query properties for preset
 * **FORECAST**
 *
 * @remarks Made as generic so it can also be used by
 * `<UserReports />` which are using `IChoiceGroupOption`
 *
 * @param query - GraphQL query
 *
 * @category Reports
 */
export function useForecastQuery(query = report_forecast): IReportsQuery {
  const { t } = useTranslation()
  return {
    id: 'forecast',
    text: t('reports.forecast'),
    icon: 'TimeSheet',
    query,
    exportFileName: 'Forecast-{0}.xlsx',
    variables: {
      userQuery: { hiddenFromReports: false }
    }
  } as IReportsQuery
}

/**
 * Returns query properties for Summary view.
 *
 * @category Reports
 */
export function useSummaryQuery(): IReportsQuery {
  const { t } = useTranslation()
  const { periods, queries } = useTimesheetPeriods(8, true)
  return {
    id: 'summary',
    text: t('reports.summaryHeaderText'),
    icon: 'CalendarWeek',
    hidden: true,
    periods,
    query: report_summary,
    variables: {
      userQuery: { hiddenFromReports: false },
      queries
    }
  } as IReportsQuery
}

/**
 * Returns all queries and query tabs available
 * for `<Reports />`.
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
  const queries = [
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
        _.filter(queries, (q) => !q.hidden),
        (tabs, query) => {
          const { id, text, description } = query
          tabs[id] = [
            ReportTab,
            {
              text,
              description
            }
          ]
          return tabs
        },
        {} as TabItems
      ),
    [queries]
  )

  return { queries, queryTabs }
}

export { default as default_query } from '../queries/report-current-month.gql'
