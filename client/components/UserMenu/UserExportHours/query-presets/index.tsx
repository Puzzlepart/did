/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { IChoiceGroupOption } from 'office-ui-fabric-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  currentMonthQueryPreset,
  currentYearQueryPreset,
  lastMonthQueryPreset,
  lastYearQueryPreset
} from '../../../../pages/Reports/hooks/query-presets'
import user_query_preset_current_month from './user-query-preset-current-month.gql'
import user_query_preset_current_year from './user-query-preset-current-year.gql'
import user_query_preset_last_month from './user-query-preset-last-month.gql'
import user_query_preset_last_year from './user-query-preset-last-year.gql'

/**
 * Use user query presets
 *
 * @category UserExportHours
 */
export function useQueryPresets(): IChoiceGroupOption[] {
  const { t } = useTranslation()
  return useMemo(
    () => [
      lastMonthQueryPreset(t, user_query_preset_last_month),
      currentMonthQueryPreset(t, user_query_preset_current_month),
      lastYearQueryPreset(t, user_query_preset_last_year),
      currentYearQueryPreset(t, user_query_preset_current_year)
    ],
    []
  )
}

export { user_query_preset_current_month as default_query_preset }
