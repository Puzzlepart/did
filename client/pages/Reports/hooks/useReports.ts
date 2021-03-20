/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useLayoutEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useUpdateUserConfiguration } from '../../../hooks/user/useUpdateUserConfiguration'
import { useReportsReducer } from '../reducer'
import { useColumns } from './useColumns'
import { useFilters } from './useFilters'
import { useReportsQueries } from './useReportsQueries'
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
  const history = useHistory()
  const queries = useReportsQueries()
  const [state, dispatch] = useReportsReducer(queries)
  useReportsQuery({ state, dispatch })
  useLayoutEffect(() => {
    if (state.preset) {
      history.push(`/reports/${state.preset?.itemKey || ''}`)
    }
  }, [state.preset, history])

  const columns = useColumns({ defaults: { isResizable: true } })
  const filters = useFilters({ filter: state.filter })

  useUpdateUserConfiguration(
    {
      'reports.filters': state.savedFilters
    },
    !state.loading && !!state.filter?.text
  )

  const context = useMemo(() => ({ state, dispatch, columns, t }), [state])

  return {
    queries,
    columns,
    filters,
    context
  }
}

export { useReportsQueries as useQueries }
