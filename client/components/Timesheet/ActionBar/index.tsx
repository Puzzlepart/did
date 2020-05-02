import resource from 'i18n';
import * as moment from 'moment';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS';
import { IActionBarProps } from './IActionBarProps';
import { WeekPicker } from './WeekPicker';
import { useHistory } from "react-router-dom";
import { TimesheetContext } from '../';
require('moment/locale/en-gb');

/**
 * @category Timesheet
 */
export const ActionBar = (props: IActionBarProps) => {
    const history = useHistory();
    const { scope, loading, periods, selectedPeriod } = React.useContext(TimesheetContext);
    const items = [
        {
            key: 'THIS_WEEK',
            itemType: ContextualMenuItemType.Normal,
            iconOnly: true,
            iconProps: { iconName: 'RenewalCurrent', ...ACTIONBAR_ICON_PROPS },
            onClick: () => {
                history.push(`/timesheet`);
            },
            disabled: scope.isCurrentWeek,
            title: resource('TIMESHEET.COMMANDBAR_CURRENT_WEEK_TEXT'),
        },
        {
            key: 'PREV_WEEK',
            itemType: ContextualMenuItemType.Normal,
            iconOnly: true,
            iconProps: { iconName: 'Back', ...ACTIONBAR_ICON_PROPS },
            onClick: () => {
                let { iso } = scope.add(1, 'week');
                history.push(`/timesheet/${iso.startDateTime}`);
            },
            title: resource('TIMESHEET.COMMANDBAR_PREV_WEEK_TEXT')
        },
        {
            key: 'NEXT_WEEK',
            itemType: ContextualMenuItemType.Normal,
            iconOnly: true,
            iconProps: { iconName: 'Forward', ...ACTIONBAR_ICON_PROPS },
            onClick: () => {
                let { iso } = scope.add(-1, 'week');
                history.push(`/timesheet/${iso.startDateTime}`);
            },
            title: resource('TIMESHEET.COMMANDBAR_NEXT_WEEK_TEXT'),
        },
        {
            key: 'WEEK_PICKER',
            itemType: ContextualMenuItemType.Normal,
            onRender: () => <WeekPicker />,
        },
        ...periods.map((period, idx) => ({
            key: `PERIOD_${idx}`,
            itemType: ContextualMenuItemType.Normal,
            onRender: () => (
                <DefaultButton
                    hidden={loading}
                    iconProps={{ iconName: 'DateTime' }}
                    onClick={_ => props.onChangePeriod(period.id)}
                    text={period.name}
                    styles={{ root: { height: 44, marginLeft: 4 } }}
                    checked={period.id === selectedPeriod.id}
                    disabled={periods.length === 1} />
            ),
        })),
    ];
    const farItems = [
        {
            key: 'CONFIRM_HOURS',
            itemType: ContextualMenuItemType.Normal,
            onRender: () => selectedPeriod.isConfirmed
                ? <DefaultButton
                    disabled={loading}
                    iconProps={{ iconName: 'Cancel' }}
                    onClick={props.onUnconfirmPeriod}
                    text={resource('TIMESHEET.UNCONFIRM_HOURS_TEXT')}
                    styles={{ root: { height: 44, marginLeft: 4 } }} />
                : <PrimaryButton
                    disabled={loading || selectedPeriod.unmatchedDuration > 0}
                    iconProps={{ iconName: 'CheckMark' }}
                    onClick={props.onConfirmPeriod}
                    text={resource('TIMESHEET.CONFIRM_HOURS_TEXT')}
                    styles={{ root: { height: 44, marginLeft: 4 } }} />
        }
    ];

    return (
        <CommandBar
            styles={{ root: { padding: 0 } }}
            items={items}
            farItems={farItems}
        />
    )
}