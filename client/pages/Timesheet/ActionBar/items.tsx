import { TFunction } from 'i18next'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu'
import * as React from 'react'
import { ITimesheetContext } from '../TimesheetContext'
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS'

export const goToCurrentWeek = ({ scope, dispatch }: ITimesheetContext, t: TFunction): IContextualMenuItem => ({
    key: 'goToCurrentWeek',
    iconOnly: true,
    iconProps: { iconName: 'RenewalCurrent', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'MOVE_SCOPE', payload: new Date().toISOString() }),
    disabled: scope.isCurrentWeek,
    title: t('goToCurrentWeek'),
})

export const goToPrevWeek = ({ dispatch }: ITimesheetContext, t: TFunction): IContextualMenuItem => ({
    key: 'goToPrevWeek',
    iconOnly: true,
    iconProps: { iconName: 'Back', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'MOVE_SCOPE', payload: { amount: -1, unit: 'week' } }),
    title: t('goToPrevWeek')
})

export const goToNextWeek = ({ dispatch }: ITimesheetContext, t: TFunction): IContextualMenuItem => ({
    key: 'goToNextWeek',
    iconOnly: true,
    iconProps: { iconName: 'Forward', ...ACTIONBAR_ICON_PROPS },
    onClick: () => dispatch({ type: 'MOVE_SCOPE', payload: { amount: 1, unit: 'week' } }),
    title: t('goToNextWeek'),
})

export const CHANGE_PERIOD = ({ periods, loading, selectedPeriod, dispatch }: ITimesheetContext, t: TFunction): IContextualMenuItem[] => {
    if (periods.length === 1) {
        return [
            {
                key: 'CHANGE_PERIOD_0',
                onRender: () => (
                    <span style={{ paddingTop: 12 }}>
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
    key: 'CONFIRM_HOURS',
    onRender: () => context.selectedPeriod.isConfirmed
        ? <DefaultButton
            disabled={!!context.loading}
            iconProps={{ iconName: 'Cancel' }}
            onClick={context.onUnconfirmPeriod}
            text={t('unconfirmHoursText')}
            styles={{ root: { height: 44, marginLeft: 4 } }} />
        : <PrimaryButton
            disabled={
                !!context.loading
                || context.selectedPeriod.unmatchedDuration > 0
                || context.selectedPeriod.events.length === 0
            }
            iconProps={{ iconName: 'CheckMark' }}
            onClick={context.onConfirmPeriod}
            text={t('confirmHoursText')}
            styles={{ root: { height: 44, marginLeft: 4 } }} />
})