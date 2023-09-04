import { DateRangeType } from '@fluentui/react'
import $date from 'DateUtils'
import { IUserMessageProps } from 'components/UserMessage/types'
import { useArray } from 'hooks/common/useArray'
import { CLEAR_IGNORES, IGNORE_ALL } from 'pages/Timesheet/reducer/actions'
import React from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { Overview } from '../Views/Overview'
import { useTimesheetContext } from '../context'

/**
 * A custom hook that returns an array of user messages to be displayed in the status bar.
 * The messages are based on the current state of the timesheet and are localized using the `useTranslation` hook.
 * The messages can be dismissed by the user and are stored in an array using the `useArray` hook.
 * 
 * @returns An array of `IUserMessageProps` objects representing the user messages to be displayed in the status bar.
 */
export function useStatusBar(): IUserMessageProps[] {
  const { t } = useTranslation()
  const [, dismiss, isDismissed] = useArray<string>([])
  const { state, dispatch } = useTimesheetContext()

  if (!state.selectedPeriod) return []

  const messages: IUserMessageProps[] = []

  if (
    state.dateRangeType === DateRangeType.Month &&
    state.selectedView?.id !== Overview?.id
  ) {
    const confirmedDuration = state.periods.reduce(
      (sum, period) =>
        period.isConfirmed ? (sum += period.matchedDuration) : sum,
      0
    )
    messages.push({
      id: 'monthconfirmedstatus',
      text: t('timesheet.monthConfirmedText', {
        hours: $date.getDurationString(confirmedDuration, t),
        periodsCount: state.periods.length,
        confirmedPeriodsCount: state.periods.filter((p) => p.isConfirmed).length
      })
    })
    const forecastedHours = state.periods.reduce(
      (sum, period) => (sum += period.forecastedHours),
      0
    )
    if (forecastedHours > 0) {
      messages.push({
        id: 'monthforecasted',
        text: t('timesheet.monthForecastedText', {
          hours: $date.getDurationString(forecastedHours, t)
        })
      })
    }
  } else {
    if (!state.selectedPeriod.isConfirmed) {
      messages.push({
        id: 'weekhourssummary',
        text: t('timesheet.weekHoursSummaryText', {
          hours: $date.getDurationString(state.selectedPeriod.totalDuration, t),
          splitWeekInfoText:
            state.periods.length > 1 &&
              state.dateRangeType === DateRangeType.Week
              ? t('timesheet.splitWeekInfoText')
              : ''
        })
      })
    }
    if (!state.selectedPeriod.isComplete && !state.selectedPeriod.isForecast) {
      messages.push({
        id: 'hoursnotmatched',
        text: t('timesheet.hoursNotMatchedText', {
          hours: $date.getDurationString(
            state.selectedPeriod.unmatchedDuration,
            t
          )
        }),
        actions: [
          {
            key: 'ignore',
            content: t('timesheet.ignoreAllText'),
            onClick: () => dispatch(IGNORE_ALL()),
            icon: icon('CalendarCancel')
          }
        ],
        intent: 'warning'
      })
    }
    if (state.selectedPeriod.isComplete && !state.selectedPeriod.isConfirmed) {
      messages.push({
        id: 'allhoursmatched',
        text: t('timesheet.allHoursMatchedText'),
        intent: 'success'
      })
    }
    if (state.selectedPeriod.isConfirmed) {
      messages.push({
        id: 'periodconfirmed',
        text: t('timesheet.periodConfirmedText', {
          hours: $date.getDurationString(
            state.selectedPeriod.matchedDuration,
            t
          )
        }),
        intent: 'success'
      })
    }
    if (
      state.selectedPeriod.isForecasted &&
      !state.selectedPeriod.isConfirmed
    ) {
      messages.push({
        id: 'periodforecasted',
        text: t('timesheet.periodForecastedText', {
          hours: $date.getDurationString(
            state.selectedPeriod.forecastedHours,
            t
          )
        })
      })
    }
    if (
      !_.isEmpty(state.selectedPeriod.ignoredEvents) &&
      !state.selectedPeriod.isConfirmed
    ) {
      messages.push({
        id: 'ignoredevents',
        text: t('timesheet.ignoredEventsText', {
          ignored_count: state.selectedPeriod.ignoredEvents.length
        }),
        actions: [
          {
            key: 'undo-ignore',
            content: t('timesheet.undoIgnoreText'),
            onClick: () => dispatch(CLEAR_IGNORES()),
            icon: icon('ArrowUndo')
          }
        ],
        intent: 'warning'
      })
    }
    if (!_.isEmpty(state.selectedPeriod.errors)) {
      messages.push({
        id: 'unresolvederror',
        intent: 'warning',
        text: t('timesheet.unresolvedErrorText', {
          count: state.selectedPeriod.errors.length
        })
      })
    }
    if (
      _.any(
        state.selectedPeriod.getEvents(),
        (event) => !!event['adjustedMinutes']
      )
    ) {
      const adjustedMinutes = _.reduce(
        state.selectedPeriod.getEvents(),
        (sum, event) => (sum += event['adjustedMinutes'] ?? 0),
        0
      )
      messages.push({
        id: 'adjustedevents',
        children: (
          <p>
            <span>
              {t('timesheet.adjustedEventDurationsInfoText', {
                adjustedMinutes
              })}
            </span>
          </p>
        ),
        // iconName: 'SortUp'
      })
    }
  }
  return messages
    .filter((message) => !isDismissed(message.id))
    .map((message) => ({
      ...message,
      onDismiss: () => dismiss(message.id)
    }))
}