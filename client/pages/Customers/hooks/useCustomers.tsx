/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@apollo/client'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ICustomersContext } from '../context'
import $customers from './customers.gql'
import { DATA_UPDATED } from '../reducer/actions'
import { useCustomersReducer } from '../reducer/useCustomersReducer'
import { ICustomersParams } from '../types'
import { useHistoryUpdater } from './useHistoryUpdater'

/**
 * Hook for Customers
 *
 * * Using useCustomersReducer
 * * Querying customers using useQuery
 * * Dispatching DATA_UPDATED when query changes
 * * Building our Customers context
 */
export function useCustomers() {
  const params = useParams<ICustomersParams>()
  const { state, dispatch } = useCustomersReducer()
  const query = useQuery($customers, {
    fetchPolicy: 'cache-first'
  })

  useEffect(() => dispatch(DATA_UPDATED({ query })), [query])

  useHistoryUpdater(state)

  const context: ICustomersContext = useMemo(
    () => ({
      state,
      dispatch,
      refetch: query.refetch,
      loading: query.loading
    }),
    [state, dispatch]
  )

  return {
    state,
    dispatch,
    context,
    view: params.view || 'search'
  }
}
