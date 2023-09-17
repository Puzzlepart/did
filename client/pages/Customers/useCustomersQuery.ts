import { useQuery } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { Dispatch, useEffect } from 'react'
import $customers from './customers.gql'
import { DATA_UPDATED } from './reducer/actions'

/**
 * A hook that returns a query object for fetching customers data
 * and dispatches a `DATA_UPDATED` action when the query data is updated.
 *
 * @param dispatch - The Redux dispatch function.
 *
 * @returns The query object returned by useQuery.
 */
export function useCustomersQuery(dispatch: Dispatch<AnyAction>) {
  const query = useQuery($customers, {
    fetchPolicy: 'cache-first'
  })

  useEffect(() => dispatch(DATA_UPDATED(query)), [query])

  return query
}
