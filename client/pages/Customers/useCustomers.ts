/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@apollo/client'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'underscore'
import { ICustomersContext } from './context'
import $customers from './customers.gql'
import { DATA_UPDATED } from './reducer/actions'
import { useCustomersReducer } from './reducer/useCustomersReducer'
import { ICustomersUrlParameters } from './types'
import { useCustomersHistory } from './useCustomersHistory'

/**
 * Hook for Customers
 *
 * * Using useCustomersReducer
 * * Querying customers using useQuery
 * * Dispatching DATA_UPDATED when query changes
 * * Building our Customers context
 */
export function useCustomers() {
  const urlParameters = useParams<ICustomersUrlParameters>()
  const { state, dispatch } = useCustomersReducer()
  const query = useQuery($customers, {
    fetchPolicy: 'cache-first'
  })

  useEffect(() => dispatch(DATA_UPDATED({ query })), [query])

  useCustomersHistory(state)

  const context = useMemo<ICustomersContext>(
    () => ({
      ..._.pick(query, 'loading', 'refetch'),
      state,
      dispatch
    }),
    [state, dispatch]
  )

  const renderDetails = !!state.selected || !!urlParameters.customerKey

  return {
    context,
    view: urlParameters.currentView ?? 'search',
    renderDetails
  } as const
}
