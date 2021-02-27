import { useQuery } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { Dispatch, useLayoutEffect } from 'react'
import { DATA_UPDATED } from '../reducer/actions'
import $projects from './projects.gql'

/**
 * Use Projects query
 *
 * Uses useQuery from apollo/client
 *
 * @param dispatch - Dispatch
 */
export function useProjectsQuery(dispatch: Dispatch<AnyAction>) {
  const { refetch, data, error, loading } = useQuery($projects, {
    variables: { sortBy: 'name' },
    fetchPolicy: 'cache-and-network'
  })
  useLayoutEffect(() => dispatch(DATA_UPDATED({ data, error, loading })), [
    data,
    error,
    loading,
    dispatch
  ])
  return { refetch, loading }
}
