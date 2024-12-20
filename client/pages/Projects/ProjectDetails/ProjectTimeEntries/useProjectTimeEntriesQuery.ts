import { useQuery } from '@apollo/client'
import { TimeEntry, User } from 'types'
import _ from 'underscore'
import { useProjectsContext } from '../../context'
import timeentriesQuery from './timeentries.gql'

/**
 * Hook for time entries query. Queries GraphQL API with the
 * query specified in `timeentries.gql` and joins the data.
 *
 * @category Projects
 */
export function useProjectTimeEntriesQuery() {
  const { state } = useProjectsContext()
  const query = useQuery<{
    users: User[]
    timeEntries: TimeEntry[]
  }>(timeentriesQuery, {
    variables: {
      query: { projectId: state.selected?.tag }
    },
    skip: !state.selected
  })
  const users: User[] = query?.data?.users ?? []
  const timeEntries = (query?.data?.timeEntries ?? []).map((entry) => ({
    ...entry,
    resource: _.find(users, (user) => user.id === entry.resource?.id)
  }))
  return { ...query, timeEntries }
}
