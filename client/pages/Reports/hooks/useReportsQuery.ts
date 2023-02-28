/* eslint-disable react-hooks/exhaustive-deps */
import {
  FetchPolicy,
  QueryLazyOptions,
  useLazyQuery,
  useQuery
} from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { useLayoutEffect } from 'react'
import { report_links } from '../queries'
import { DATA_UPDATED } from '../reducer/actions'
import { IReportsState } from '../types'
import { default_query } from './useReportsQueries'

type useReportsQuery = {
  state: IReportsState
  dispatch: React.Dispatch<AnyAction>
  fetchPolicy?: FetchPolicy
}

/**
 * Hook for Reports Query.
 *
 * Using `useLazyQuery` and `useLayoutEffect` and dispatches
 * `DATA_UPDATED` action on query changes. Also fetches report links
 * using `useQuery`.
 *
 * @param param0 - `state` and `dispatch` from `useReportsReducer`, aswell
 * as `fetchPolicy` for `useLazyQuery` with default value `'no-cache'`
 *
 * @returns `query` from `useLazyQuery`. A callback function that
 * executes the query. It takes an optional `QueryLazyOptions` object
 * as an argument.
 *
 * @category Reports Hooks
 */
export function useReportsQuery({
  state,
  dispatch,
  fetchPolicy = 'no-cache'
}: useReportsQuery): (options?: QueryLazyOptions<any>) => void {
  const [query, queryResult] = useLazyQuery(
    state.queryPreset?.query || default_query,
    {
      fetchPolicy,
      variables: state.queryPreset?.variables || {}
    }
  )
  const reportLinksQuery = useQuery(report_links, {
    fetchPolicy: 'cache-and-network'
  })
  useLayoutEffect(
    () => dispatch(DATA_UPDATED({ queryResult, reportLinksQuery })),
    [queryResult.loading, reportLinksQuery.loading]
  )
  return query
}
