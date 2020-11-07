import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import { ITimesheetContext } from '../context'
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS'

const currentWeek = ({ scope, dispatch, t }: ITimesheetContext): IContextualMenuItem => ({
    key: 'GO_TO_CURRENT_WEEK_COMMAND',
    iconOnly: true,
    iconProps: { iconName: 'RenewalCurrent', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'SET_SCOPE' }),
    disabled: scope.isCurrentWeek,
    title: t('timesheet.goToCurrentWeek'),
})

const prevWeek = ({  scope, dispatch, t }: ITimesheetContext): IContextualMenuItem => ({
    key: 'GO_TO_PREV_WEEK_COMMAND',
    iconOnly: true,
    iconProps: { iconName: 'Back', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'SET_SCOPE', payload: scope.startDateTime.add('-1w').$    }),
    title: t('timesheet.goToPrevWeek')
})

const nextWeek = ({ scope,dispatch, t }: ITimesheetContext): IContextualMenuItem => ({
    key: 'GO_TO_NEXT_WEEK_COMMAND',
    iconOnly: true,
    iconProps: { iconName: 'Forward', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'SET_SCOPE', payload:  scope.startDateTime.add('1w').$ }),
    title: t('timesheet.goToNextWeek'),
})

export default (context: ITimesheetContext) => ([currentWeek, prevWeek, nextWeek]).map(cmd => cmd(context))
