import _ from 'lodash'
import { ClientEventInput, EventObject, Project } from '../../graphql'
import { tryParseJson } from '../../utils'
import {
  ProjectResourcesExtensionId,
  ProjectRoleDefinitionsExtensionId
} from '../mongo/project'
import { ITimesheetPeriodData } from './types'

/**
 * Finds the project role for a given project based on the user ID in the configuration.
 *
 * @param projects - The projects to search for the role.
 * @param projectId - The project ID
 * @param userId - The user ID to search for in the project resources.
 *
 * @returns An object containing the project role name and hourly rate if found, otherwise null.
 */
const findProjectRole = (
  projects: Project[],
  projectId: string,
  userId: string
) => {
  const project = _.find(projects, ({ _id }) => _id === projectId)
  if (!project) return null
  const extensions = tryParseJson(
    _.get(project, 'extensions', { default: 'null' }) as string
  )
  if (!extensions) return null
  const resources = _.get(
    extensions,
    `${ProjectResourcesExtensionId}.properties.resources`,
    { default: [] }
  )
  const roleDefinitions = _.get(
    extensions,
    `${ProjectRoleDefinitionsExtensionId}.properties.roleDefinitions`,
    { default: [] }
  )
  const defaultRole = _.find(roleDefinitions, ({ isDefault }) => isDefault)
  const resource = _.find(resources, ({ id }) => id === userId)
  if (!resource) {
    if (!defaultRole) return null
    return {
      name: defaultRole.name,
      hourlyRate: defaultRole.hourlyRate
    }
  }
  return {
    name: resource.projectRole,
    hourlyRate: resource.hourlyRate
  }
}

/**
 * Map matched events. Takes the matched events retrieved from the client, and combines
 * the event data with the actual events from Microsoft Graph. Also adds additional data
 * to the events from the period.
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
    if (!event) return null
    events_.push({
      ...matchedEvent,
      ...event,
      startDateTime: matchedEvent.startDateTime ?? event.startDateTime,
      endDateTime: matchedEvent.endDateTime ?? event.endDateTime,
      duration: matchedEvent.duration ?? event.duration,
      originalDuration: matchedEvent.originalDuration ?? event.originalDuration,
      adjustedMinutes: matchedEvent.adjustedMinutes ?? event.adjustedMinutes,
      role: findProjectRole(projects, matchedEvent.projectId, period.userId)
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
  }
}
