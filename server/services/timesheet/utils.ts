import _ from 'underscore'
import { ClientEventInput, EventObject } from '../../graphql'
import { ITimesheetPeriodData } from './types'

/**
 * Map matched events. Takes the matched events retrieved from the client, and combines
 * the event data with the actual events from Microsoft Graph. Also adds additional data
 * to the events from the period.
 *
 * @param period - The period
 * @param matchedEvents - The matched events retrieved from the client
 * @param events - The events fetched from Microsoft Graph
 *
 * @returns A mapped events function and the total hours
 */
export function mapMatchedEvents(
  period: ITimesheetPeriodData,
  matchedEvents: ClientEventInput[],
  events: EventObject[]
) {
  const events_ = []
  const hours = matchedEvents.reduce((hours, matchedEvent) => {
    const event = _.find(events, ({ id }) => id === matchedEvent.id)
    if (!event) return null
    events_.push({
      ...matchedEvent,
      ...event,
      startDateTime: matchedEvent.startDateTime ?? event.startDateTime,
      endDateTime: matchedEvent.endDateTime ?? event.endDateTime,
      duration: matchedEvent.duration ?? event.duration,
      originalDuration: matchedEvent.originalDuration ?? event.originalDuration,
      adjustedMinutes: matchedEvent.adjustedMinutes ?? event.adjustedMinutes
    })
    return hours + event.duration
  }, 0)

  /**
   * Get events with optional additional data
   *
   * @param includeAdditionalData - Include additional data from the period
   *
   * @returns Entries with or without additional data from the period
   */
  const getEvents = (includeAdditionalData = false) => {
    if (includeAdditionalData) {
      const additionalData = _.pick(period, 'userId', 'week', 'month', 'year')
      return events_.map((entry) => ({
        ...entry,
        ...additionalData,
        periodId: period._id
      }))
    }
    return events_
  }

  return {
    getEvents,
    hours
  } as const
}
