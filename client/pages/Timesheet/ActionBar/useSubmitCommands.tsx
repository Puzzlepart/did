import { AppContext } from 'AppContext'
import { IContextualMenuItem, IContextualMenuProps, PrimaryButton } from 'office-ui-fabric'
import React, { useContext } from 'react'
import { first, omit } from 'underscore'
import { TimesheetContext } from '../context'
import styles from './ActionBar.module.scss'

/**
 * Get base submit item props
 *
 * @param {string} key Key
 * @param {string} iconName Icon name
 */
const submitItemBaseProps = (key: string, iconName: string): Partial<IContextualMenuItem> => ({
  key,
  styles: { root: { height: 44, marginLeft: 4 } },
  iconProps: { iconName },
  canCheck: true
})

/**
 * Use submit commands
 */
export function useSubmitCommands() {
  const { subscription } = useContext(AppContext)
  const context = useContext(TimesheetContext)
  return {
    key: 'SUBMIT_COMMANDS',
    onRender: () => {
      if (!!context.error || !context.selectedPeriod) return null
      const { isComplete, isForecast, isForecasted, isConfirmed, isPast } = context.selectedPeriod
      const cmd: { [key: string]: IContextualMenuItem } = {
        FORECAST_PERIOD: subscription.settings?.forecast?.enabled && {
          ...(submitItemBaseProps('FORECAST_PERIOD', 'BufferTimeBefore') as IContextualMenuItem),
          onClick: () => context.onSubmitPeriod(true),
          text: context.t('timesheet.forecastHoursText'),
          secondaryText: context.t('timesheet.forecastHoursSecondaryText')
        },
        UNFORECAST_PERIOD: subscription.settings?.forecast?.enabled && {
          ...(submitItemBaseProps('UNFORECAST_PERIOD', 'Cancel') as IContextualMenuItem),
          onClick: () => context.onUnsubmitPeriod(true),
          text: context.t('timesheet.unforecastHoursText'),
          secondaryText: context.t('timesheet.unforecastHoursSecondaryText')
        },
        CONFIRM_PERIOD: {
          ...(submitItemBaseProps('CONFIRM_PERIOD', 'CheckMark') as IContextualMenuItem),
          className: styles.confirmPeriodButton,
          onClick: () => context.onSubmitPeriod(false),
          text: context.t('timesheet.confirmHoursText'),
          secondaryText: context.t('timesheet.confirmHoursSecondaryText')
        },
        UNCONFIRM_PERIOD: {
          ...(submitItemBaseProps('UNCONFIRM_PERIOD', 'Cancel') as IContextualMenuItem),
          className: styles.unconfirmPeriodButton,
          onClick: () => context.onUnsubmitPeriod(false),
          text: context.t('timesheet.unconfirmHoursText'),
          secondaryText: context.t('timesheet.unconfirmHoursSecondaryText')
        }
      }

      let commands: any[] = []

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
            ...(omit(cmd, 'buttonStyles', 'iconProps') as IContextualMenuItem),
            isChecked: idx === 0
          }))
        }
      }

      return <PrimaryButton primary={false} {...first(commands)} menuProps={menuProps} />
    }
  }
}
