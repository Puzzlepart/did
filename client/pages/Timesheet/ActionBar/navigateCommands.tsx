import { TFunction } from 'i18next'
import { IContextualMenuItem } from 'office-ui-fabric-react'
import { ITimesheetContext } from '../context'
import { TimesheetScope } from '../TimesheetScope'
import styles from './ActionBar.module.scss'

const navigateCommands = [
    {
        title: (t: TFunction) => t('timesheet.goToCurrentWeek'),
        add: null,
        iconName: 'RenewalCurrent',
        disabled: (scope: TimesheetScope) => scope.isCurrentWeek,
    },
    {
        title: (t: TFunction) => t('timesheet.goToPrevWeek'),
        add: '-1w',
        iconName: 'Back',
    },
    {
        title: (t: TFunction) => t('timesheet.goToNextWeek'),
        add: '1w',
        iconName: 'Forward',
    }
]

export default (context: ITimesheetContext) => (navigateCommands).map((cmd, key) => ({
    key: `${key}`,
    iconOnly: true,
    iconProps: { iconName: cmd.iconName, className: styles.actionBarIcon },
    onClick: () => context.dispatch({ type: 'SET_SCOPE', payload: cmd.add && context.scope.startDateTime.add(cmd.add).$ }),
    title: cmd.title(context.t),
} as IContextualMenuItem))
