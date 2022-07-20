/* eslint-disable react-hooks/exhaustive-deps */
import { OperationVariables, QueryResult, useQuery } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { Dispatch, useLayoutEffect } from 'react'
import { DATA_UPDATED } from '../reducer/actions'
import $projects_outlook from './projects-outlook.gql'

/**
 * Use Projects query
 *
 * Uses `useQuery` from `apollo/client`
 *
 * @param dispatch - Dispatch
 */
export function useProjectsQuery(dispatch: Dispatch<AnyAction>): QueryResult<any, OperationVariables>  {
  const query = useQuery($projects_outlook, {
    variables: { sortBy: 'name' },
    fetchPolicy: 'cache-and-network'
  })
  useLayoutEffect(
    () => dispatch(DATA_UPDATED(query)),
    [query]
  )
  return query
}
