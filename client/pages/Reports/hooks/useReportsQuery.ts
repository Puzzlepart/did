/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { useLayoutEffect } from 'react'
import { DATA_UPDATED, INIT } from '../reducer/actions'
import $reports from './reports.gql'

/**
 * Hook for Reports Query.
 *
 * Using useQuery with reports.gql query, and dispatches
 * DATA_UPDATED action on query changes.
 *
 * @category Reports Hooks
 */
export function useReportQuery({ state, dispatch }) {
  const query = useQuery($reports, {
    skip: !state.query,
    fetchPolicy: 'cache-first',
    variables: state.query?.variables
  })
  useLayoutEffect(() => dispatch(INIT()), [])
  useLayoutEffect(() => dispatch(DATA_UPDATED({ query })), [query])
}
