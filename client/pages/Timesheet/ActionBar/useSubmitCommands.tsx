import { useAppContext } from 'AppContext'
import {
  IContextualMenuItem,
  IContextualMenuProps,
  PrimaryButton
} from 'office-ui-fabric-react'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { first, omit } from 'underscore'
import { TimesheetContext } from '../context'
import styles from './ActionBar.module.scss'

/**
 * Get base submit item props
 *
 * @param key - Key
 * @param iconName - Icon name
 */
const submitItemBaseProps = (
  key: string,
  iconName: string
): Partial<IContextualMenuItem> => ({
  key,
  styles: { root: { height: 44, marginLeft: 4 } },
  iconProps: { iconName },
  canCheck: true
})

/**
 * Use submit commands
 */
export function useSubmitCommands() {
  const { t } = useTranslation()
  const { subscription } = useAppContext()
  const context = useContext(TimesheetContext)
  return {
    key: 'SUBMIT_COMMANDS',
    onRender: () => {
      if (!!context.error || !context.selectedPeriod) return null
      const {
        isComplete,
        isForecast,
        isForecasted,
        isConfirmed,
        isPast
      } = context.selectedPeriod
      const cmd: { [key: string]: IContextualMenuItem } = {
        FORECAST_PERIOD: subscription.settings?.forecast?.enabled && {
          ...(submitItemBaseProps(
            'FORECAST_PERIOD',
            'BufferTimeBefore'
          ) as IContextualMenuItem),
          onClick: () => {
            context.onSubmitPeriod(true)
          },
          text: t('timesheet.forecastHoursText'),
          secondaryText: t('timesheet.forecastHoursSecondaryText')
        },
        UNFORECAST_PERIOD: subscription.settings?.forecast?.enabled && {
          ...(submitItemBaseProps(
            'UNFORECAST_PERIOD',
            'Cancel'
          ) as IContextualMenuItem),
          onClick: () => {
            context.onUnsubmitPeriod(true)
          },
          text: t('timesheet.unforecastHoursText'),
          secondaryText: t('timesheet.unforecastHoursSecondaryText')
        },
        CONFIRM_PERIOD: {
          ...(submitItemBaseProps(
            'CONFIRM_PERIOD',
            'CheckMark'
          ) as IContextualMenuItem),
          className: styles.confirmPeriodButton,
          onClick: () => {
            context.onSubmitPeriod(false)
          },
          text: t('timesheet.confirmHoursText'),
          secondaryText: t('timesheet.confirmHoursSecondaryText')
        },
        UNCONFIRM_PERIOD: {
          ...(submitItemBaseProps(
            'UNCONFIRM_PERIOD',
            'Cancel'
          ) as IContextualMenuItem),
          className: styles.unconfirmPeriodButton,
          onClick: () => {
            context.onUnsubmitPeriod(false)
          },
          text: t('timesheet.unconfirmHoursText'),
          secondaryText: t('timesheet.unconfirmHoursSecondaryText')
        }
      }

      let commands: IContextualMenuItem[] = []

      if (isConfirmed) commands.push(cmd.UNCONFIRM_PERIOD)
      else if (isForecast) {
        if (isComplete) commands.push(cmd.CONFIRM_PERIOD)
        commands.push(
          isForecasted ? cmd.UNFORECAST_PERIOD : cmd.FORECAST_PERIOD
        )
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

      commands = commands
        .filter((c) => c)
        .map((c) => ({
          disabled: !!context.loading,
          ...c
        }))

      let menuProps: IContextualMenuProps = null
      if (commands.length > 1) {
        menuProps = {
          calloutProps: {
            calloutWidth: 280
          },
          items: commands.map((command_) => ({
            ...(omit(command_, 'buttonStyles') as IContextualMenuItem),
            itemProps: {
              styles: {
                secondaryText: {
                  fontSize: 10,
                  color: 'rgb(96, 94, 92)'
                },
                checkmarkIcon: {
                  display: 'none'
                }
              }
            }
          }))
        }
      }

      return (
        <PrimaryButton
          style={{ width: 180 }}
          primary={false}
          {...(first(commands) as any)}
          menuProps={menuProps}
        />
      )
    }
  }
}
