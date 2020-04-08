import resource from 'i18n';
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
                    itemType: ContextualMenuItemType.Normal,
                    iconOnly: true,
                    iconProps: { iconName: 'RenewalCurrent', ...ACTIONBAR_ICON_PROPS },
                    onClick: () => {
                        document.location.hash = '';
                        props.onChangeScope({});
                    },
                    disabled: props.scope.startDateTime.week() === moment().week(),
                    title: resource('TIMESHEET.COMMANDBAR_CURRENT_WEEK_TEXT'),
                },
                {
                    key: 'PREV_WEEK',
                    itemType: ContextualMenuItemType.Normal,
                    iconOnly: true,
                    iconProps: { iconName: 'Back', ...ACTIONBAR_ICON_PROPS },
                    onClick: () => {
                        props.onChangeScope({ startDateTime: props.scope.startDateTime.subtract(1, 'week') });
                    },
                    title: resource('TIMESHEET.COMMANDBAR_PREV_WEEK_TEXT')
                },
                {
                    key: 'NEXT_WEEK',
                    itemType: ContextualMenuItemType.Normal,
                    iconOnly: true,
                    iconProps: { iconName: 'Forward', ...ACTIONBAR_ICON_PROPS },
                    onClick: () => {
                        props.onChangeScope({ startDateTime: props.scope.startDateTime.add(1, 'week') });
                    },
                    title: resource('TIMESHEET.COMMANDBAR_NEXT_WEEK_TEXT'),
                },
                {
                    key: 'PICK_WEEK',
                    itemType: ContextualMenuItemType.Normal,
                    onRender: () => <WeekPicker scope={props.scope} onChange={props.onChangeScope} />,
                },
                {
                    key: 'WEEK_NUMBER_TEXT',
                    itemType: ContextualMenuItemType.Header,
                    onRender: () => <span style={{ padding: '12px 0 0 12px' }}>{`Week ${props.scope.startDateTime.week()}`}</span>,
                },
                {
                    key: 'DIVIDER_0',
                    itemType: ContextualMenuItemType.Divider,
                },
                // TODO: ..props.periods
                {
                    key: 'PERIOD_01',
                    itemType: ContextualMenuItemType.Normal,
                    iconProps: { iconName: 'Section', ...ACTIONBAR_ICON_PROPS },
                    name: `${props.scope.startDateTime.week()}/1`
                },
                {

                    key: 'PERIOD_02',
                    itemType: ContextualMenuItemType.Normal,
                    iconProps: { iconName: 'Section', ...ACTIONBAR_ICON_PROPS },
                    name: `${props.scope.startDateTime.week()}/2`
                },
            ]}
            farItems={
                [
                    {
                        key: 'CONFIRM_HOURS',
                        itemType: ContextualMenuItemType.Normal,
                        name: resource('TIMESHEET.CONFIRM_HOURS_TEXT'),
                        iconProps: { iconName: 'CheckMark', ...ACTIONBAR_ICON_PROPS },
                        onClick: props.onConfirmPeriod,
                        disabled: props.disabled.CONFIRM_WEEK,
                    },
                    {
                        key: 'UNCONFIRM_HOURS',
                        itemType: ContextualMenuItemType.Normal,
                        name: resource('TIMESHEET.UNCONFIRM_HOURS_TEXT'),
                        iconProps: { iconName: 'ErrorBadge', ...ACTIONBAR_ICON_PROPS },
                        onClick: props.onUnconfirmPeriod,
                        disabled: props.disabled.UNCONFIRM_WEEK,
                    }
                ]}
        />
    )
}