import { IContextualMenuItem } from '@fluentui/react'
import { useTranslation } from 'react-i18next'
import {
  NEXT_PERIOD,
  PREVIOUS_PERIOD,
  SET_DATE_RANGE
} from '../reducer/actions'
import { TimesheetDateRange, useTimesheetContext } from '../types'

/**
 * Returns Timesheet navigation commands based on
 * `state` from `TimesheetContext`.
 */
export function useNavigateCommands() {
  const { t } = useTranslation()
  const { state, dispatch } = useTimesheetContext()
  const navigateCurrentWeekMonth: IContextualMenuItem = {
    key: 'NAVIGATE_CURRENT_WEEK_MONTH',
    title: t('timesheet.goToCurrentWeek'),
    iconProps: { iconName: 'RenewalCurrent' },
    disabled: state.dateRange.isCurrent || !!state.loading,
    onClick: () =>
      dispatch(
        SET_DATE_RANGE(new TimesheetDateRange(new Date(), state.dateRangeType))
      )
  }
  const navigatePreviousPeriod: IContextualMenuItem = {
    key: 'NAVIGATE_PREVIOUS_PERIOD',
    title: t('timesheet.goToPrevWeek'),
    iconProps: { iconName: 'Back' },
    disabled: !!state.loading,
    onClick: () => dispatch(PREVIOUS_PERIOD())
  }
  const navigateNextPeriod: IContextualMenuItem = {
    key: 'NAVIGATE_NEXT_PERIOD',
    title: t('timesheet.goToNextWeek'),
    iconProps: { iconName: 'Forward' },
    disabled: !!state.loading,
    onClick: () => dispatch(NEXT_PERIOD())
  }
  return [navigateCurrentWeekMonth, navigatePreviousPeriod, navigateNextPeriod]
}
