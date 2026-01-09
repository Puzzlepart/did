import { ClientEventInput, EventObject, Project } from '../../graphql'
import { ITimesheetPeriodData } from './types'
import _ from 'lodash'
import { tryParseJson } from '../../utils'
import {
  ProjectResourcesExtensionId,
  ProjectRoleDefinitionsExtensionId
} from '../mongo/project'
const debug = require('debug')('services/timesheet/extensions')

/**
 * Validates that an hourly rate is within acceptable bounds.
 * @param rate - The hourly rate to validate
 * @param context - Optional context for logging (userId, projectId, role)
 * @returns true if valid, false otherwise
 */
const isValidHourlyRate = (
  rate: number | null | undefined,
  context?: { userId?: string; projectId?: string; role?: string }
): rate is number => {
  if (rate == null) return false
  if (typeof rate !== 'number' || isNaN(rate)) {
    debug('WARNING: Non-numeric hourly rate detected: %o, context: %o', rate, context)
    return false
  }
  if (rate < 0) {
    debug('WARNING: Negative hourly rate detected: %s, context: %o', rate, context)
    return false
  }
  // Allow zero rates for interns, volunteers, etc.
  return true
}

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

    // Find the role definition for this resource's role to get the hourlyRate if missing
    const roleDefinition = _.find(
      roleDefinitions,
      ({ name }) => name === resource.projectRole
    )

    const logContext = {
      userId: period.userId,
      projectId: matchedEvent.projectId,
      role: resource.projectRole
    }

    // Determine the hourly rate to use
    let hourlyRate: number | undefined
    if (resource.hourlyRate != null && isValidHourlyRate(resource.hourlyRate, logContext)) {
      // Use resource-level hourly rate (includes 0 as valid)
      hourlyRate = resource.hourlyRate
    } else if (roleDefinition && isValidHourlyRate(roleDefinition.hourlyRate, logContext)) {
      // Fall back to role definition hourly rate
      hourlyRate = roleDefinition.hourlyRate
      debug(
        'Using role definition hourly rate fallback: userId=%s, projectId=%s, role=%s, rate=%s',
        period.userId,
        matchedEvent.projectId,
        resource.projectRole,
        hourlyRate
      )
    } else {
      // No valid hourly rate found - this is a data integrity issue
      debug(
        'WARNING: No valid hourly rate found: userId=%s, projectId=%s, role=%s, resourceRate=%s, roleDefRate=%s',
        period.userId,
        matchedEvent.projectId,
        resource.projectRole,
        resource.hourlyRate,
        roleDefinition?.hourlyRate
      )
    }

    return {
      role: {
        name: resource.projectRole,
        hourlyRate
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
