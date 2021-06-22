/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useLazyQuery } from '@apollo/client'
import { useLayoutEffect } from 'react'
import { DATA_UPDATED } from '../reducer/actions'
import { default_query } from './useReportsQueries'
/**
 * Hook for Reports Query.
 *
 * Using `useLazyQuery` and `useLayoutEffect` and dispatches
 * `DATA_UPDATED` action on query changes.
 *
 * @category Reports Hooks
 */
export function useReportsQuery({ state, dispatch }) {
  const [query, result] = useLazyQuery(state.preset?.query || default_query, {
    fetchPolicy: 'no-cache',
    variables: state.preset?.variables || {}
  })
  useLayoutEffect(() => dispatch(DATA_UPDATED({ result })), [result.loading])
  return query
}
