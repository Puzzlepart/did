import { useQuery } from '@apollo/client'
import { useLayoutEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import initFilters from '../filters'
import { getQueries } from '../queries'
import { DATA_UPDATED, INIT } from '../reducer/actions'
import { IReportsParams } from '../types'
import $timeentries from './timeentries.gql'
import { useReportsReducer } from './useReportsReducer'

/**
 * Hook for Reports
 *
 * * Get history using useHistory
 * * Get URL params using useParams
 * * Get queries using getQueries
 * * Using reducer from /reducer
 * * Using query with timeentries.gql
 * * Layout effect for updating URL when changing query
 * * Layout effects for initialiing state and updating state
 *   when the query is reloaded
 */
export function useReports() {
  const { t } = useTranslation()
  const params = useParams<IReportsParams>()
  const history = useHistory()
  const queries = getQueries(t)
  const { state, dispatch } = useReportsReducer(queries)
  const query = useQuery($timeentries, {
    skip: !state.query,
    fetchPolicy: 'cache-first',
    variables: state.query?.variables
  })
  useLayoutEffect(() => dispatch(INIT()), [dispatch])
  useLayoutEffect(() => dispatch(DATA_UPDATED({ query })), [query, dispatch])
  useLayoutEffect(() => history.push(`/reports/${state.query?.key || ''}`), [state.query, history])
  const filters = useMemo(() => initFilters(state.filter, t), [state.filter, t])
  return {
    state,
    dispatch,
    params,
    queries,
    history,
    filters,
    t
  }
}
