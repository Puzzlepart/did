import { TFunction } from 'i18next'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import * as React from 'react'
import { ITimesheetContext } from '../context'
import styles from './ActionBar.module.scss'
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS'
import { WeekPicker } from './WeekPicker'

export const WEEK_PICKER = (): IContextualMenuItem => ({
    key: 'WEEK_PICKER',
    onRender: () => <WeekPicker />,
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

export const CHANGE_PERIOD = ({ periods, loading, selectedPeriod, dispatch }: ITimesheetContext, t: TFunction): IContextualMenuItem[] => {
    if (periods.length === 1) {
        return [
            {
                key: 'WEEK_NUMBER',
                onRender: () => (
                    <span className={styles.weekNumber}>
                        {selectedPeriod.getName(false, t)}
                    </span>
                ),
            }
        ]
    }
    return periods.map((period, idx) => ({
        key: `CHANGE_PERIOD_${idx}`,
        onRender: () => (
            <DefaultButton
                hidden={!!loading}
                iconProps={{ iconName: 'DateTime' }}
                onClick={() => dispatch({ type: 'CHANGE_PERIOD', payload: period.id })}
                text={period.getName(true, t)}
                styles={{ root: { height: 44, marginLeft: 4 } }}
                checked={period.id === selectedPeriod.id} />
        ),
    }))
}

export const CONFIRM_ACTIONS = (context: ITimesheetContext, t: TFunction): IContextualMenuItem => ({
    key: 'CONFIRM_ACTIONS',
    onRender: () => {
        if (context.selectedPeriod.isForecast) return null
        if (context.selectedPeriod.isConfirmed) {
            return (
                <DefaultButton
                    disabled={!!context.loading}
                    iconProps={{ iconName: 'Cancel' }}
                    onClick={context.onUnsubmitPeriod}
                    text={t('timesheet.unconfirmHoursText')}
                    styles={{ root: { height: 44, marginLeft: 4 } }} />
            )
        }
        return (
            <PrimaryButton
                disabled={!!context.loading || context.selectedPeriod.unmatchedDuration > 0}
                iconProps={{ iconName: 'CheckMark' }}
                onClick={context.onSubmitPeriod}
                text={t('timesheet.confirmHoursText')}
                styles={{ root: { height: 44, marginLeft: 4 } }} />
        )
    }
})



export const FORECAST_ACTIONS = (context: ITimesheetContext, t: TFunction): IContextualMenuItem => ({
    key: 'FORECAST_ACTIONS',
    onRender: () => {
        if (!context.selectedPeriod.isForecast) return null
        if (context.selectedPeriod.isForecasted) {
            return (
                <DefaultButton
                    disabled={!!context.loading}
                    iconProps={{ iconName: 'Cancel' }}
                    onClick={context.onUnsubmitPeriod}
                    text={t('timesheet.unforecastHoursText')}
                    styles={{ root: { height: 44, marginLeft: 4 } }} />
            )
        }
        return (
            <PrimaryButton
                disabled={!!context.loading}
                iconProps={{ iconName: 'BufferTimeBefore' }}
                onClick={context.onSubmitPeriod}
                text={t('timesheet.forecastHoursText')}
                styles={{ root: { height: 44, marginLeft: 4 } }} />
        )
    }
})