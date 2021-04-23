/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { useLayoutEffect } from 'react'
import { DATA_UPDATED } from '../reducer/actions'
import { default_query } from './useReportsQueries'
/**
 * Hook for Reports Query.
 *
 * Using `useQuery` with and dispatches
 * `DATA_UPDATED` action on query changes.
 *
 * @category Reports Hooks
 */
export function useReportsQuery({ state, dispatch }) {
  const query = state.preset?.query || default_query
  const result = useQuery(query, {
    skip: !state.preset,
    variables: state.preset?.variables || {}
  })
  useLayoutEffect(() => dispatch(DATA_UPDATED({ result })), [result.loading])
}
