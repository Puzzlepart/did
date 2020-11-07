import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { ITimesheetContext } from '../context'
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS'

const currentWeek = ({ scope, dispatch, t }: ITimesheetContext): IContextualMenuItem => ({
    key: 'GO_TO_CURRENT_WEEK_COMMAND',
    iconOnly: true,
    iconProps: { iconName: 'RenewalCurrent', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'MOVE_SCOPE', payload: new Date().toISOString() }),
    disabled: scope.isCurrentWeek,
    title: t('timesheet.goToCurrentWeek'),
})

const prevWeek = ({ dispatch, t }: ITimesheetContext): IContextualMenuItem => ({
    key: 'GO_TO_PREV_WEEK_COMMAND',
    iconOnly: true,
    iconProps: { iconName: 'Back', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'MOVE_SCOPE', payload: { amount: -1, unit: 'week' } }),
    title: t('timesheet.goToPrevWeek')
})

const nextWeek = ({ dispatch, t }: ITimesheetContext): IContextualMenuItem => ({
    key: 'GO_TO_NEXT_WEEK_COMMAND',
    iconOnly: true,
    iconProps: { iconName: 'Forward', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'MOVE_SCOPE', payload: { amount: 1, unit: 'week' } }),
    title: t('timesheet.goToNextWeek'),
})

export default (context: ITimesheetContext) => ([currentWeek, prevWeek, nextWeek]).map(cmd => cmd(context))
