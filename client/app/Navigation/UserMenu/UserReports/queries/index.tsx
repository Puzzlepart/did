/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { IChoiceGroupOption } from 'office-ui-fabric-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  currentMonthQuery,
  currentYearQuery,
  lastMonthQuery,
  lastYearQuery
} from '../../../../../pages/Reports/hooks/queries'
import user_report_current_month from './user-report-current-month.gql'
import user_report_current_year from './user-report-current-year.gql'
import user_report_last_month from './user-report-last-month.gql'
import user_report_last_year from './user-report-last-year.gql'

/**
 * Query hook
 *
 * @category UserReports
 */
export function useQueries(): IChoiceGroupOption[] {
  const { t } = useTranslation()
  return useMemo(
    () => [
      lastMonthQuery<IChoiceGroupOption>(t, user_report_last_month),
      currentMonthQuery<IChoiceGroupOption>(t, user_report_current_month),
      lastYearQuery<IChoiceGroupOption>(t, user_report_last_year),
      currentYearQuery<IChoiceGroupOption>(t, user_report_current_year)
    ],
    []
  )
}

export { user_report_current_month as default_query }
