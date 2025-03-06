import { useQuery } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { Dispatch, useEffect } from 'react'
import $projectsQuery from './projectsQuery.gql'
import { DATA_UPDATED } from './reducer/actions'
import { IProjectsState } from './types'

type ProjectsQueryResultType = Pick<
  IProjectsState,
  'projects' | 'myProjects' | 'outlookCategories'
> & {
  myProjects: {
    tag: string
  }[]
}

type ProjectsQueryVariables = {
  sortBy: string
}

/**
 * Hook tha uses `useQuery` from `@apollo/client` to fetch data
 * from the GraphQL server, then dispatches the data to the
 * reducer using `DATA_UPDATED` action.
 *
 * @param dispatch - Dispatch
 * @param sortBy - Sort by property
 */
export function useProjectsQuery(
  dispatch: Dispatch<AnyAction>,
  sortBy = 'name'
) {
  const query = useQuery<ProjectsQueryResultType, ProjectsQueryVariables>(
    $projectsQuery,
    {
      variables: { sortBy },
      fetchPolicy: 'cache-and-network'
    }
  )

  useEffect(() => dispatch(DATA_UPDATED(query)), [query])

  return {
    ...query,
    loading: query.loading && !query.previousData
  }
}
