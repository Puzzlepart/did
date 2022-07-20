/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ICustomersContext } from '../context'
import { useCustomersReducer } from '../reducer/useCustomersReducer'
import { ICustomersParameters } from '../types'
import { useCustomersHistory } from './useCustomersHistory'
import { useCustomersQuery } from './useCustomersQuery'

/**
 * Hook for Customers
 *
 * * Using `useCustomersReducer`
 * * Using `useCustomersQuery`
 * * Building our Customers context
 */
export function useCustomers() {
  const parameters = useParams<ICustomersParameters>()
  const { state, dispatch } = useCustomersReducer()
  const query = useCustomersQuery(dispatch)
  useCustomersHistory(state)

  const context = useMemo<ICustomersContext>(
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
