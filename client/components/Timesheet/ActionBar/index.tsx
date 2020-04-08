import * as moment from 'moment';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import * as React from 'react';
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS';
import { IActionBarProps } from './IActionBarProps';
import { WeekPicker } from './WeekPicker';
import i18n from 'i18next';
require('moment/locale/en-gb');

export const ActionBar = (props: IActionBarProps) => {
    return (
        <CommandBar
            styles={{ root: { padding: 0 } }}
            items={[
                {
                    key: 'THIS_WEEK',
                    iconOnly: true,
                    iconProps: { iconName: 'RenewalCurrent', ...ACTIONBAR_ICON_PROPS },
                    onClick: () => {
                        document.location.hash = '';
                        props.onChangeScope({});
                    },
                    disabled: props.scope.startDateTime.week() === moment().week(),
                },
                {
                    key: 'PREV_WEEK',
                    iconOnly: true,
                    iconProps: { iconName: 'Back', ...ACTIONBAR_ICON_PROPS },
                    onClick: () => {
                        props.onChangeScope({ startDateTime: props.scope.startDateTime.subtract(1, 'week') });
                    },
                    title: i18n.t('timesheet.navPrevWeekText')
                },
                {
                    key: 'NEXT_WEEK',
                    iconOnly: true,
                    iconProps: { iconName: 'Forward', ...ACTIONBAR_ICON_PROPS },
                    onClick: () => {
                        props.onChangeScope({ startDateTime: props.scope.startDateTime.add(1, 'week') });
                    },
                    title: i18n.t('timesheet.navNextWeekText'),
                },
                {
                    key: 'PICK_WEEK',
                    onRender: () => <WeekPicker scope={props.scope} onChange={props.onChangeScope} />,
                },
                {
                    key: 'WEEK_NUMBER_TEXT',
                    itemType: ContextualMenuItemType.Header,
                    onRender: () => <span style={{ padding: '12px 0 0 12px' }}>{`Week ${props.scope.startDateTime.week()}`}</span>,
                },
            ]}
            farItems={
                [
                    {
                        key: 'CONFIRM_HOURS',
                        name: i18n.t('timesheet.confirmHoursText'),
                        iconProps: { iconName: 'CheckMark', ...ACTIONBAR_ICON_PROPS },
                        onClick: props.onConfirmPeriod,
                        disabled: props.disabled.CONFIRM_WEEK,
                    },
                    {
                        key: 'UNCONFIRM_HOURS',
                        name: i18n.t('timesheet.unconfirmHoursText'),
                        iconProps: { iconName: 'ErrorBadge', ...ACTIONBAR_ICON_PROPS },
                        onClick: props.onUnconfirmPeriod,
                        disabled: props.disabled.UNCONFIRM_WEEK,
                    }
                ]}
        />
    )
}