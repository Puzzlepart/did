import $date from 'DateUtils'
import React, { useEffect, useMemo, useState } from 'react'
import { StyledComponent } from 'types'
import { ITimeColumnProps } from './types'

/**
 * Track whether the viewport is narrow.
 */
const useIsNarrowScreen = (): boolean => {
  const [isNarrow, setIsNarrow] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(max-width: 600px)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const media = window.matchMedia('(max-width: 600px)')
    const handleChange = () => setIsNarrow(media.matches)
    handleChange()
    if (media.addEventListener) {
      media.addEventListener('change', handleChange)
      return () => media.removeEventListener('change', handleChange)
    }
    media.addListener(handleChange)
    return () => media.removeListener(handleChange)
  }, [])

  return isNarrow
}

/**
 * Format duration in compact hours.
 */
const formatCompactDuration = (hours: number): string => {
  const safeHours = Number.isFinite(hours) ? hours : 0
  const rounded = Math.round(safeHours * 10) / 10
  const value = Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(1)
  return `${value}h`
}

export const TimeColumn: StyledComponent<ITimeColumnProps> = (props) => {
  const isNarrowScreen = useIsNarrowScreen()
  const timeTemplate = isNarrowScreen ? 'HHmm' : (props.dateFormat ?? 'HH:mm')
  const startTime = $date.formatDate(props.event.startDateTime, timeTemplate)
  const endTime = $date.formatDate(props.event.endDateTime, timeTemplate)
  const durationHours = useMemo(() => {
    if (typeof props.event.duration === 'number') return props.event.duration
    return $date.getDurationHours(
      props.event.startDateTime,
      props.event.endDateTime
    )
  }, [props.event.duration, props.event.endDateTime, props.event.startDateTime])

  if (isNarrowScreen) {
    const compactDuration = formatCompactDuration(durationHours)
    return (
      <div className={props.className}>
        <span>
          {startTime}-{endTime} ({compactDuration})
        </span>
      </div>
    )
  }
  return (
    <div className={props.className}>
      <span>
        {startTime} - {endTime}
      </span>
    </div>
  )
}
