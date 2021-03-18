import { IContextualMenuItem } from 'office-ui-fabric-react'
import { useContext } from 'react'
import { NEXT_PERIOD, PREVIOUS_PERIOD, SET_SCOPE } from '../reducer/actions'
import { TimesheetContext, TimesheetScope } from '../types'

/**
 * Returns Timesheet navigation commands based on
 * `state` from `TimesheetContext`.
 */
export function useNavigateCommands(): IContextualMenuItem[] {
  const { scope, loading, dispatch, t } = useContext(TimesheetContext)
  const navigateCurrentWeek: IContextualMenuItem = {
    key: 'NAVIGATE_CURRENT_WEEK',
    title: t('timesheet.goToCurrentWeek'),
    iconProps: { iconName: 'RenewalCurrent' },
    disabled: scope.isCurrentWeek || !!loading,
    onClick: () => dispatch(SET_SCOPE(new TimesheetScope(new Date())))
  }
  const navigatePreviousPeriod: IContextualMenuItem = {
    key: 'navigatePreviousPeriod',
    title: t('timesheet.goToPrevWeek'),
    iconProps: { iconName: 'Back' },
    disabled: !!loading,
    onClick: () => dispatch(PREVIOUS_PERIOD())
  }
  const navigateNextPeriod: IContextualMenuItem = {
    key: 'navigateNextPeriod',
    title: t('timesheet.goToNextWeek'),
    iconProps: { iconName: 'Forward' },
    disabled: !!loading,
    onClick: () => dispatch(NEXT_PERIOD())
  }
  return [navigateCurrentWeek, navigatePreviousPeriod, navigateNextPeriod]
}
