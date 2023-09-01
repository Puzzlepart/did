import { TabItems } from 'components/Tabs'
import { useLayoutEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { useUpdateUserConfiguration } from '../../hooks/user/useUpdateUserConfiguration'
import { IReportsContext } from './context'
import { useReportsQueries, useReportsQuery } from './hooks'
import { useReportsReducer } from './reducer'
import { ReportTab } from './ReportTab'
import { SummaryView } from './SummaryView'
import { WelcomeTab } from './WelcomeTab'

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

  const context = useMemo<IReportsContext>(
    () => ({ state, dispatch, queries }),
    [state]
  )

  const queryTabs = useMemo(
    () =>
      _.reduce(
        _.filter(queries, (q) => !q.hidden),
        (tabs, query) => {
          const { id, text: title } = query
          tabs[id] = [ReportTab, title]
          return tabs
        },
        {} as TabItems
      ),
    [queries]
  )

  const tabs: TabItems = useMemo(
    () => ({
      default: [WelcomeTab, ''],
      ...queryTabs,
      summary: [SummaryView, t('reports.summaryHeaderText')]
    }),
    [queryTabs]
  )

  return {
    tabs,
    context,
    reportLinks: state.reportLinks
  } as const
}
