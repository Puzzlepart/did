import { useQuery } from '@apollo/client'
import { FilterPanel, List, UserMessage } from 'components'
import DateUtils from 'DateUtils'
import { Pivot, PivotItem } from 'office-ui-fabric'
import { Icon } from 'office-ui-fabric-react'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator'
import React, { useLayoutEffect, useMemo, useReducer } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { isEmpty } from 'underscore'
import getColumns from './columns'
import commandBar from './commandBar'
import { filters } from './filters'
import { getQueries } from './queries'
import createReducer, {
  CHANGE_QUERY,
  DATA_UPDATED,
  FILTERS_UPDATED,
  INIT,
  TOGGLE_FILTER_PANEL
} from './reducer'
import styles from './Reports.module.scss'
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
  const columns = useMemo(() => getColumns({ isResizable: true }, t), [])

  useLayoutEffect(() => dispatch(INIT()), [])
  useLayoutEffect(() => dispatch(DATA_UPDATED({ query })), [query])
  useLayoutEffect(() => {
    state.query?.key && history.push(`/reports/${state.query.key}`)
  }, [state.query])

  return (
    <div className={styles.root}>
      <Pivot
        defaultSelectedKey={params.query || 'default'}
        onLinkClick={(item) => dispatch(CHANGE_QUERY({ key: item.props.itemKey }))}>
        {queries.map((query) => (
          <PivotItem
            key={query.key}
            itemKey={query.key}
            headerText={query.text}
            headerButtonProps={{ disabled: state.loading }}
            itemIcon={query.iconName}>
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
                    const durationHrs = items.reduce(
                      (sum, item) => sum + item.duration,
                      0
                    ) as number
                    return t('common.headerTotalDuration', {
                      duration: DateUtils.getDurationString(durationHrs, t)
                    })
                  }
                }}
                columns={columns}
                commandBar={commandBar({ state, dispatch, t })}
              />
              <UserMessage
                hidden={!isEmpty(state.timeentries) || state.loading || !state.query}
                text={t('reports.noEntriesText')}
              />
              <FilterPanel
                isOpen={state.isFiltersOpen}
                filters={filters(t)}
                items={state.timeentries}
                onDismiss={() => dispatch(TOGGLE_FILTER_PANEL())}
                onFiltersUpdated={(filters) => dispatch(FILTERS_UPDATED({ filters }))}
                shortListCount={10}
              />
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
    </div>
  )
}
