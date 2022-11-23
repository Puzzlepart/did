/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@apollo/client'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ICustomersContext } from './context'
import $customers from '../customers.gql'
import { DATA_UPDATED } from './reducer/actions'
import { useCustomersReducer } from './reducer/useCustomersReducer'
import { ICustomersParameters } from './types'
import { useCustomersHistory } from './hooks/useCustomersHistory'

/**
 * Hook for Customers
 *
 * * Using useCustomersReducer
 * * Querying customers using useQuery
 * * Dispatching DATA_UPDATED when query changes
 * * Building our Customers context
 */
export function useCustomers() {
  const parameters = useParams<ICustomersParameters>()
  const { state, dispatch } = useCustomersReducer()
  const query = useQuery($customers, {
    fetchPolicy: 'cache-first'
  })

  useEffect(() => dispatch(DATA_UPDATED({ query })), [query])

  useCustomersHistory(state)

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
    view: parameters.view || 'search'
  }
}
