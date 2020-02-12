import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS';
import { ITimeEntry } from 'models';
import { getDurationDisplay } from 'helpers';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';

export const GROUP_BY_PROJECT: IContextualMenuItem = {
    key: 'GROUP_BY_PROJECT',
    name: 'Project',
    title: 'Group by Project',
    iconProps: { iconName: 'ProjectCollection', ...ACTIONBAR_ICON_PROPS },
    data: {
        groups: {
            fieldName: 'project.name',
            emptyGroupName: '@Not matched',
            totalFunc: (items: ITimeEntry[]) => {
                let totalMins = items.reduce((sum, i) => sum += i.durationMinutes, 0);
                return ` (${getDurationDisplay(totalMins)})`;
            },
        },
        hideColumns: [],
        dateFormat: 'ddd HH:mm',
    },
};