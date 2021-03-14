/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { useLayoutEffect } from 'react'
import { DATA_UPDATED, INIT } from '../reducer/actions'
import { report_current_month } from './queries'
/**
 * Hook for Reports Query.
 *
 * Using `useQuery` with and dispatches
 * `DATA_UPDATED` action on query changes.
 *
 * @category Reports Hooks
 */
export function useReportsQuery({ state, dispatch, variables = {} }) {
  const query = useQuery(state.preset?.query || report_current_month, {
    skip: !state.preset,
    fetchPolicy: 'cache-first',
    variables
  })
  useLayoutEffect(() => dispatch(INIT()), [])
  useLayoutEffect(() => dispatch(DATA_UPDATED({ query })), [query])
}
