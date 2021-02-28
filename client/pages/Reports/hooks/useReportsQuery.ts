/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { useLayoutEffect } from 'react'
import { DATA_UPDATED, INIT } from '../reducer/actions'
import $reports from './reports.gql'

/**
 * Hook for Reports Query
 *
 * @category Reports Hooks
 */
export function useReportQuery({ state, dispatch }) {
  const query = useQuery($reports, {
    skip: !state.query,
    fetchPolicy: 'cache-first',
    variables: state.query?.variables
  })
  useLayoutEffect(() => dispatch(INIT()), [dispatch])
  useLayoutEffect(() => dispatch(DATA_UPDATED({ query })), [query])
}
