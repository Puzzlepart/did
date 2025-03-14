import $date, { DurationStringFormat } from 'DateUtils'
import { useTranslation } from 'react-i18next'
import { IModifiedDurationProps } from './types'

/**
 * Custom hook that returns the modified and original duration of an event, as well as a boolean indicating if the duration has been adjusted.
 *
 * @param props - The props object containing the event and other necessary data.
 *
 * @returns An object containing the modified duration, original duration, and a boolean indicating if the duration has been adjusted.
 */
export function useModifiedDuration(props: IModifiedDurationProps) {
  const { t } = useTranslation()
  const isAdjusted = !!props.event['adjustedMinutes']
  if (!isAdjusted) return {}
  const originalDuration = $date.getDurationString(
    props.event['originalDuration'],
    t,
    { format: DurationStringFormat.Long }
  )
  const modifiedDuration = $date.getDurationString(props.event.duration, t, {
    format: DurationStringFormat.Long
  })

  return { modifiedDuration, originalDuration, isAdjusted }
}
