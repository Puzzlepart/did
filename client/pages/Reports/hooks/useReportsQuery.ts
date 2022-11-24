/* eslint-disable react-hooks/exhaustive-deps */
import { FetchPolicy, useLazyQuery } from '@apollo/client'
import { useLayoutEffect } from 'react'
import { DATA_UPDATED } from '../reducer/actions'
import { default_query } from './useReportsQueries'

/**
 * Hook for Reports Query.
 *
 * Using `useLazyQuery` and `useLayoutEffect` and dispatches
 * `DATA_UPDATED` action on query changes.
 *
 * @param param0 - State and dispatch
 * @param fetchPolicy - Fetch policy (defaults to `no-cache`)
 *
 * @category Reports Hooks
 */
export function useReportsQuery(
  { state, dispatch },
  fetchPolicy: FetchPolicy = 'no-cache'
) {
  const [query, result] = useLazyQuery(state.preset?.query || default_query, {
    fetchPolicy,
    variables: state.preset?.variables || {}
  })
  useLayoutEffect(() => dispatch(DATA_UPDATED({ result })), [result.loading])
  return query
}
