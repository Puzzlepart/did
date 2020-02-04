import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS';
import { ITimeEntry } from 'models';
import { getDurationDisplay } from 'helpers';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';

export const GROUP_BY_CUSTOMER: IContextualMenuItem = {
    key: 'GROUP_BY_CUSTOMER',
    name: 'Customer',
    title: 'Group by Customer',
    iconProps: { iconName: 'Work', ...ACTIONBAR_ICON_PROPS },
    data: {
        groups: {
            fieldName: 'customer.name',
            emptyGroupName: '@Not matched',
            totalFunc: (items: ITimeEntry[]) => {
                let totalMins = items.reduce((sum, i) => sum += i.durationMinutes, 0);
                return ` (${getDurationDisplay(totalMins)})`;
            },
        },
        hideColumns: ['customer'],
        dateFormat: 'ddd HH:mm',
    },
};