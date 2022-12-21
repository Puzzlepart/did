/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@apollo/client'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'underscore'
import { ICustomersContext } from './context'
import $customers from './customers.gql'
import { useCustomersReducer } from './reducer'
import { DATA_UPDATED } from './reducer/actions'
import { ICustomersUrlParameters } from './types'
import { useCustomersHistory } from './useCustomersHistory'

/**
 * Component logic hook for `<Customers />`
 *
 * * Using `useCustomersReducer`
 * * Querying customers using `useQuery`
 * * Dispatching `DATA_UPDATED` when query changes
 * * Building our `CustomersContext` object
 */
export function useCustomers() {
  const urlParameters = useParams<ICustomersUrlParameters>()
  const { state, dispatch } = useCustomersReducer(urlParameters)
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
    view: urlParameters.currentTab ?? 's',
    renderDetails
  } as const
}
