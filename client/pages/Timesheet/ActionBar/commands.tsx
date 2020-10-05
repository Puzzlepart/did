import { TFunction } from 'i18next'
import { DefaultButton, IButtonStyles, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import * as React from 'react'
import { ITimesheetContext } from '../context'
import styles from './ActionBar.module.scss'
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS'
import { WeekPicker } from './WeekPicker'

const buttonStyles: IButtonStyles = { root: { height: 44, marginLeft: 4 } }

export const WEEK_PICKER = ({ selectedPeriod, periods }: ITimesheetContext, t: TFunction): IContextualMenuItem => ({
    key: 'WEEK_PICKER',
    onRender: () => (
        <>
            <WeekPicker />
            {periods.length === 1 && (
                <span className={styles.weekNumber}>
                    {selectedPeriod.getName(false, t)}
                </span>
            )}
        </>
    ),
})

export const GO_TO_CURRENT_WEEK = ({ scope, dispatch }: ITimesheetContext, t: TFunction): IContextualMenuItem => ({
    key: 'GO_TO_CURRENT_WEEK',
    iconOnly: true,
    iconProps: { iconName: 'RenewalCurrent', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'MOVE_SCOPE', payload: new Date().toISOString() }),
    disabled: scope.isCurrentWeek,
    title: t('timesheet.goToCurrentWeek'),
})

export const GO_TO_PREV_WEEK = ({ dispatch }: ITimesheetContext, t: TFunction): IContextualMenuItem => ({
    key: 'GO_TO_PREV_WEEK',
    iconOnly: true,
    iconProps: { iconName: 'Back', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'MOVE_SCOPE', payload: { amount: -1, unit: 'week' } }),
    title: t('timesheet.goToPrevWeek')
})

export const GO_TO_NEXT_WEEK = ({ dispatch }: ITimesheetContext, t: TFunction): IContextualMenuItem => ({
    key: 'GO_TO_NEXT_WEEK',
    iconOnly: true,
    iconProps: { iconName: 'Forward', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'MOVE_SCOPE', payload: { amount: 1, unit: 'week' } }),
    title: t('timesheet.goToNextWeek'),
})

export const SELECT_PERIOD = ({ periods, loading, selectedPeriod, dispatch }: ITimesheetContext, t: TFunction): IContextualMenuItem[] => {
    if (periods.length === 1) return []
    return periods.map((period, idx) => ({
        key: `SELECT_PERIOD_${idx}`,
        onRender: () => (
            <DefaultButton
                hidden={!!loading}
                iconProps={{ iconName: 'DateTime' }}
                onClick={() => dispatch({ type: 'CHANGE_PERIOD', payload: period.id })}
                text={period.getName(true, t)}
                styles={buttonStyles}
                className={styles.selectPeriodButton}
                checked={period.id === selectedPeriod.id} />
        ),
    }))
}


export const RELOAD_DATA = (context: ITimesheetContext, t: TFunction): IContextualMenuItem => ({
    key: 'RELOAD_DATA',
    onRender: () => (
        <DefaultButton
            iconProps={{ iconName: 'Refresh' }}
            onClick={() => context.refetch()}
            text={t('timesheet.reload')}
            className={styles.reloadButton}
            styles={buttonStyles} />
    )
})

export const CONFIRM_ACTIONS = (context: ITimesheetContext, t: TFunction): IContextualMenuItem => ({
    key: 'CONFIRM_ACTIONS',
    onRender: () => {
        if (context.selectedPeriod.isForecast || context.loading || !!context.error) return null
        if (context.selectedPeriod.isConfirmed) {
            return (
                <DefaultButton
                    iconProps={{ iconName: 'Cancel' }}
                    onClick={context.onUnsubmitPeriod}
                    text={t('timesheet.unconfirmHoursText')}
                    className={styles.unconfirmButton}
                    styles={buttonStyles} />
            )
        }
        return (
            <PrimaryButton
                disabled={!context.selectedPeriod.isComplete}
                iconProps={{ iconName: 'CheckMark' }}
                onClick={context.onSubmitPeriod}
                text={t('timesheet.confirmHoursText')}
                className={styles.confirmButton}
                styles={buttonStyles} />
        )
    }
})

export const FORECAST_ACTIONS = (context: ITimesheetContext, t: TFunction): IContextualMenuItem => ({
    key: 'FORECAST_ACTIONS',
    onRender: () => {
        if (!context.selectedPeriod.isForecast || context.loading || !!context.error) return null
        if (context.selectedPeriod.isForecasted) {
            return (
                <DefaultButton
                    iconProps={{ iconName: 'Cancel' }}
                    onClick={context.onUnsubmitPeriod}
                    text={t('timesheet.unforecastHoursText')}
                    styles={buttonStyles} />
            )
        }
        return (
            <PrimaryButton
                iconProps={{ iconName: 'BufferTimeBefore' }}
                onClick={context.onSubmitPeriod}
                text={t('timesheet.forecastHoursText')}
                styles={buttonStyles} />
        )
    }
})