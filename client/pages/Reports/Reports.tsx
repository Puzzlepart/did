import { useQuery } from '@apollo/client'
import { AppContext } from 'AppContext'
import { FilterPanel, List, UserMessage } from 'components'
import DateUtils from 'DateUtils'
import { Icon, Pivot, PivotItem, ProgressIndicator } from 'office-ui-fabric'
import React, { useContext, useLayoutEffect, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { isEmpty } from 'underscore'
import getColumns from './columns'
import commandBar from './commandBar'
import { ReportsContext } from './context'
import initFilters from './filters'
import { getQueries } from './queries'
import createReducer, {
  CHANGE_QUERY,
  DATA_UPDATED,
  FILTERS_UPDATED,
  INIT,
  TOGGLE_FILTER_PANEL
} from './reducer'
import styles from './Reports.module.scss'
import { SaveFilterForm } from './SaveFilterForm'
import $timeentries from './timeentries.gql'
import { IReportsParams } from './types'

export const Reports = () => {
  const { t } = useTranslation()
  const app = useContext(AppContext)
  const history = useHistory()
  const params = useParams<IReportsParams>()
  const queries = getQueries(t)
  const reducer = useMemo(() => createReducer({ app, params, queries }), [])
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    timeentries: [],
    groupBy: {
      fieldName: '.',
      emptyGroupName: t('common.all')
    }
  })
  const query = useQuery($timeentries, {
    skip: !state.query,
    fetchPolicy: 'cache-first',
    variables: state.query?.variables
  })

  /**
   * Layout effects
   */
  useLayoutEffect(() => dispatch(INIT()), [])
  useLayoutEffect(() => dispatch(DATA_UPDATED({ query })), [query])
  useLayoutEffect(() => {
    state.query?.key && history.push(`/reports/${state.query.key}`)
  }, [state.query])

  const columns = useMemo(() => getColumns({ isResizable: true }, t), [])
  const filters = useMemo(() => initFilters(state.filter, t), [state.filter])
  const ctxValue = useMemo(() => ({ state, dispatch, t }), [state])

  return (
    <div className={styles.root}>
      <ReportsContext.Provider value={ctxValue}>
        <Pivot
          defaultSelectedKey={params.query || 'default'}
          onLinkClick={(item) => dispatch(CHANGE_QUERY({ key: item.props.itemKey }))}>
          {queries.map(({ key, text, iconName }) => (
            <PivotItem key={key} itemKey={key} headerText={text} itemIcon={iconName}>
              <div className={styles.container}>
                {state.loading && (
                  <div className={styles.progress}>
                    <Icon iconName='OEM' className={styles.icon} />
                    <ProgressIndicator
                      className={styles.indicator}
                      label={t('reports.generatingReportLabel')}
                      description={t('reports.generatingReportDescription')} />
                  </div>
                )}
                <List
                  enableShimmer={state.loading}
                  items={state.subset}
                  groups={{
                    ...state.groupBy,
                    totalFunc: (items) => {
                      const hrs = items.reduce((sum, item) => sum + item.duration, 0) as number
                      return t('common.headerTotalDuration', {
                        duration: DateUtils.getDurationString(hrs, t)
                      })
                    }
                  }}
                  columns={columns}
                  commandBar={commandBar(ctxValue)}
                />
                <UserMessage
                  hidden={!isEmpty(state.timeentries) || state.loading || !state.query}
                  text={t('reports.noEntriesText')}
                />
                <FilterPanel
                  isOpen={state.isFiltersOpen}
                  headerText={t('reports.filterPanelHeaderText')}
                  filters={filters}
                  items={state.timeentries}
                  onDismiss={() => dispatch(TOGGLE_FILTER_PANEL())}
                  onFiltersUpdated={(filters) => dispatch(FILTERS_UPDATED({ filters }))}
                  shortListCount={10}>
                  <SaveFilterForm />
                </FilterPanel>
              </div>
            </PivotItem>
          ))}
          <PivotItem itemKey='default' headerButtonProps={{ disabled: true }}>
            <UserMessage
              className={styles.container}
              iconName='ReportDocument'
              text={t('reports.selectReportText')}
            />
          </PivotItem>
        </Pivot>
      </ReportsContext.Provider>
    </div>
  )
}
