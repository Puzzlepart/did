import { IUserMessageProps } from 'components/UserMessage/types'
import $date from 'DateUtils'
import { useArray } from 'hooks/common/useArray'
import { CLEAR_IGNORES } from 'pages/Timesheet/reducer/actions'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
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
      }),
      iconName: 'ReminderTime'
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
      type: 'warning',
      iconName: 'BufferTimeBoth'
    })
  }
  if (state.selectedPeriod.isComplete && !state.selectedPeriod.isConfirmed) {
    messages.push({
      id: 'allhoursmatched',
      text: t('timesheet.allHoursMatchedText'),
      type: 'success',
      iconName: 'BufferTimeBoth'
    })
  }
  if (state.selectedPeriod.isConfirmed) {
    messages.push({
      id: 'periodConfirmed',
      text: t('timesheet.periodConfirmedText', {
        hours: $date.getDurationString(state.selectedPeriod.matchedDuration, t)
      }),
      type: 'success',
      iconName: 'CheckMark'
    })
  }
  if (state.selectedPeriod.isForecasted && !state.selectedPeriod.isConfirmed) {
    messages.push({
      id: 'periodforecasted',
      text: t('timesheet.periodForecastedText', {
        hours: $date.getDurationString(state.selectedPeriod.forecastedHours, t)
      }),
      iconName: 'BufferTimeBoth'
    })
  }
  if (
    !isEmpty(state.selectedPeriod.ignoredEvents) &&
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
      type: 'warning',
      iconName: 'DependencyRemove'
    })
  }
  if (!isEmpty(state.selectedPeriod.errors)) {
    messages.push({
      id: 'unresolvederror',
      type: 'severeWarning',
      text: t('timesheet.unresolvedErrorText', {
        count: state.selectedPeriod.errors.length
      }),
      iconName: 'ErrorBadge'
    })
  }
  return messages
    .filter((message) => !isDismissed(message.id))
    .map((message) => ({
      ...message,
      onDismiss: () => dismiss(message.id)
    }))
}
