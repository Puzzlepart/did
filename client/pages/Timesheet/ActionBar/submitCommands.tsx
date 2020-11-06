import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { IContextualMenuItem, IContextualMenuProps } from 'office-ui-fabric-react/lib/ContextualMenu'
import * as React from 'react'
import { first, omit } from 'underscore'
import { User } from '../../../../server/api/graphql/resolvers/types'
import { ITimesheetContext } from '../context'
import styles from './ActionBar.module.scss'

export default (context: ITimesheetContext, user: User): IContextualMenuItem => ({
    key: 'SUBMIT_COMMANDS',
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
            FORECAST_PERIOD: user.subscription.settings.forecast.enabled && {
                key: 'FORECAST_PERIOD',
                styles: { root: { height: 44, marginLeft: 4 } },
                iconProps: { iconName: 'BufferTimeBefore' },
                onClick: () => context.onSubmitPeriod(true),
                canCheck: true,
                text: context.t('timesheet.forecastHoursText'),
                secondaryText: context.t('timesheet.forecastHoursSecondaryText'),
            },
            UNFORECAST_PERIOD: user.subscription.settings.forecast.enabled && {
                key: 'UNFORECAST_PERIOD',
                styles: { root: { height: 44, marginLeft: 4 } },
                iconProps: { iconName: 'Cancel' },
                onClick: () => context.onUnsubmitPeriod(true),
                canCheck: true,
                text: context.t('timesheet.unforecastHoursText'),
                secondaryText: context.t('timesheet.unforecastHoursSecondaryText'),
            },
            CONFIRM_PERIOD: {
                key: 'CONFIRM_PERIOD',
                className: styles.confirmPeriodButton,
                styles: { root: { height: 44, marginLeft: 4 } },
                iconProps: { iconName: 'CheckMark' },
                onClick: () => context.onSubmitPeriod(false),
                canCheck: true,
                text: context.t('timesheet.confirmHoursText'),
                secondaryText: context.t('timesheet.confirmHoursSecondaryText')
            },
            UNCONFIRM_PERIOD: {
                key: 'UNCONFIRM_PERIOD',
                className: styles.unconfirmPeriodButton,
                styles: { root: { height: 44, marginLeft: 4 } },
                iconProps: { iconName: 'Cancel' },
                onClick: () => context.onUnsubmitPeriod(false),
                canCheck: true,
                text: context.t('timesheet.unconfirmHoursText'),
                secondaryText: context.t('timesheet.unconfirmHoursSecondaryText')
            }
        }

        let commands = []

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

        commands = commands.filter(c => c)

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