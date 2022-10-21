import { IUserMessageProps } from 'components/UserMessage/types'
import $date from 'DateUtils'
import { useArray } from 'hooks/common/useArray'
import { CLEAR_IGNORES } from 'pages/Timesheet/reducer/actions'
import React from 'react'
import { useTranslation } from 'react-i18next'
import _, { any, reduce } from 'underscore'
import { useTimesheetContext } from '../context'

/**
 * Returns the active messages
 */
export function useMessages(): IUserMessageProps[] {
  const { t } = useTranslation()
  const [, dismiss, isDismissed] = useArray<string>([])
  const { state, dispatch } = useTimesheetContext()

  if (!state.selectedPeriod) return []

  const messages: IUserMessageProps[] = []

  if (!state.selectedPeriod.isConfirmed) {
    messages.push({
      id: 'weekhourssummary',
      text: t('timesheet.weekHoursSummaryText', {
        hours: $date.getDurationString(state.selectedPeriod.totalDuration, t),
        splitWeekInfoText:
          state.periods.length > 1 ? t('timesheet.splitWeekInfoText') : ''
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
      type: 'warning'
    })
  }
  if (state.selectedPeriod.isComplete && !state.selectedPeriod.isConfirmed) {
    messages.push({
      id: 'allhoursmatched',
      text: t('timesheet.allHoursMatchedText'),
      type: 'success'
    })
  }
  if (state.selectedPeriod.isConfirmed) {
    messages.push({
      id: 'periodConfirmed',
      text: t('timesheet.periodConfirmedText', {
        hours: $date.getDurationString(state.selectedPeriod.matchedDuration, t)
      }),
      type: 'success'
    })
  }
  if (state.selectedPeriod.isForecasted && !state.selectedPeriod.isConfirmed) {
    messages.push({
      id: 'periodforecasted',
      text: t('timesheet.periodForecastedText', {
        hours: $date.getDurationString(state.selectedPeriod.forecastedHours, t)
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
      type: 'warning'
    })
  }
  if (!_.isEmpty(state.selectedPeriod.errors)) {
    messages.push({
      id: 'unresolvederror',
      type: 'severeWarning',
      text: t('timesheet.unresolvedErrorText', {
        count: state.selectedPeriod.errors.length
      })
    })
  }
  if (
    any(
      state.selectedPeriod.getEvents(true),
      (event) => !!event['adjustedMinutes']
    )
  ) {
    const adjustedMinutes = reduce(
      state.selectedPeriod.getEvents(true),
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
      type: 'info',
      iconName: 'SortUp'
    })
  }
  return messages
    .filter((message) => !isDismissed(message.id))
    .map((message) => ({
      ...message,
      onDismiss: () => dismiss(message.id)
    }))
}
