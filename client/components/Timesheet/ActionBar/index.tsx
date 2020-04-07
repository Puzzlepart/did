import resource from 'i18n';
import * as moment from 'moment';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS';
import { IActionBarProps } from './IActionBarProps';
import { WeekPicker } from './WeekPicker';
require('moment/locale/en-gb');

export const ActionBar = (props: IActionBarProps) => {
    const items = [
        {
            key: 'THIS_WEEK',
            itemType: ContextualMenuItemType.Normal,
            iconOnly: true,
            iconProps: { iconName: 'RenewalCurrent', ...ACTIONBAR_ICON_PROPS },
            onClick: () => {
                document.location.hash = '';
                props.onChangeScope({});
            },
            disabled: props.timesheet.scope.startDateTime.week() === moment().week(),
            title: resource('TIMESHEET.COMMANDBAR_CURRENT_WEEK_TEXT'),
        },
        {
            key: 'PREV_WEEK',
            itemType: ContextualMenuItemType.Normal,
            iconOnly: true,
            iconProps: { iconName: 'Back', ...ACTIONBAR_ICON_PROPS },
            onClick: () => props.onChangeScope({ startDateTime: props.timesheet.scope.startDateTime.subtract(1, 'week') }),
            title: resource('TIMESHEET.COMMANDBAR_PREV_WEEK_TEXT')
        },
        {
            key: 'NEXT_WEEK',
            itemType: ContextualMenuItemType.Normal,
            iconOnly: true,
            iconProps: { iconName: 'Forward', ...ACTIONBAR_ICON_PROPS },
            onClick: () => props.onChangeScope({ startDateTime: props.timesheet.scope.startDateTime.add(1, 'week') }),
            title: resource('TIMESHEET.COMMANDBAR_NEXT_WEEK_TEXT'),
        },
        {
            key: 'WEEK_PICKER',
            itemType: ContextualMenuItemType.Normal,
            onRender: () => <WeekPicker scope={props.timesheet.scope} onChange={props.onChangeScope} />,
        },
        ...props.timesheet.periods.map((period, idx) => ({
            key: `PERIOD_${idx}`,
            itemType: ContextualMenuItemType.Normal,
            onRender: () => (
                <DefaultButton
                    hidden={props.timesheet.loading}
                    onClick={_ => props.onChangePeriod(period)}
                    text={period.name}
                    styles={{ root: { height: 44, marginLeft: 4 } }}
                    checked={period.id === props.selectedPeriod.id}
                    disabled={props.timesheet.periods.length === 1} />
            ),
        })),
    ];
    const farItems = [
        {
            key: 'CONFIRM_HOURS',
            itemType: ContextualMenuItemType.Normal,
            name: resource('TIMESHEET.CONFIRM_HOURS_TEXT'),
            iconProps: { iconName: 'CheckMark', ...ACTIONBAR_ICON_PROPS },
            onClick: props.onConfirmPeriod,
            disabled: props.timesheet.loading || props.selectedPeriod.isConfirmed || props.selectedPeriod.errors.length > 0,
        },
        {
            key: 'UNCONFIRM_HOURS',
            itemType: ContextualMenuItemType.Normal,
            name: resource('TIMESHEET.UNCONFIRM_HOURS_TEXT'),
            iconProps: { iconName: 'ErrorBadge', ...ACTIONBAR_ICON_PROPS },
            onClick: props.onUnconfirmPeriod,
            disabled: props.timesheet.loading || !props.selectedPeriod.isConfirmed,
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