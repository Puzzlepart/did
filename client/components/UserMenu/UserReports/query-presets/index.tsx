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
} from '../../../../pages/Reports/hooks/queries'
import user_query_preset_current_month from './user-query-preset-current-month.gql'
import user_query_preset_current_year from './user-query-preset-current-year.gql'
import user_query_preset_last_month from './user-query-preset-last-month.gql'
import user_query_preset_last_year from './user-query-preset-last-year.gql'

/**
 * Use user query presets
 *
 * @category UserReports
 */
export function useQueryPresets(): IChoiceGroupOption[] {
  const { t } = useTranslation()
  return useMemo(
    () => [
      lastMonthQuery(t, user_query_preset_last_month),
      currentMonthQuery(t, user_query_preset_current_month),
      lastYearQuery(t, user_query_preset_last_year),
      currentYearQuery(t, user_query_preset_current_year)
    ],
    []
  )
}

export { user_query_preset_current_month as default_query_preset }
