import _ from 'underscore'
import { EventInput, EventObject } from '../../graphql'
import { ITimesheetPeriodData } from './types'

/**
 * Map matched events. Takes the matched events retrieved from the client, and combines
 * the event data with the actual events from Microsoft Graph. Also adds additional data
 * to the events from the period.
 *
 * @param period - The period
 * @param matchedEvents - The matched events
 * @param events - The events fetched from Microsoft Graph
 *
 * @returns A mapped events function and the total hours
 */
export function mapMatchedEvents(
  period: ITimesheetPeriodData,
  matchedEvents: EventInput[],
  events: EventObject[]
) {
  const events_ = []
  const hours = matchedEvents.reduce((hours, m: any) => {
    const event = _.find(events, ({ id }) => id === m.id)
    if (!event) return null
    events_.push({
      ...m,
      ...event
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
