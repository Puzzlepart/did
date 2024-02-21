import {
  useCurrentMonthQuery,
  useCurrentYearQuery,
  useLastMonthQuery,
  useLastYearQuery
} from 'pages/Reports/hooks/useReportsQueries'
import user_report_current_month from './user-report-current-month.gql'
import user_report_current_year from './user-report-current-year.gql'
import user_report_last_month from './user-report-last-month.gql'
import user_report_last_year from './user-report-last-year.gql'
import { useMemo } from 'react'

/**
 * Returns a memoized array of queries for the UserReports component.
 *
 * @category UserReports
 */
export function useQueries(): any[] {
  const lastMonthQuery = useLastMonthQuery(user_report_last_month)
  const currentMonthQuery = useCurrentMonthQuery(user_report_current_month)
  const currentYearQuery = useCurrentYearQuery(user_report_current_year)
  const lastYearQuery = useLastYearQuery(user_report_last_year)
  return useMemo(
    () =>
      [lastMonthQuery, currentMonthQuery, currentYearQuery, lastYearQuery].map(
        (query) => ({
          ...query,
          key: query.id,
          text: query.text
        })
      ),
    []
  )
}

export { default as default_query } from './user-report-current-month.gql'
