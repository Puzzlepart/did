import resource from 'i18n';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ContextualMenuItemType, IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import * as React from 'react';
import { first } from 'underscore';
import { TimesheetContext } from '../';
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS';
import { IActionBarProps } from './IActionBarProps';
import { WeekPicker } from './WeekPicker';
require('moment/locale/en-gb');

/**
 * @category Timesheet
 */
export const ActionBar = (props: IActionBarProps) => {
    const { state, dispatch } = React.useContext(TimesheetContext);
    const items = [
        {
            key: 'THIS_WEEK',
            itemType: ContextualMenuItemType.Normal,
            iconOnly: true,
            iconProps: { iconName: 'RenewalCurrent', ...ACTIONBAR_ICON_PROPS },
            onClick: () => dispatch({ type: 'MOVE_SCOPE', payload: new Date().toISOString() }),
            disabled: state.scope.isCurrentWeek,
            title: resource('TIMESHEET.COMMANDBAR_CURRENT_WEEK_TEXT'),
        },
        {
            key: 'PREV_WEEK',
            itemType: ContextualMenuItemType.Normal,
            iconOnly: true,
            iconProps: { iconName: 'Back', ...ACTIONBAR_ICON_PROPS },
            onClick: () => dispatch({ type: 'MOVE_SCOPE', payload: { amount: -1, unit: 'week' } }),
            title: resource('TIMESHEET.COMMANDBAR_PREV_WEEK_TEXT')
        },
        {
            key: 'NEXT_WEEK',
            itemType: ContextualMenuItemType.Normal,
            iconOnly: true,
            iconProps: { iconName: 'Forward', ...ACTIONBAR_ICON_PROPS },
            onClick: () => dispatch({ type: 'MOVE_SCOPE', payload: { amount: 1, unit: 'week' } }),
            title: resource('TIMESHEET.COMMANDBAR_NEXT_WEEK_TEXT'),
        },
        {
            key: 'WEEK_PICKER',
            itemType: ContextualMenuItemType.Normal,
            onRender: () => <WeekPicker />,
        },
        ...(state.periods.length === 1
            ? [
                {
                    key: 'PERIOD_0',
                    itemType: ContextualMenuItemType.Header,
                    onRender: () => !state.loading && (
                        <div style={{ marginTop: 12 }}>
                            {first(state.periods).getName(false)}
                        </div>
                    ),
                } as IContextualMenuItem,
            ]
            :
            state.periods.map((period, idx) => ({
                key: `PERIOD_${idx}`,
                itemType: ContextualMenuItemType.Normal,
                onRender: () => !state.loading && (
                    <DefaultButton
                        hidden={!!state.loading}
                        iconProps={{ iconName: 'DateTime' }}
                        onClick={() => dispatch({ type: 'CHANGE_PERIOD', payload: period.id })}
                        text={period.getName(true)}
                        styles={{ root: { height: 44, marginLeft: 4 } }}
                        checked={period.id === state.selectedPeriod.id} />
                ),
            })))
    ];
    const farItems = [
        {
            key: 'CONFIRM_HOURS',
            itemType: ContextualMenuItemType.Normal,
            onRender: () => state.selectedPeriod.isConfirmed
                ? (
                    <DefaultButton
                        hidden={!!state.loading}
                        iconProps={{ iconName: 'Cancel' }}
                        onClick={props.onUnconfirmPeriod}
                        text={resource('TIMESHEET.UNCONFIRM_HOURS_TEXT')}
                        styles={{ root: { height: 44, marginLeft: 4 } }} />
                )
                : (
                    <PrimaryButton
                        hidden={
                            !!state.loading
                            || state.selectedPeriod.unmatchedDuration > 0
                            || state.selectedPeriod.events.length === 0
                        }
                        iconProps={{ iconName: 'CheckMark' }}
                        onClick={props.onConfirmPeriod}
                        text={resource('TIMESHEET.CONFIRM_HOURS_TEXT')}
                        styles={{ root: { height: 44, marginLeft: 4 } }} />
                )
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