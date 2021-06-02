/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { IChoiceGroupOption } from '@fluentui/react'
import { useLayoutEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useUpdateUserConfiguration } from '../../../hooks/user/useUpdateUserConfiguration'
import { useReportsReducer } from '../reducer'
import { CHANGE_QUERY, CLEAR_FILTERS } from '../reducer/actions'
import { useFilters } from './useFilters'
import { useReportsQueries } from './useReportsQueries'
import { useReportsQuery } from './useReportsQuery'

/**
 * Component logic for `<Reports />`
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

  const filters = useFilters({ filter: state.filter })

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
    options: queries.map((query) => ({
      key: query.itemKey,
      text: query.headerText,
      iconProps: { iconName: query.itemIcon },
      onClick: () => context.dispatch(CHANGE_QUERY({ itemKey: query.itemKey })),
      styles: {
        root: {
          padding: 25,
          maxWidth: 180
        },
        labelWrapper: {
          maxWidth: 'none'
        },
        field: {
          border: 'none',
          ':before': {
            display: 'none'
          }
        }
      }
    })) as IChoiceGroupOption[],
    filters,
    context,
    onClearFilters
  }
}

export { useReportsQueries as useQueries }
