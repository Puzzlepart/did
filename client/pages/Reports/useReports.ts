/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useUpdateUserConfiguration } from '../../hooks/user/useUpdateUserConfiguration'
import {
  useFilters,
  useReportsQueries,
  useReportsQuery,
  useReportsQueryOptions
} from './hooks'
import { useReportsReducer } from './reducer'
import { CLEAR_FILTERS } from './reducer/actions'

/**
 * Component logic for `<Reports />`
 *
 * * Get history using `useHistory`
 * * Get URL params using `useParams`
 * * Get queries using `useQueries`
 * * Using reducer `useReportsReducer`
 * * Using `useReportQuery`
 * * Layout effect (`useLayoutEffect`) for updating URL
 *   and executing the lazy query in `useReportQuery` when
 *   changing query
 *   when the query is reloaded
 *
 * @category Reports Hooks
 */
export function useReports() {
  const { t } = useTranslation()
  const history = useHistory()
  const queries = useReportsQueries()
  const [state, dispatch] = useReportsReducer(queries)
  const options = useReportsQueryOptions({ queries, dispatch })
  const query = useReportsQuery({ state, dispatch })

  useLayoutEffect(() => {
    if (state.preset) {
      history.push(`/reports/${state.preset?.itemKey || ''}`)
      query({ variables: state.preset?.variables })
    }
  }, [state.preset])

  const filters = useFilters(state.filter)

  useUpdateUserConfiguration({
    config: {
      'reports.filters': state.savedFilters
    },
    autoUpdate: !state.loading && !!state.filter?.text
  })

  const context = useMemo(() => ({ state, dispatch, t }), [state])

  let onClearFilters = null
  if (state.filter) {
    onClearFilters = () => dispatch(CLEAR_FILTERS())
  }

  return {
    defaultSelectedKey: state.preset?.itemKey || 'default',
    queries: queries.filter((q) => !q.hidden),
    options,
    filters,
    context,
    onClearFilters
  }
}
