import { TimeEntry, User } from 'types'
import { IReportsData } from '../types'

/**
 * Retrieves a resource from a list of users based on a given time entry.
 * If the resource is found, it also retrieves the manager of the resource.
 *
 * @param entry - The time entry containing the resource information.
 * @param users - The list of users to search for the resource and manager.
 * @returns An object containing the resource and its manager, or null if the resource is not found.
 */
function getResource(entry: TimeEntry, users: User[]): User {
  const resource = users.find(({ id }) => id === entry.resource?.id)
  if (!resource) return null
  const manager = users.find(({ id }) => id === resource.manager?.id)
  return {
    id: entry.resource.id,
    ...resource,
    manager
  } as User
}

/**
 * Maps time entries in the given data object by adding a resource property to each entry.
 * The resource property is determined by the getResource function.
 *
 * @param data - A partial `IReportsData` object containing time entries and users.
 *
 * @returns A partial `IReportsData` object with updated time entries.
 */
export const mapTimeEntries = (
  data: Partial<IReportsData> = {}
): Partial<IReportsData> => {
  const { timeEntries, users } = { ...data }
  if (timeEntries) {
    data.timeEntries = timeEntries.map((entry) => ({
      ...entry,
      resource: getResource(entry, users)
    }))
  }
  return data
}
