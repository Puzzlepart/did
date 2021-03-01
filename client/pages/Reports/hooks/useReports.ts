/* eslint-disable tsdoc/syntax */
import { useLayoutEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import initFilters from '../filters'
import { useReportsReducer } from '../reducer'
import { IReportsParameters } from '../types'
import { useQueryPresets } from './query-presets'
import { useReportsQuery } from './useReportsQuery'

/**
 * Hook for Reports
 *
 * * Get history using `useHistory`
 * * Get URL params using `useParams`
 * * Get queries using `useQueryPresets`
 * * Using reducer `useReportsReducer`
 * * Using `useReportQuery`
 * * Layout effect (`useLayoutEffect`) for updating URL when changing query
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
  useReportsQuery({ state, dispatch })
  useLayoutEffect(() => {
    if (state.preset) {
      history.push(`/reports/${state.preset?.key || ''}`)
    }
  }, [state.preset, history])
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

export { useQueryPresets }
