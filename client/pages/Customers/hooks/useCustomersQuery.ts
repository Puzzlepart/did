/* eslint-disable react-hooks/exhaustive-deps */
import { OperationVariables, QueryResult, useQuery } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { Dispatch, useEffect } from 'react'
import { DATA_UPDATED } from '../reducer/actions'
import $customers from '../customers.gql'

/**
 * Use Customers query
 *
 * Uses `useQuery` from `apollo/client`
 *
 * @param dispatch - Dispatch
 */
export function useCustomersQuery(dispatch: Dispatch<AnyAction>): QueryResult<any, OperationVariables> {
  const query = useQuery($customers, {
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => dispatch(DATA_UPDATED(query)), [query])
  return query
}
