import { IContextualMenuItem, IContextualMenuProps, PrimaryButton } from 'office-ui-fabric'
import * as React from 'react'
import { first, omit } from 'underscore'
import { Subscription } from 'types'
import { ITimesheetContext } from '../context'
import styles from './ActionBar.module.scss'

/**
 * Get shared submit item props
 *
 * @param {string} key Key
 * @param {string} iconName Icon name
 */
const submitItemProps = (key: string, iconName: string): Partial<IContextualMenuItem> => ({
  key,
  styles: { root: { height: 44, marginLeft: 4 } },
  iconProps: { iconName },
  canCheck: true
})

export default (context: ITimesheetContext, subscription: Subscription): IContextualMenuItem => ({
  key: 'SUBMIT_COMMANDS',
  onRender: () => {
    if (!!context.error || !context.selectedPeriod) return null
    const { isComplete, isForecast, isForecasted, isConfirmed, isPast } = context.selectedPeriod
    const cmd = {
      FORECAST_PERIOD: subscription.settings?.forecast?.enabled && {
        ...submitItemProps('FORECAST_PERIOD', 'BufferTimeBefore'),
        onClick: () => context.onSubmitPeriod(true),
        text: context.t('timesheet.forecastHoursText'),
        secondaryText: context.t('timesheet.forecastHoursSecondaryText')
      },
      UNFORECAST_PERIOD: subscription.settings?.forecast?.enabled && {
        ...submitItemProps('UNFORECAST_PERIOD', 'Cancel'),
        onClick: () => context.onUnsubmitPeriod(true),
        text: context.t('timesheet.unforecastHoursText'),
        secondaryText: context.t('timesheet.unforecastHoursSecondaryText')
      },
      CONFIRM_PERIOD: {
        ...submitItemProps('CONFIRM_PERIOD', 'CheckMark'),
        className: styles.confirmPeriodButton,
        onClick: () => context.onSubmitPeriod(false),
        text: context.t('timesheet.confirmHoursText'),
        secondaryText: context.t('timesheet.confirmHoursSecondaryText')
      },
      UNCONFIRM_PERIOD: {
        ...submitItemProps('UNCONFIRM_PERIOD', 'Cancel'),
        className: styles.unconfirmPeriodButton,
        onClick: () => context.onUnsubmitPeriod(false),
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
