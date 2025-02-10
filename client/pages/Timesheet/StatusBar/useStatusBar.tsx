import { DateRangeType } from '@fluentui/react'
import $date from 'DateUtils'
import { IUserMessageProps } from 'components/UserMessage/types'
import { useArray } from 'hooks/common/useArray'
import { CLEAR_IGNORES, IGNORE_ALL } from 'pages/Timesheet/reducer/actions'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { StatusBar } from '.'
import { useLockedPeriods } from '../../Admin/WeekStatus'
import { Overview } from '../Views/Overview'
import { useTimesheetContext } from '../context'
import styles from './StatusBar.module.scss'

/**
 * A custom hook that returns an array of user messages to be displayed in the status bar.
 * The messages are based on the current state of the timesheet and are localized using the `useTranslation` hook.
 * The messages can be dismissed by the user and are stored in an array using the `useArray` hook.
 *
 * @returns An array of `IUserMessageProps` objects representing the user messages to be displayed in the status bar.
 */
export function useStatusBar() {
  const { t } = useTranslation()
  const [, dismiss, isDismissed] = useArray<string>([])
  const context = useTimesheetContext()
    const lockedPeriods = useLockedPeriods()
  const { dateRangeType, selectedView, periods, selectedPeriod, loading } = context.state
  const isPeriodLocked = lockedPeriods.isLocked(selectedPeriod?.id)

  if (!selectedPeriod) {
    return {
      className: StatusBar.className,
      messages: [
        {
          id: 'loading',
          ...loading,
          renderProgress: [true]
        }
      ] as IUserMessageProps[]
    }
  }
  const messages: IUserMessageProps[] = []

  /**
   * Displays a month confirmed status message.
   */
  const monthConfirmedStatusMessage: IUserMessageProps = {
    id: 'monthconfirmedstatusmessage',
    text: t('timesheet.monthConfirmedText', {
      hours: $date.getDurationString(
        periods.reduce(
          (sum, period) =>
            period.isConfirmed ? (sum += period.matchedDuration) : sum,
          0
        ),
        t
      ),
      periodsCount: periods.length,
      confirmedPeriodsCount: periods.filter((p) => p.isConfirmed).length
    })
  }

  const forecastedHours = periods.reduce(
    (sum, period) => (sum += period.forecastedHours),
    0
  )

  /**
   * Displays a month forecasted status message.
   */
  const monthForecastedMessage: IUserMessageProps = forecastedHours > 0 && {
    id: 'monthforecastedmessage',
    text: t('timesheet.monthForecastedText', {
      hours: $date.getDurationString(forecastedHours, t)
    })
  }

  /**
   * Displays a week hours summary message.
   */
  const weekHoursSummaryMessage: IUserMessageProps =
    !selectedPeriod.isConfirmed && {
      id: 'weekhourssummarymessage',
      text: t('timesheet.weekHoursSummaryText', {
        hours: $date.getDurationString(selectedPeriod.totalDuration, t),
        splitWeekInfoText:
          periods.length > 1 && dateRangeType === DateRangeType.Week
            ? t('timesheet.splitWeekInfoText')
            : ''
      })
    }

  /**
   * Displays a hours not matched message.
   */
  const hoursNotMatchedMessage: IUserMessageProps = {
    id: 'hoursnotmatchedmessage',
    text: t('timesheet.hoursNotMatchedText', {
      hours: $date.getDurationString(selectedPeriod.unmatchedDuration, t)
    }),
    action: {
      text: t('timesheet.ignoreAllTooltip'),
      onClick: () => context.dispatch(IGNORE_ALL()),
      iconName: 'CalendarCancel',
      iconColor: 'var(--colorPaletteRedForeground1)'
    },
    intent: 'warning'
  }

  /**
   * Displays a all hours matched message.
   */
  const allHoursMatchedMessage: IUserMessageProps = {
    id: 'allhoursmatchedmessage',
    text: t('timesheet.allHoursMatchedText'),
    intent: 'success'
  }

  if(isPeriodLocked) {
    allHoursMatchedMessage.text = t('timesheet.allHoursMatchedPeriodLockedText', {
      hours: $date.getDurationString(selectedPeriod.matchedDuration, t)
    })
    allHoursMatchedMessage.iconName = 'LockClosed'
  }

  /**
   * Displays a period confirmed message.
   */
  const periodConfirmedMessage: IUserMessageProps = {
    id: 'periodconfirmedmessage',
    text: t('timesheet.periodConfirmedText', {
      hours: $date.getDurationString(selectedPeriod.matchedDuration, t)
    }),
    intent: 'success'
  }

  if(isPeriodLocked) {
    periodConfirmedMessage.text = t('timesheet.periodLockedConfirmedText', {
      hours: $date.getDurationString(selectedPeriod.matchedDuration, t)
    })
    periodConfirmedMessage.iconName = 'LockClosed'
  }

  /**
   * Displays a period forecasted message.
   */
  const periodForecastedMessage: IUserMessageProps = {
    id: 'periodforecastedmessage',
    text: t('timesheet.periodForecastedText', {
      hours: $date.getDurationString(selectedPeriod.forecastedHours, t)
    })
  }

  /**
   * Displays a ignored events message.
   */
  const ignoredEventsMessage: IUserMessageProps = {
    id: 'ignoredevents',
    text: t('timesheet.ignoredEventsText', {
      ignored_count: selectedPeriod.ignoredEvents.length
    }),
    action: {
      text: t('timesheet.undoIgnoreTooltip'),
      onClick: () => context.dispatch(CLEAR_IGNORES()),
      iconName: 'ArrowUndo'
    },
    intent: 'warning'
  }

  /**
   * Displays a unresolved events message.
   */
  const unresolvedEventsMessage: IUserMessageProps = {
    id: 'unresolvedeventsmessage',
    intent: 'warning',
    text: t('timesheet.unresolvedErrorText', {
      count: selectedPeriod.errors.length
    })
  }

  /**
   * Calculates the total adjusted minutes for the selected period.
   */
  const adjustedMinutes = _.reduce(
    selectedPeriod.getEvents(),
    (sum, event) => (sum += event['adjustedMinutes'] ?? 0),
    0
  )

  /**
   * Displays a adjusted events message.
   */
  const adjustedEventsMessage: IUserMessageProps = {
    id: 'adjustedeventsmessage',
    text: t('timesheet.adjustedEventDurationsInfoText', {
      adjustedMinutes
    })
  }

  if (
    dateRangeType === DateRangeType.Month &&
    selectedView?.id !== Overview?.id
  ) {
    messages.push(monthConfirmedStatusMessage, monthForecastedMessage)
  }

  if (!selectedPeriod.isConfirmed) {
    messages.push(weekHoursSummaryMessage)
  }

  if (!selectedPeriod.isComplete && !selectedPeriod.isForecast) {
    messages.push(hoursNotMatchedMessage)
  }

  if (selectedPeriod.isComplete && !selectedPeriod.isConfirmed) {
    messages.push(allHoursMatchedMessage)
  }

  if (selectedPeriod.isConfirmed) {
    messages.push(periodConfirmedMessage)
  }

  if (selectedPeriod.isForecasted && !selectedPeriod.isConfirmed) {
    messages.push(periodForecastedMessage)
  }

  if (!_.isEmpty(selectedPeriod.ignoredEvents) && !selectedPeriod.isConfirmed) {
    messages.push(ignoredEventsMessage)
  }

  if (!_.isEmpty(selectedPeriod.errors)) {
    messages.push(unresolvedEventsMessage)
  }

  if (
    _.some(selectedPeriod.getEvents(), (event) => !!event['adjustedMinutes'])
  ) {
    messages.push(adjustedEventsMessage)
  }

  const classNames = [StatusBar.className]
  if (isMobile) classNames.push(styles.mobile)

  return {
    className: classNames.filter(Boolean).join(' '),
    messages: messages
      .filter(Boolean)
      .filter((message) => !isDismissed(message.id))
      .map((message) => ({
        ...message,
        onDismiss: () => dismiss(message.id)
      }))
  }
}
