import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TimesheetContext } from '../';
import { CHANGE_PERIOD, CONFIRM_ACTIONS, MOVE_CURRENT_WEEK, MOVE_NEXT_WEEK, MOVE_PREV_WEEK } from './items';
import { WeekPicker } from './WeekPicker';

/**
 * @category Timesheet
 */
export const ActionBar = () => {
    const { t } = useTranslation(['TIMESHEET', 'COMMON']);
    const context = React.useContext(TimesheetContext);
    const items = [
        MOVE_CURRENT_WEEK(context, t),
        MOVE_PREV_WEEK(context, t),
        MOVE_NEXT_WEEK(context, t),
        {
            key: 'WEEK_PICKER',
            itemType: ContextualMenuItemType.Normal,
            onRender: () => <WeekPicker />,
        },
        ...CHANGE_PERIOD(context, t),
    ];
    const farItems = [CONFIRM_ACTIONS(context, t)];

    return (
        <CommandBar
            styles={{ root: { padding: 0 } }}
            items={items}
            farItems={farItems}
        />
    )
}