/* eslint-disable tsdoc/syntax */
import { useLayoutEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { useUpdateUserConfiguration } from '../../../hooks/user/useUpdateUserConfiguration'
import initFilters from '../filters'
import { useReportsReducer } from '../reducer'
import { IReportsParameters } from '../types'
import { useQueries } from './queries'
import { useColumns } from './useColumns'
import { useReportsQuery } from './useReportsQuery'

/**
 * Hook for Reports
 *
 * * Get history using `useHistory`
 * * Get URL params using `useParams`
 * * Get queries using `useQueries`
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
  const queries = useQueries()
  const [state, dispatch] = useReportsReducer(queries)
  useReportsQuery({ state, dispatch, variables: state.preset?.variables })
  useLayoutEffect(() => {
    if (state.preset) {
      history.push(`/reports/${state.preset?.key || ''}`)
    }
  }, [state.preset, history])

  const columns = useColumns({ defaults: { isResizable: true } })
  const filters = useMemo(() => initFilters(state.filter, t), [state.filter, t])

  useUpdateUserConfiguration(
    {
      'reports.filters': state.savedFilters
    },
    !state.loading && !!state.filter?.text
  )

  return {
    state,
    dispatch,
    params: parameters,
    queries,
    history,
    columns,
    filters,
    t
  }
}

export { useQueries }
