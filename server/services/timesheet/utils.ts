import { find, pick } from 'underscore'
import { EventInput } from '../../graphql'
import MSGraphEvent from '../msgraph/types'
import { ITimesheetPeriodData } from './types'

/**
 * Create unique ID consisting of event ID + event start date time
 *
 * @param eventId - Event ID
 * @param startDateTime - Start date time
 */
function createUniqueEventId(eventId: string, startDateTime: Date) {
  return `${eventId}${startDateTime.getTime()}`.replace(/[^\dA-Za-z]/g, '')
}

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
  events: MSGraphEvent[]
) {
  const events_ = []
  const hours = matchedEvents.reduce((hours, m: any) => {
    const event = find(events, ({ id }) => id === m.id)
    if (!event) return null
    const _id = createUniqueEventId(event.id, event.startDateTime as Date)
    events_.push({
      ...m,
      ...event,
      _id
    })
    return hours + event.duration
  }, 0)

  /**
   * Get events with optional additional data
   *
   * @param includeAdditionalData - Include additional data from the period
   * @returns Entries with or without additional data from the period
   */
  const getEvents = (includeAdditionalData = false) => {
    if (includeAdditionalData) {
      const additionalData = pick(period, 'userId', 'week', 'month', 'year')
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
  }
}
