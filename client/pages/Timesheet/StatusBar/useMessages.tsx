import { DateRangeType } from '@fluentui/react'
import { IUserMessageProps } from 'components/UserMessage/types'
import $date from 'DateUtils'
import { useArray } from 'hooks/common/useArray'
import { CLEAR_IGNORES, IGNORE_ALL } from 'pages/Timesheet/reducer/actions'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import _ from 'underscore'
import { useTimesheetContext } from '../context'
import { Overview } from '../Views/Overview'

/**
 * Returns the active messages
 */
export function useMessages(): IUserMessageProps[] {
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
      }),
      intent: 'info'
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
        children: (
          <span>
            <ReactMarkdown>
              {t('timesheet.hoursNotMatchedText', {
                hours: $date.getDurationString(
                  state.selectedPeriod.unmatchedDuration,
                  t
                )
              })}
            </ReactMarkdown>
            <a href='#' onClick={() => dispatch(IGNORE_ALL())}>
              {t('timesheet.ignoreAllText')}
            </a>
          </span>
        ),
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
        children: (
          <p>
            <span>
              {t('timesheet.ignoredEventsText', {
                ignored_count: state.selectedPeriod.ignoredEvents.length
              })}
            </span>
            <a href='#' onClick={() => dispatch(CLEAR_IGNORES())}>
              {t('timesheet.undoIgnoreText')}
            </a>
          </p>
        ),
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
        intent: 'info',
        iconName: 'SortUp'
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
