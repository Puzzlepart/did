/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { DateObject } from 'DateUtils'
import { TFunction } from 'i18next'
import {
  currentMonthQuery,
  currentYearQuery,
  lastMonthQuery
} from 'pages/Reports/hooks/useReportsQueries'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import user_report_current_month from './user-report-current-month.gql'
import user_report_current_year from './user-report-current-year.gql'
import user_report_last_month from './user-report-last-month.gql'
import user_report_last_year from './user-report-last-year.gql'

/**
 * Returns query properties for preset
 * **LAST_YEAR**
 *
 * @param t - Translate
 * @param query - GraphQL query
 *
 * @category UserReports
 */
export function lastYearQuery(t: TFunction, query: any) {
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
  }
}

/**
 * Query hook
 *
 * @category UserReports
 */
export function useQueries(): any[] {
  const { t } = useTranslation()
  return [
    lastMonthQuery(t, user_report_last_month),
    currentMonthQuery(t, user_report_current_month),
    lastYearQuery(t, user_report_last_year),
    currentYearQuery(t, user_report_current_year)
  ].map((query) => ({
    ...query,
    key: query.itemKey,
    text: query.headerText
  }))
}

export { user_report_current_month as default_query }
