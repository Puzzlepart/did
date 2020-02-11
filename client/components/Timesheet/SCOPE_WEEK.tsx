import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ACTIONBAR_ICON_PROPS } from './ActionBar/ACTIONBAR_ICON_PROPS';

export const SCOPE_WEEK: IContextualMenuItem = {
    key: 'SCOPE_WEEK',
    name: 'Week',
    iconProps: { iconName: 'CalendarWorkWeek', ...ACTIONBAR_ICON_PROPS },
    data: {
        CURRENT_PERIOD_TEXT: 'This week',
        PREV_PERIOD_TEXT: 'Go to previous week',
        NEXT_PERIOD_TEXT: 'Go to next week',
        DURATION_DISPLAY_FORMAT: 'You have a total of {0} this week',
    }
};