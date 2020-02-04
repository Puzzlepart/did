import { ACTIONBAR_ICON_PROPS } from "./ACTIONBAR_ICON_PROPS";
import { ITimeEntry } from "models";
import { getDurationDisplay, getWeekdays } from "helpers";
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';

export const GROUP_BY_DAY: IContextualMenuItem = {
    key: 'GROUP_BY_DAY',
    name: 'Day',
    title: 'Group by day of the week',
    iconProps: { iconName: 'CalendarDay', ...ACTIONBAR_ICON_PROPS },
    data: {
        groups: {
            fieldName: 'day',
            groupNames: getWeekdays(),
            totalFunc: (items: ITimeEntry[]) => {
                let totalMins = items.reduce((sum, i) => sum += i.durationMinutes, 0);
                return ` (${getDurationDisplay(totalMins)})`;
            },
        },
        hideColumns: [],
        dateFormat: 'HH:mm',
    },
};