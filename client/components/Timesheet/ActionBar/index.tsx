import { getWeek, getYear, addWeek } from 'helpers';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import * as React from 'react';
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS';
import { GROUP_BY_CUSTOMER } from './GROUP_BY_CUSTOMER';
import { GROUP_BY_DAY } from './GROUP_BY_DAY';
import { GROUP_BY_PROJECT } from './GROUP_BY_PROJECT';
import { IActionBarProps } from './IActionBarProps';
import { WeekPicker } from './WeekPicker';

export const ActionBar = ({ onClick, disabled, period, groupBy, onChangePeriod: onChangeWeek, onGroupByChanged }: IActionBarProps) => {
    return (
        <CommandBar
            styles={{ root: { margin: '10px 0 10px 0', padding: 0 } }}
            items={[
                {
                    key: 'THIS_WEEK',
                    name: 'This week',
                    onClick: () => onChangeWeek({ year: getYear(), week: getWeek() }),
                    disabled: period.week === getWeek(),
                },
                {
                    key: 'PREV_WEEK',
                    iconOnly: true,
                    iconProps: { iconName: 'Back', ...ACTIONBAR_ICON_PROPS },
                    onClick: () => onChangeWeek(addWeek(period.endDateTime, -1)),
                    title: 'Go to previous week',
                },
                {
                    key: 'NEXT_WEEK',
                    iconOnly: true,
                    iconProps: { iconName: 'Forward', ...ACTIONBAR_ICON_PROPS },
                    onClick: () => onChangeWeek(addWeek(period.endDateTime, +1)),
                    title: 'Go to next week',
                },
                {
                    key: 'PICK_WEEK',
                    onRender: () => <WeekPicker period={period} onChangeWeek={onChangeWeek} />,
                },
                {
                    key: 'DIVIDER_0',
                    itemType: ContextualMenuItemType.Divider,
                },
                {
                    key: 'WEEK_NUMBER_TEXT',
                    itemType: ContextualMenuItemType.Header,
                    name: `Week ${period.week}`,
                },
                {
                    key: 'DIVIDER_1',
                    itemType: ContextualMenuItemType.Divider,
                },
                {
                    ...groupBy,
                    key: 'GROUP_BY',
                    subMenuProps: {
                        items: [
                            GROUP_BY_DAY,
                            GROUP_BY_PROJECT,
                            GROUP_BY_CUSTOMER,
                        ].map(item => ({
                            ...item,
                            canCheck: true,
                            checked: item.key === groupBy.key,
                            onClick: () => onGroupByChanged(item),
                        }))
                    }
                }
            ]}
            farItems={
                [
                    {
                        key: 'CONFIRM_WEEK',
                        name: 'Confirm week',
                        iconProps: { iconName: 'CheckMark', ...ACTIONBAR_ICON_PROPS },
                        onClick: onClick.CONFIRM_WEEK,
                        disabled: disabled.CONFIRM_WEEK,
                    },
                    {
                        key: 'UNCONFIRM_WEEK',
                        name: 'Unconfirm week',
                        iconProps: { iconName: 'ErrorBadge', ...ACTIONBAR_ICON_PROPS },
                        onClick: onClick.UNCONFIRM_WEEK,
                        disabled: disabled.UNCONFIRM_WEEK,
                    },
                    {
                        key: 'RELOAD',
                        name: 'Reload',
                        iconProps: { iconName: 'Refresh', ...ACTIONBAR_ICON_PROPS },
                        onClick: onClick.RELOAD,
                        disabled: disabled.RELOAD,
                    }
                ]}
        />
    )
}