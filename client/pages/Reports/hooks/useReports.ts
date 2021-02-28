/* eslint-disable tsdoc/syntax */
import { useLayoutEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import initFilters from '../filters'
import { IReportsParameters } from '../types'
import { useQueryPresets } from './useQueryPresets'
import { useReportQuery } from './useReportsQuery'
import { useReportsReducer } from './useReportsReducer'

/**
 * Hook for Reports
 *
 * * Get history using useHistory
 * * Get URL params using useParams
 * * Get queries using getQueries
 * * Using reducer from /reducer
 * * Using useReportQuery
 * * Layout effect for updating URL when changing query
 * * Layout effects for initialiing state and updating state
 *   when the query is reloaded
 *
 * @category Reports Hooks
 */
export function useReports() {
  const { t } = useTranslation()
  const parameters = useParams<IReportsParameters>()
  const history = useHistory()
  const queries = useQueryPresets()
  const { state, dispatch } = useReportsReducer(queries)
  useReportQuery({ state, dispatch })
  useLayoutEffect(() => history.push(`/reports/${state.query?.key || ''}`), [
    state.query,
    history
  ])
  const filters = useMemo(() => initFilters(state.filter, t), [state.filter, t])
  return {
    state,
    dispatch,
    params: parameters,
    queries,
    history,
    filters,
    t
  }
}
