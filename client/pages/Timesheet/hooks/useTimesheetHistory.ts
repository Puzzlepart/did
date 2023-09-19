import { DateRangeType } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import s from 'underscore.string'
import { UPDATE_BREADCRUMB } from '../../../app/reducer'
import { ITimesheetState } from '../types'

/**
 * Convert enum value for `DateRangeType` to string
 *
 * @param dateRangeType - Date range type (enum)
 */
function convertDateRangeTypeToString(dateRangeType: DateRangeType) {
  switch (dateRangeType) {
    case DateRangeType.Week: {
      return 'week'
    }
    case DateRangeType.Month: {
      return 'month'
    }
  }
}

/**
 * Updates history using `useHistory` based on
 * state changes.
 *
 * @category Timesheet Hooks
 */
export function useTimesheetHistory(state: ITimesheetState) {
  const { t } = useTranslation()
  const history = useHistory()
  const appContext = useAppContext()

  /**
   * Dispatches action `UPDATE_BREADCRUMB` to App reducer.
   */
  const onUpdateBreadcrumb = (text: string, level: number) =>
    appContext.dispatch(
      UPDATE_BREADCRUMB({
        item: {
          key: text,
          text,
          level
        }
      })
    )

  useLayoutEffect(() => {
    if (!state.selectedPeriod) return
    const location = [
      '/timesheet',
      convertDateRangeTypeToString(state.dateRangeType),
      state.selectedView.id,
      state.selectedPeriod.startDate
    ].join('/')
    history.push(location)
    if (state.selectedPeriod) {
      const isSplitWeek =
        state.periods.length === 2 && state.dateRangeType === DateRangeType.Week
      if (isSplitWeek) {
        onUpdateBreadcrumb(s.capitalize(state.selectedPeriod.month), 3)
        onUpdateBreadcrumb(state.selectedPeriod.getName(t), 4)
      } else {
        onUpdateBreadcrumb(state.selectedPeriod.getName(t), 3)
      }
    }
  }, [state.selectedView, state.selectedPeriod, state.dateRangeType])
}
