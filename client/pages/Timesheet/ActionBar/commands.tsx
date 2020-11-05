import { DefaultButton, IButtonStyles, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { IContextualMenuItem, IContextualMenuProps } from 'office-ui-fabric-react/lib/ContextualMenu'
import * as React from 'react'
import { first, omit } from 'underscore'
import { ITimesheetContext } from '../context'
import styles from './ActionBar.module.scss'
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS'
import { WeekPicker } from './WeekPicker'

const buttonStyles: IButtonStyles = { root: { height: 44, marginLeft: 4 } }

export const WEEK_PICKER_COMMAND = ({ selectedPeriod, periods, t }: ITimesheetContext): IContextualMenuItem => ({
    key: 'WEEK_PICKER_COMMAND',
    onRender: () => (
        <>
            <WeekPicker />
            {periods.length === 1 && (
                <span className={styles.weekNumber}>
                    {selectedPeriod.getName(t)}
                </span>
            )}
        </>
    ),
})

export const GO_TO_CURRENT_WEEK_COMMAND = ({ scope, dispatch, t }: ITimesheetContext): IContextualMenuItem => ({
    key: 'GO_TO_CURRENT_WEEK_COMMAND',
    iconOnly: true,
    iconProps: { iconName: 'RenewalCurrent', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'SET_SCOPE', payload: new Date() }),
    disabled: scope.isCurrentWeek,
    title: t('timesheet.goToCurrentWeek'),
})

export const GO_TO_PREV_WEEK_COMMAND = ({ dispatch, scope, t }: ITimesheetContext): IContextualMenuItem => ({
    key: 'GO_TO_PREV_WEEK_COMMAND',
    iconOnly: true,
    iconProps: { iconName: 'Back', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'SET_SCOPE', payload: scope.startDateTime._.subtract(1, 'week') }),
    title: t('timesheet.goToPrevWeek')
})

export const GO_TO_NEXT_WEEK_COMMAND = ({ dispatch, scope, t }: ITimesheetContext): IContextualMenuItem => ({
    key: 'GO_TO_NEXT_WEEK_COMMAND',
    iconOnly: true,
    iconProps: { iconName: 'Forward', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'SET_SCOPE', payload: scope.startDateTime._.add(1, 'week') }),
    title: t('timesheet.goToNextWeek'),
})

export const SELECT_PERIOD_COMMANDS = ({ periods, loading, selectedPeriod, dispatch, t }: ITimesheetContext): IContextualMenuItem[] => {
    if (periods.length === 1) return []
    return periods.map((period, idx) => ({
        key: `SELECT_PERIOD_COMMANDS_${idx}`,
        onRender: () => (
            <DefaultButton
                hidden={!!loading}
                iconProps={{ iconName: 'DateTime' }}
                onClick={() => dispatch({ type: 'CHANGE_PERIOD', payload: period.id })}
                text={period.getName(t, true)}
                styles={buttonStyles}
                className={styles.selectPeriodButton}
                checked={period.id === selectedPeriod.id} />
        ),
    }))
}

export const CONFIRM_FORECAST_COMMANDS = (context: ITimesheetContext): IContextualMenuItem => ({
    key: 'CONFIRM_FORECAST_COMMANDS',
    onRender: () => {
        if (context.loading || !!context.error) return null
        const {
            isComplete,
            isForecast,
            isForecasted,
            isConfirmed,
            isPast,
        } = context.selectedPeriod
        const commandProps = {
            FORECAST_PERIOD: {
                key: 'FORECAST_PERIOD',
                styles: buttonStyles,
                iconProps: { iconName: 'BufferTimeBefore' },
                onClick: () => context.onSubmitPeriod(true),
                canCheck: true,
                text: context.t('timesheet.forecastHoursText'),
                secondaryText: context.t('timesheet.forecastHoursSecondaryText'),
            },
            UNFORECAST_PERIOD: {
                key: 'UNFORECAST_PERIOD',
                styles: buttonStyles,
                iconProps: { iconName: 'Cancel' },
                onClick: () => context.onUnsubmitPeriod(true),
                canCheck: true,
                text: context.t('timesheet.unforecastHoursText'),
                secondaryText: context.t('timesheet.unforecastHoursSecondaryText'),
            },
            CONFIRM_PERIOD: {
                key: 'CONFIRM_PERIOD',
                className: styles.confirmPeriodButton,
                styles: buttonStyles,
                iconProps: { iconName: 'CheckMark' },
                onClick: () => context.onSubmitPeriod(false),
                canCheck: true,
                text: context.t('timesheet.confirmHoursText'),
                secondaryText: context.t('timesheet.confirmHoursSecondaryText')
            },
            UNCONFIRM_PERIOD: {
                key: 'UNCONFIRM_PERIOD',
                className: styles.unconfirmPeriodButton,
                styles: buttonStyles,
                iconProps: { iconName: 'Cancel' },
                onClick: () => context.onUnsubmitPeriod(false),
                canCheck: true,
                text: context.t('timesheet.unconfirmHoursText'),
                secondaryText: context.t('timesheet.unconfirmHoursSecondaryText')
            }
        }

        const commands = []

        if (isConfirmed) commands.push(commandProps.UNCONFIRM_PERIOD)
        else if (isForecast) {
            if (isForecasted) {
                if (isComplete) commands.push(commandProps.CONFIRM_PERIOD)
                commands.push(commandProps.UNFORECAST_PERIOD)
            }
            else {
                commands.push(commandProps.FORECAST_PERIOD)
                commands.push(commandProps.CONFIRM_PERIOD)
            }
        }
        else {
            if (isComplete) {
                commands.push(commandProps.CONFIRM_PERIOD)
                if (!isPast) {
                    if (isForecasted) commands.push(commandProps.UNFORECAST_PERIOD)
                    else commands.push(commandProps.FORECAST_PERIOD)
                }
            }
            else {
                if (!isPast) {
                    if (isForecasted) commands.push(commandProps.UNFORECAST_PERIOD)
                    else commands.push(commandProps.FORECAST_PERIOD)
                }
                commands.push({ ...commandProps.CONFIRM_PERIOD, disabled: true })
            }
        }

        let menuProps: IContextualMenuProps = null
        if (commands.length > 1) {
            menuProps = {
                items: commands.map((cmd, idx) => ({
                    ...omit(cmd, 'buttonStyles', 'iconProps'),
                    isChecked: idx === 0
                }))
            }
        }

        return (
            <PrimaryButton
                primary={false}
                {...first(commands)}
                menuProps={menuProps} />
        )
    }
})