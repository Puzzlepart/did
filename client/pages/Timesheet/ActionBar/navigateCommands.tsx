import { TFunction } from 'i18next'
import { IContextualMenuItem } from 'office-ui-fabric'
import { ITimesheetContext } from '../context'
import styles from './ActionBar.module.scss'

const navigateCommands = [
  {
    title: (t: TFunction) => t('timesheet.goToCurrentWeek'),
    add: null,
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

export default (context: ITimesheetContext) =>
  navigateCommands.map(
    (cmd, key) =>
      ({
        key: `${key}`,
        iconOnly: true,
        disabled: cmd.disabled(context),
        iconProps: { iconName: cmd.iconName, className: styles.actionBarIcon },
        onClick: () =>
          context.dispatch({ type: 'SET_SCOPE', payload: cmd.add && context.scope.startDate.add(cmd.add).$ }),
        title: cmd.title(context.t)
      } as IContextualMenuItem)
  )
