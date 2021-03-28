import {
  IContextualMenuItem,
  IContextualMenuProps,
  merge,
  PrimaryButton,
  useTheme
} from '@fluentui/react'
import { useAppContext } from 'AppContext'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { first, omit } from 'underscore'
import { arrayExtend } from 'utils'
import { TimesheetContext } from '../context'

/**
 * Use submit commands
 */
export function useSubmitCommands(): IContextualMenuItem {
  const { t } = useTranslation()
  const { subscription } = useAppContext()
  const { semanticColors } = useTheme()
  const { state, onSubmitPeriod, onUnsubmitPeriod } = useContext(
    TimesheetContext
  )
  return {
    key: 'SUBMIT_COMMANDS',
    onRender: () => {
      if (!!state.error || !state.selectedPeriod) return null
      const {
        isComplete,
        isForecast,
        isForecasted,
        isConfirmed,
        isPast
      } = state.selectedPeriod
      const FORECAST_PERIOD: IContextualMenuItem = {
        key: 'FORECAST_PERIOD',
        iconProps: { iconName: 'BufferTimeBefore' },
        onClick: () => {
          onSubmitPeriod(true)
        },
        text: t('timesheet.forecastHoursText'),
        secondaryText: t('timesheet.forecastHoursSecondaryText')
      }
      const UNFORECAST_PERIOD: IContextualMenuItem = {
        key: 'UNFORECAST_PERIOD',
        iconProps: { iconName: 'Cancel' },
        onClick: () => {
          onUnsubmitPeriod(true)
        },
        text: t('timesheet.unforecastHoursText'),
        secondaryText: t('timesheet.unforecastHoursSecondaryText')
      }
      const CONFIRM_PERIOD: IContextualMenuItem = {
        key: 'CONFIRM_PERIOD',
        iconProps: { iconName: 'CheckMark' },
        styles: {
          root: {
            background: semanticColors.successBackground,
            color: semanticColors.successText
          }
        },
        onClick: () => {
          onSubmitPeriod(false)
        },
        text: t('timesheet.confirmHoursText'),
        secondaryText: t('timesheet.confirmHoursSecondaryText')
      }
      const UNCONFIRM_PERIOD: IContextualMenuItem = {
        key: 'UNCONFIRM_PERIOD',
        iconProps: { iconName: 'Cancel' },
        styles: {
          root: {
            background: semanticColors.errorBackground,
            color: semanticColors.errorText
          }
        },
        onClick: () => {
          onUnsubmitPeriod(false)
        },
        text: t('timesheet.unconfirmHoursText'),
        secondaryText: t('timesheet.unconfirmHoursSecondaryText')
      }

      let commands: IContextualMenuItem[] = []

      if (isConfirmed) commands.push(UNCONFIRM_PERIOD)
      else if (isForecast) {
        if (isComplete) commands.push(CONFIRM_PERIOD)
        if (subscription.settings?.forecast?.enabled) {
          commands.push(
            isForecasted ? UNFORECAST_PERIOD : FORECAST_PERIOD
          )
        }
      } else {
        if (isComplete) {
          commands.push(CONFIRM_PERIOD)
          if (!isPast && subscription.settings?.forecast?.enabled) {
            if (isForecasted) commands.push(UNFORECAST_PERIOD)
            else commands.push(FORECAST_PERIOD)
          }
        } else {
          if (!isPast && subscription.settings?.forecast?.enabled) {
            if (isForecasted) commands.push(UNFORECAST_PERIOD)
            else commands.push(FORECAST_PERIOD)
          }
          commands.push({ ...CONFIRM_PERIOD, disabled: true })
        }
      }

      commands = arrayExtend(commands, (element) => ({
        disabled: !!state.loading,
        styles: merge({
          root: { height: 44, marginLeft: 4 }
        }, element.styles || {}),
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
          style={{
            width: isMobile ? 160 : 180,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            border:'none'
          }}
          primary={false}
          {...(first(commands) as any)}
          menuProps={menuProps}
        />
      )
    }
  }
}
