import { IContextualMenuItem, IContextualMenuProps, PrimaryButton } from 'office-ui-fabric'
import * as React from 'react'
import { first, omit } from 'underscore'
import { Subscription } from 'types'
import { ITimesheetContext } from '../context'
import styles from './ActionBar.module.scss'

export default (context: ITimesheetContext, subscription: Subscription): IContextualMenuItem => ({
  key: 'SUBMIT_COMMANDS',
  onRender: () => {
    if (!!context.error || !context.selectedPeriod) return null
    const { isComplete, isForecast, isForecasted, isConfirmed, isPast } = context.selectedPeriod
    const cmd = {
      FORECAST_PERIOD: subscription.settings?.forecast?.enabled && {
        key: 'FORECAST_PERIOD',
        styles: { root: { height: 44, marginLeft: 4 } },
        iconProps: { iconName: 'BufferTimeBefore' },
        onClick: () => context.onSubmitPeriod(true),
        canCheck: true,
        text: context.t('timesheet.forecastHoursText'),
        secondaryText: context.t('timesheet.forecastHoursSecondaryText')
      },
      UNFORECAST_PERIOD: subscription.settings?.forecast?.enabled && {
        key: 'UNFORECAST_PERIOD',
        styles: { root: { height: 44, marginLeft: 4 } },
        iconProps: { iconName: 'Cancel' },
        onClick: () => context.onUnsubmitPeriod(true),
        canCheck: true,
        text: context.t('timesheet.unforecastHoursText'),
        secondaryText: context.t('timesheet.unforecastHoursSecondaryText')
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

    if (isConfirmed) commands.push(cmd.UNCONFIRM_PERIOD)
    else if (isForecast) {
      if (isComplete) commands.push(cmd.CONFIRM_PERIOD)
      commands.push(isForecasted ? cmd.UNFORECAST_PERIOD : cmd.FORECAST_PERIOD)
    } else {
      if (isComplete) {
        commands.push(cmd.CONFIRM_PERIOD)
        if (!isPast) {
          if (isForecasted) commands.push(cmd.UNFORECAST_PERIOD)
          else commands.push(cmd.FORECAST_PERIOD)
        }
      } else {
        if (!isPast) {
          if (isForecasted) commands.push(cmd.UNFORECAST_PERIOD)
          else commands.push(cmd.FORECAST_PERIOD)
        }
        commands.push({ ...cmd.CONFIRM_PERIOD, disabled: true })
      }
    }

    commands = commands.filter((c) => c)

    let menuProps: IContextualMenuProps = null
    if (commands.length > 1) {
      menuProps = {
        items: commands.map((cmd, idx) => ({
          ...omit(cmd, 'buttonStyles', 'iconProps'),
          isChecked: idx === 0
        }))
      }
    }

    return <PrimaryButton primary={false} {...first(commands)} menuProps={menuProps} />
  }
})
