/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import {
  currentMonthQuery,
  currentYearQuery,
  lastMonthQuery,
  lastYearQuery
} from 'pages/Reports/hooks/useReportsQueries'
import { useTranslation } from 'react-i18next'
import user_report_current_month from './user-report-current-month.gql'
import user_report_current_year from './user-report-current-year.gql'
import user_report_last_month from './user-report-last-month.gql'
import user_report_last_year from './user-report-last-year.gql'

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
