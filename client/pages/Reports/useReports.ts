/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { useUpdateUserConfiguration } from '../../hooks/user/useUpdateUserConfiguration'
import {
  useReportsQueries,
  useReportsQuery,
  useReportsQueryOptions
} from './hooks'
import { useReportsReducer } from './reducer'

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
  const queries = useReportsQueries()
  const [state, dispatch] = useReportsReducer(queries)
  const options = useReportsQueryOptions({ queries, state, dispatch })
  const query = useReportsQuery({ state, dispatch })

  useLayoutEffect(() => {
    if (state.queryPreset && _.isEmpty(state.queryPreset?.reportLinks)) {
      query({ variables: state.queryPreset?.variables })
    }
  }, [state.queryPreset?.reportLinks])

  useUpdateUserConfiguration({
    config: {
      'reports.filters': state.savedFilters
    },
    autoUpdate: !state.loading && !!state.activeFilter?.text
  })

  const context = useMemo(() => ({ state, dispatch, t }), [state])

  return {
    defaultSelectedKey: state.queryPreset?.itemKey || 'default',
    queries: queries.filter((q) => !q.hidden),
    options,
    context,
    reportLinks: state.reportLinks
  } as const
}
