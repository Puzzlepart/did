import $date from 'DateUtils'
import React, { useEffect, useMemo, useState } from 'react'
import { StyledComponent } from 'types'
import { ITimeColumnProps } from './types'

/**
 * Internal shared state for narrow screen media query.
 * Ensures we register only a single `matchMedia` listener for all components.
 */
const NARROW_MEDIA_QUERY = '(max-width: 600px)'
let narrowScreenValue = false
let narrowScreenMedia: MediaQueryList | null = null
const narrowScreenSubscribers = new Set<(value: boolean) => void>()
let narrowScreenListenerInitialised = false

/**
 * Get initial narrow-screen value in a safe way (SSR compatible).
 */
const getInitialNarrowScreen = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia(NARROW_MEDIA_QUERY).matches
}

/**
 * Ensure a single media query listener is registered for the narrow-screen query.
 */
const ensureNarrowScreenListener = (): void => {
  if (narrowScreenListenerInitialised) return
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return
  }

  narrowScreenMedia = window.matchMedia(NARROW_MEDIA_QUERY)
  narrowScreenValue = narrowScreenMedia.matches

  const handleChange = (event: MediaQueryListEvent | MediaQueryList): void => {
    const matches = 'matches' in event ? event.matches : narrowScreenMedia?.matches ?? false
    narrowScreenValue = matches
    for (const subscriber of narrowScreenSubscribers) subscriber(matches)
  }

  // Call once to ensure all subscribers receive the initial value.
  handleChange(narrowScreenMedia)

  if (typeof narrowScreenMedia.addEventListener === 'function') {
    narrowScreenMedia.addEventListener('change', handleChange)
  } else if (typeof narrowScreenMedia.addListener === 'function') {
    // Fallback for older browsers
    narrowScreenMedia.addListener(handleChange)
  }

  narrowScreenListenerInitialised = true
}

/**
 * Subscribe to shared narrow-screen state.
 */
const subscribeToNarrowScreen = (
  subscriber: (value: boolean) => void
): (() => void) => {
  narrowScreenSubscribers.add(subscriber)
  // Immediately send current value to new subscriber
  subscriber(narrowScreenValue)
  return () => {
    narrowScreenSubscribers.delete(subscriber)
  }
}

/**
 * Track whether the viewport is narrow.
 * Uses a shared media-query listener to avoid one listener per TimeColumn instance.
 */
const useIsNarrowScreen = (): boolean => {
  const [isNarrow, setIsNarrow] = useState<boolean>(() => getInitialNarrowScreen())

  useEffect(() => {
    ensureNarrowScreenListener()
    return subscribeToNarrowScreen(setIsNarrow)
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
