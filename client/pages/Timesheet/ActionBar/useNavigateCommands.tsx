import { TFunction } from 'i18next'
import { IContextualMenuItem } from 'office-ui-fabric'
import { useContext } from 'react'
import { ITimesheetContext } from '../context'
import { SET_SCOPE } from '../reducer/actions'
import { TimesheetContext, TimesheetScope } from '../types'
import styles from './ActionBar.module.scss'

const navigateCommands = [
  {
    title: (t: TFunction) => t('timesheet.goToCurrentWeek'),
    date: new Date(),
    iconName: 'RenewalCurrent',
    disabled: (context: ITimesheetContext) => context.scope.isCurrentWeek || context.loading
  },
  {
    title: (t: TFunction) => t('timesheet.goToPrevWeek'),
    add: '-1w',
    iconName: 'Back',
    disabled: (context: ITimesheetContext) => context.loading
  },
  {
    title: (t: TFunction) => t('timesheet.goToNextWeek'),
    add: '1w',
    iconName: 'Forward',
    disabled: (context: ITimesheetContext) => context.loading
  }
]
/**
 * Use navigate commands
 */
export function useNavigateCommands(): IContextualMenuItem[] {
  const context = useContext(TimesheetContext)
  return navigateCommands.map(
    (cmd, key) =>
      ({
        key: `${key}`,
        iconOnly: true,
        disabled: cmd.disabled(context),
        iconProps: { iconName: cmd.iconName, className: styles.actionBarIcon },
        onClick: () =>
          context.dispatch(
            SET_SCOPE({
              scope: cmd.add ? context.scope.set(cmd?.add) : new TimesheetScope(cmd.date)
            })
          ),
        title: cmd.title(context.t)
      } as IContextualMenuItem)
  )
}
