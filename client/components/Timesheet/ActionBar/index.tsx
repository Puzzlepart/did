import * as moment from 'moment-timezone';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import * as React from 'react';
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS';
import { GROUP_BY_CUSTOMER } from './GROUP_BY_CUSTOMER';
import { GROUP_BY_DAY } from './GROUP_BY_DAY';
import { GROUP_BY_PROJECT } from './GROUP_BY_PROJECT';
import { IActionBarProps } from './IActionBarProps';
import { WeekPicker } from './WeekPicker';
require('moment/locale/en-gb');

export const ActionBar = (props: IActionBarProps) => {
    return (
        <CommandBar
            styles={{ root: { margin: '10px 0 10px 0', padding: 0 } }}
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
                    key: 'DIVIDER_0',
                    itemType: ContextualMenuItemType.Divider,
                },
                {
                    key: 'WEEK_NUMBER_TEXT',
                    itemType: ContextualMenuItemType.Header,
                    name: `Week ${props.period.startDateTime.week()}`,
                },
                {
                    key: 'DIVIDER_1',
                    itemType: ContextualMenuItemType.Divider,
                },
                {
                    ...props.groupBy,
                    key: 'GROUP_BY',
                    subMenuProps: {
                        items: [
                            GROUP_BY_DAY,
                            GROUP_BY_PROJECT,
                            GROUP_BY_CUSTOMER,
                        ].map(opt => ({
                            ...opt,
                            canCheck: true,
                            checked: opt.key === props.groupBy.key,
                            onClick: () => props.onChangeGroupBy(opt),
                        }))
                    },
                    disabled: props.selectedView !== 'overview',
                }
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