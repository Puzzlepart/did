import { useQuery } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { Dispatch, useEffect } from 'react'
import $projects_outlook from './projects-outlook.gql'
import { DATA_UPDATED } from './reducer/actions'

/**
 * Hook tha uses `useQuery` from `@apollo/client` to fetch data
 * from the GraphQL server, then dispatches the data to the
 * reducer using `DATA_UPDATED` action.
 *
 * @param dispatch - Dispatch
 */
export function useProjectsQuery(dispatch: Dispatch<AnyAction>) {
  const query = useQuery($projects_outlook, {
    variables: { sortBy: 'name' },
    fetchPolicy: 'cache-and-network'
  })
  useEffect(() => dispatch(DATA_UPDATED(query)), [query])
  return query
}
