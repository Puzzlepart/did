import * as moment from 'moment';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import * as React from 'react';
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS';
import { IActionBarProps } from './IActionBarProps';
import { WeekPicker } from './WeekPicker';
require('moment/locale/en-gb');

export const ActionBar = (props: IActionBarProps) => {
    return (
        <CommandBar
            styles={{ root: { padding: 0 } }}
            items={[
                {
                    key: 'THIS_WEEK',
                    name: 'This week',
                    onClick: () => {
                        document.location.hash = '';
                        props.onChangePeriod({});
                    },
                    disabled: props.period.startDateTime.week() === moment().week(),
                },
                {
                    key: 'PREV_WEEK',
                    iconOnly: true,
                    iconProps: { iconName: 'Back', ...ACTIONBAR_ICON_PROPS },
                    onClick: () => {
                        props.onChangePeriod({ startDateTime: props.period.startDateTime.subtract(1, 'week') });
                    },
                    title: 'Go to previous week',
                },
                {
                    key: 'NEXT_WEEK',
                    iconOnly: true,
                    iconProps: { iconName: 'Forward', ...ACTIONBAR_ICON_PROPS },
                    onClick: () => {
                        props.onChangePeriod({ startDateTime: props.period.startDateTime.add(1, 'week') });
                    },
                    title: 'Go to next week',
                },
                {
                    key: 'PICK_WEEK',
                    onRender: () => <WeekPicker period={props.period} onChange={props.onChangePeriod} />,
                },
                {
                    key: 'WEEK_NUMBER_TEXT',
                    itemType: ContextualMenuItemType.Header,
                    onRender: () => <span style={{ padding: '12px 0 0 12px' }}>{`Week ${props.period.startDateTime.week()}`}</span>,
                },
            ]}
            farItems={
                [
                    {
                        key: 'CONFIRM_WEEK',
                        name: 'Confirm week',
                        iconProps: { iconName: 'CheckMark', ...ACTIONBAR_ICON_PROPS },
                        onClick: props.onConfirmWeek,
                        disabled: props.disabled.CONFIRM_WEEK,
                    },
                    {
                        key: 'UNCONFIRM_WEEK',
                        name: 'Unconfirm week',
                        iconProps: { iconName: 'ErrorBadge', ...ACTIONBAR_ICON_PROPS },
                        onClick: props.onUnconfirmWeek,
                        disabled: props.disabled.UNCONFIRM_WEEK,
                    },
                    {
                        key: 'RELOAD',
                        name: 'Reload',
                        iconProps: { iconName: 'Refresh', ...ACTIONBAR_ICON_PROPS },
                        onClick: props.onReload,
                        disabled: props.disabled.RELOAD,
                    }
                ]}
        />
    )
}