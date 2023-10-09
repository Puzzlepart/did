import { TabItems } from 'components/Tabs'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useUpdateUserConfiguration } from '../../hooks/user/useUpdateUserConfiguration'
import { SummaryView } from './SummaryView'
import { WelcomeTab } from './WelcomeTab'
import { IReportsContext } from './context'
import {
  useReportsQueries,
  useReportsQuery,
  useReportsQueryPreset
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
  const { queries, queryTabs } = useReportsQueries()
  const [state, dispatch] = useReportsReducer()
  const queryPreset = useReportsQueryPreset(queries, state)
  const context = useMemo<IReportsContext>(
    () => ({ state, dispatch, queryPreset }),
    [state, queryPreset]
  )

  useReportsQuery(context)

  useUpdateUserConfiguration({
    config: {
      'reports.filters': state.savedFilters
    },
    autoUpdate: !state.loading && !!state.activeFilter?.text
  })

  /**
   * Tabs for `<Reports />`. The `home` tab is always present,
   * aswell as the `summary` tab. `queryTabs` are the tabs
   * for the queries.
   */
  const tabs: TabItems = useMemo(
    () => ({
      home: [WelcomeTab, t('reports.welcomeHeaderText')],
      ...queryTabs,
      summary: [SummaryView, t('reports.summaryHeaderText')]
    }),
    [queryTabs]
  )

  return {
    tabs,
    context
  }
}
