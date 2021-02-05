import { useQuery } from '@apollo/client'
import { FilterPanel, List, UserMessage } from 'components'
import DateUtils from 'DateUtils'
import { Pivot, PivotItem, Spinner } from 'office-ui-fabric'
import React, { useLayoutEffect, useMemo, useReducer } from 'react'
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
  const history = useHistory()
  const params = useParams<IReportsParams>()
  const queries = getQueries(t)
  const reducer = useMemo(() => createReducer({ params, queries }), [])
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

  /**
   * Memorizing columns, context and filters
   */
  const columns = useMemo(() => getColumns({ isResizable: true }, t), [])
  const ctxValue = useMemo(() => ({ state, dispatch, t }), [state])
  const filters = useMemo(() => initFilters(state.filter, t), [state.filter])

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
                  <Spinner
                    className={styles.spinner}
                    labelPosition='right'
                    label={t('reports.generatingReportLabel')}
                  />
                )}
                {!state.loading && !isEmpty(state.timeentries) && (
                  <List
                    fadeIn={[200, 500]}
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
                )}
                <UserMessage
                  hidden={!isEmpty(state.timeentries) || state.loading || !state.query}
                  text={t('reports.noEntriesText')}
                />
                <FilterPanel
                  isOpen={state.isFiltersOpen}
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
