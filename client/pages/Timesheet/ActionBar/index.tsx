import { getId } from '@uifabric/utilities';
import { HotkeyButton } from 'common/components/HotkeyButton';
import { useHotkeyModal } from 'common/components/HotkeyModal';
import resource from 'i18n';
import * as moment from 'moment';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import * as React from 'react';
import { TimesheetPeriod } from '../TimesheetPeriod';
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS';
import { IActionBarProps } from './IActionBarProps';
import { WeekPicker } from './WeekPicker';
import { HOT_KEYS_REGISTRY, HOT_KEYS } from '../';
import { HotkeyContextualMenuItem } from 'common/components/HotkeyContextualMenuItem';
require('moment/locale/en-gb');

const NAVIGATE_CURRENT_WEEK = (scope: ITimesheetScope, onChangeScope: (scope: ITimesheetScope) => void) => HotkeyContextualMenuItem({
    id: getId('NAVIGATE_CURRENT_WEEK'),
    key: getId('NAVIGATE_CURRENT_WEEK'),
    itemType: ContextualMenuItemType.Normal,
    iconOnly: true,
    iconProps: { iconName: 'RenewalCurrent', ...ACTIONBAR_ICON_PROPS },
    onClick: () => {
        document.location.hash = '';
        onChangeScope({});
    },
    disabled: scope.startDateTime.week() === moment().week(),
    title: resource('TIMESHEET.COMMANDBAR_CURRENT_WEEK_TEXT'),
}, 'alt+p', HOT_KEYS_REGISTRY);

const NAVIGATE_PREVIOUS_WEEK = (scope: ITimesheetScope, onChangeScope: (scope: ITimesheetScope) => void) => HotkeyContextualMenuItem({
    id: getId('PREVIOUS_WEEK'),
    key: getId('PREVIOUS_WEEK'),
    itemType: ContextualMenuItemType.Normal,
    iconOnly: true,
    iconProps: { iconName: 'Back', ...ACTIONBAR_ICON_PROPS },
    onClick: () => onChangeScope({ startDateTime: scope.startDateTime.subtract(1, 'week') }),
    title: resource('TIMESHEET.COMMANDBAR_PREV_WEEK_TEXT')
}, 'alt+l', HOT_KEYS_REGISTRY);

const NAVIGATE_NEXT_WEEK = (scope: ITimesheetScope, onChangeScope: (scope: ITimesheetScope) => void) => HotkeyContextualMenuItem({
    id: getId('NEXT_WEEK'),
    key: getId('NEXT_WEEK'),
    itemType: ContextualMenuItemType.Normal,
    iconOnly: true,
    iconProps: { iconName: 'Forward', ...ACTIONBAR_ICON_PROPS },
    onClick: () => onChangeScope({ startDateTime: scope.startDateTime.add(1, 'week') }),
    title: resource('TIMESHEET.COMMANDBAR_NEXT_WEEK_TEXT'),
}, 'alt+m', HOT_KEYS_REGISTRY);

const WEEK_PICKER = (scope: ITimesheetScope, onChangeScope: (scope: ITimesheetScope) => void) => ({
    id: getId('WEEK_PICKER'),
    key: getId('WEEK_PICKER'),
    itemType: ContextualMenuItemType.Normal,
    onRender: () => <WeekPicker scope={scope} onChange={onChangeScope} />,
});

const CONFIRM_HOURS_ACTIONS = (selectedPeriod: TimesheetPeriod, loading: boolean, onUnconfirmPeriod: () => void, onConfirmPeriod: () => void) => ({
    id: getId('CONFIRM_HOURS_ACTIONS'),
    key: getId('CONFIRM_HOURS_ACTIONS'),
    itemType: ContextualMenuItemType.Normal,
    onRender: () => (
        <>
            <HotkeyButton
                hidden={selectedPeriod.isConfirmed}
                registry={HOT_KEYS_REGISTRY}
                hotkey="alt+b"
                type='primary'
                disabled={loading || selectedPeriod.unmatchedDuration > 0}
                iconProps={{ iconName: 'CheckMark' }}
                onClick={onConfirmPeriod}
                text={resource('TIMESHEET.CONFIRM_HOURS_TEXT')}
                styles={{ root: { height: 44, marginLeft: 4 } }} />
            <HotkeyButton
                hidden={!selectedPeriod.isConfirmed}
                registry={HOT_KEYS_REGISTRY}
                hotkey="alt+a"
                disabled={loading}
                iconProps={{ iconName: 'Cancel' }}
                onClick={onUnconfirmPeriod}
                text={resource('TIMESHEET.UNCONFIRM_HOURS_TEXT')}
                styles={{ root: { height: 44, marginLeft: 4 } }} />
        </>
    )
});

const NAVIGATE_PERIOD_BUTTON = (id: number, onChangePeriod: (periodId: string) => void, loading: boolean, selectedPeriod: TimesheetPeriod, period: TimesheetPeriod, disabled: boolean) => ({
    id: getId('NAVIGATE_PERIOD_BUTTON'),
    key: getId('NAVIGATE_PERIOD_BUTTON'),
    itemType: ContextualMenuItemType.Normal,
    onRender: () => (
        <HotkeyButton
            registry={!disabled && HOT_KEYS_REGISTRY}
            hotkey={id === 0 ? HOT_KEYS.NAVIGATE_PERIOD_1 : HOT_KEYS.NAVIGATE_PERIOD_2}
            hidden={loading}
            iconProps={{ iconName: 'DateTime' }}
            onClick={_ => onChangePeriod(period.id)}
            text={period.name}
            hotkeyDescription={`Go to ${period.name}`}
            styles={{ root: { height: 44, marginLeft: 4 } }}
            checked={period.id === selectedPeriod.id}
            disabled={disabled} />
    ),
});

/**
 * @category Timesheet
 */
export const ActionBar = (props: IActionBarProps) => {
    const history = useHistory();
    const { scope, loading, periods, selectedPeriod, dispatch } = React.useContext(TimesheetContext);
    const items = [
        NAVIGATE_CURRENT_WEEK(props.timesheet.scope, props.onChangeScope),
        NAVIGATE_PREVIOUS_WEEK(props.timesheet.scope, props.onChangeScope),
        NAVIGATE_NEXT_WEEK(props.timesheet.scope, props.onChangeScope),
        WEEK_PICKER(props.timesheet.scope, props.onChangeScope),
        ...props.timesheet.periods.map((period, id) => NAVIGATE_PERIOD_BUTTON(id, props.onChangePeriod, props.timesheet.loading, props.selectedPeriod, period, props.timesheet.periods.length === 1)),
    ];
    const farItems = [
        CONFIRM_HOURS_ACTIONS(props.selectedPeriod, props.timesheet.loading, props.onUnconfirmPeriod, props.onConfirmPeriod),
    ];

    const [hotkeys] = useHotkeyModal(HOT_KEYS_REGISTRY, 'alt+i');

    return (
        <>
            {hotkeys}
            <CommandBar
                styles={{ root: { padding: 0 } }}
                items={items}
                farItems={farItems} />
        </>
    )
}