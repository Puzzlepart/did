import { DateObject } from 'DateUtils'
import { useTimesheetPeriods } from 'hooks'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import s from 'underscore.string'
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
  return {
    id: 'last_month',
    text: t('common.exportTypeLastMonth', {
      monthName: isBrowser ? `(${dateObject.monthName})` : ''
    }),
    icon: 'CalendarDay',
    query,
    exportFileName: `TimeEntries-${s.capitalize(
      dateObject.monthName
    )}-{0}.xlsx`,
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
  return {
    id: 'current_month',
    text: t('common.exportTypeCurrentMonth', {
      monthName: isBrowser ? `(${dateObject.monthName})` : ''
    }),
    icon: 'Calendar',
    query,
    exportFileName: `TimeEntries-${s.capitalize(
      dateObject.monthName
    )}-{0}.xlsx`,
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
    text: t('common.exportTypeLastYear', {
      year: isBrowser ? `(${year})` : ''
    }),
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
    text: t('common.exportTypeCurrentYear', {
      year: isBrowser ? `(${year})` : ''
    }),
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
 * Use Reports Queries. Returns all queries
 * used in reports. Each query is generated
 * by a separate hook.
 *
 * @category Reports
 */
export function useReportsQueries(): IReportsQuery[] {
  const lastMonthQuery = useLastMonthQuery()
  const currentMonthQuery = useCurrentMonthQuery()
  const currentYearQuery = useCurrentYearQuery()
  const lastYearQuery = useLastYearQuery()
  const forecastQuery = useForecastQuery()
  const summaryQuery = useSummaryQuery()
  return [
    lastMonthQuery,
    currentMonthQuery,
    currentYearQuery,
    lastYearQuery,
    forecastQuery,
    summaryQuery
  ]
}

export { default as default_query } from '../queries/report-current-month.gql'
