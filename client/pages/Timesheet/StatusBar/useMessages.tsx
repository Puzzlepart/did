import { IUserMessageProps } from 'components/UserMessage/types'
import $date from 'DateUtils'
import { useArray } from 'hooks/common/useArray'
import { MessageBarType } from 'office-ui-fabric-react'
import { CLEAR_IGNORES } from 'pages/Timesheet/reducer/actions'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { TimesheetContext } from '../context'

/**
 * Returns the active messages
 */
export function useMessages(): IUserMessageProps[] {
  const { t } = useTranslation()
  const [, dismiss, isDismissed] = useArray<string>([])
  const { selectedPeriod, periods, dispatch } = useContext(TimesheetContext)

  if (!selectedPeriod) return []

  const messages: IUserMessageProps[] = []

  if (!selectedPeriod.isConfirmed) {
    messages.push({
      id: 'weekhourssummary',
      text: t('timesheet.weekHoursSummaryText', {
        hours: $date.getDurationString(selectedPeriod.totalDuration, t),
        splitWeekInfoText:
          periods.length > 1 ? t('timesheet.splitWeekInfoText') : ''
      }),
      iconName: 'ReminderTime'
    })
  }
  if (!selectedPeriod.isComplete && !selectedPeriod.isForecast) {
    messages.push({
      id: 'hoursnotmatched',
      text: t('timesheet.hoursNotMatchedText', {
        hours: $date.getDurationString(selectedPeriod.unmatchedDuration, t)
      }),
      type: MessageBarType.warning,
      iconName: 'BufferTimeBoth'
    })
  }
  if (selectedPeriod.isComplete && !selectedPeriod.isConfirmed) {
    messages.push({
      id: 'allhoursmatched',
      text: t('timesheet.allHoursMatchedText'),
      type: MessageBarType.success,
      iconName: 'BufferTimeBoth'
    })
  }
  if (selectedPeriod.isConfirmed) {
    messages.push({
      id: 'periodConfirmed',
      text: t('timesheet.periodConfirmedText', {
        hours: $date.getDurationString(selectedPeriod.matchedDuration, t)
      }),
      type: MessageBarType.success,
      iconName: 'CheckMark'
    })
  }
  if (selectedPeriod.isForecasted && !selectedPeriod.isConfirmed) {
    messages.push({
      id: 'periodforecasted',
      text: t('timesheet.periodForecastedText', {
        hours: $date.getDurationString(selectedPeriod.forecastedHours, t)
      }),
      type: MessageBarType.info,
      iconName: 'BufferTimeBoth'
    })
  }
  if (!isEmpty(selectedPeriod.ignoredEvents) && !selectedPeriod.isConfirmed) {
    messages.push({
      id: 'ignoredevents',
      children: (
        <p>
          <span>
            {t('timesheet.ignoredEventsText', {
              ignored_count: selectedPeriod.ignoredEvents.length
            })}
          </span>
          <a href='#' onClick={() => dispatch(CLEAR_IGNORES())}>
            {t('timesheet.undoIgnoreText')}
          </a>
        </p>
      ),
      type: MessageBarType.warning,
      iconName: 'DependencyRemove'
    })
  }
  if (!isEmpty(selectedPeriod.errors)) {
    messages.push({
      id: 'unresolvederror',
      type: MessageBarType.severeWarning,
      text: t('timesheet.unresolvedErrorText', {
        count: selectedPeriod.errors.length
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
