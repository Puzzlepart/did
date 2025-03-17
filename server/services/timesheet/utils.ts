import _ from 'lodash'
import { ClientEventInput, EventObject, Project } from '../../graphql'
import { ITimesheetPeriodData } from './types'
import { eventExtensions, TimeEntryExtensionContext } from './extensions'

/**
 * Map matched events. Takes the matched events retrieved from the client, and combines
 * the event data with the actual events from Microsoft Graph. Also adds additional data
 * to the events from the period using the dynamic extension system.
 *
 * @param period - The period
 * @param matchedEvents - The matched events retrieved from the client
 * @param events - The events fetched from Microsoft Graph
 * @param projects - The projects
 *
 * @returns A mapped events function and the total hours
 */
export function mapMatchedEvents(
  period: ITimesheetPeriodData,
  matchedEvents: ClientEventInput[],
  events: EventObject[],
  projects: Project[]
) {
  const events_ = []
  const hours = matchedEvents.reduce((hours, matchedEvent) => {
    const event = _.find(events, ({ id }) => id === matchedEvent.id)
    if (!event) return hours

    // Create base event by merging matched event and original event
    const baseEvent = {
      ...matchedEvent,
      ...event
    }

    // Extension context
    const extensionContext: TimeEntryExtensionContext = {
      period,
      matchedEvent,
      originalEvent: event,
      projects
    }

    // Apply all registered extensions to the event
    const extendedEvent = eventExtensions.reduce(
      (extendedEvent, extension) => ({
        ...extendedEvent,
        ...extension.apply(extendedEvent, extensionContext)
      }),
      baseEvent
    )

    events_.push(extendedEvent)
    return hours + (extendedEvent.duration || 0)
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
  }
}
