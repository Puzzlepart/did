import { ClientEventInput, EventObject, Project } from '../../graphql'
import { ITimesheetPeriodData } from './types'
import _ from 'lodash'
import { tryParseJson } from '../../utils'
import {
  ProjectResourcesExtensionId,
  ProjectRoleDefinitionsExtensionId
} from '../mongo/project'

/**
 * Context object passed to extensions with all the data they might need
 */
export type TimeEntryExtensionContext = {
  period: ITimesheetPeriodData
  matchedEvent: ClientEventInput
  originalEvent: EventObject
  projects: Project[]
}

/**
 * Interface for time entry extensions
 */
export interface TimeEntryExtension {
  apply: (
    event: ClientEventInput & EventObject,
    context: TimeEntryExtensionContext
  ) => Record<string, any>
}

/**
 * Extension for handling matched events with project role information.
 * Adds role properties to events based on project resources and role definitions.
 */
export const ProjectRoleEventExtension: TimeEntryExtension = {
  apply(_event, { period, matchedEvent, projects }) {
    if (!matchedEvent.projectId) return {}
    const project = _.find(
      projects,
      ({ _id }) => _id === matchedEvent.projectId
    )
    if (!project) return {}

    const extensions = tryParseJson(
      _.get(project, 'extensions', { default: 'null' }) as string
    )
    if (!extensions) return {}

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
    const resource = _.find(resources, ({ id }) => id === period.userId)

    if (!resource) {
      if (!defaultRole) return {}
      return {
        role: {
          name: defaultRole.name,
          hourlyRate: defaultRole.hourlyRate
        }
      }
    }

    return {
      role: {
        name: resource.projectRole,
        hourlyRate: resource.hourlyRate
      }
    }
  }
}

/**
 * Extension for adding duration information to events.
 * Handles correct precedence of different duration values.
 */
export const DurationEventExtension: TimeEntryExtension = {
  apply(_event, { matchedEvent, originalEvent }) {
    return {
      startDateTime: matchedEvent.startDateTime ?? originalEvent.startDateTime,
      endDateTime: matchedEvent.endDateTime ?? originalEvent.endDateTime,
      duration: matchedEvent.duration ?? originalEvent.duration,
      originalDuration:
        matchedEvent.originalDuration ?? originalEvent.originalDuration,
      adjustedMinutes:
        matchedEvent.adjustedMinutes ?? originalEvent.adjustedMinutes
    }
  }
}

/**
 * Registry of all event extensions.
 * Add new extension classes to this array to automatically apply them to events.
 */
export const eventExtensions = [
  DurationEventExtension,
  ProjectRoleEventExtension
]
