import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { TimeEntry, User } from 'types'
import _ from 'underscore'
import { ProjectsContext } from '../../context'
import timeentriesQuery from './timeentries.gql'

/**
 * Hook for time entries query. Queries GraphQL API with the
 * query specified in `timeentries.gql` and joins the data.
 *
 * @category Projects
 */
export function useTimeEntriesQuery() {
  const { state } = useContext(ProjectsContext)
  const { loading, error, data } = useQuery<{
    users: User[]
    timeEntries: TimeEntry[]
  }>(timeentriesQuery, {
    variables: {
      query: { projectId: state.selected?.tag }
    },
    skip: !state.selected
  })
  const users: User[] = data?.users ?? []
  const timeEntries = (data?.timeEntries ?? []).map((entry) => ({
    ...entry,
    resource: _.find(users, (user) => user.id === entry.resource?.id)
  }))
  return { loading, error, timeEntries } as const
}
