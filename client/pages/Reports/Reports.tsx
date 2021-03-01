/* eslint-disable tsdoc/syntax */
import { FilterPanel, List, UserMessage } from 'components'
import DateUtils from 'DateUtils'
import {
  Icon,
  Pivot,
  PivotItem,
  ProgressIndicator
} from 'office-ui-fabric-react'
import React, { FunctionComponent, useMemo } from 'react'
import { isEmpty } from 'underscore'
import getColumns from './columns'
import commandBar from './commandBar'
import { ReportsContext } from './context'
import { useReports, useUpdateUserConfiguration } from './hooks'
import {
  CHANGE_QUERY,
  FILTERS_UPDATED,
  TOGGLE_FILTER_PANEL
} from './reducer/actions'
import styles from './Reports.module.scss'
import { SaveFilterForm } from './SaveFilterForm'

/**
 * @category Function Component
 */
export const Reports: FunctionComponent = () => {
  const { state, dispatch, params, queries, filters, t } = useReports()
  useUpdateUserConfiguration({
    'reports.filters': state.savedFilters
  })

  const context = useMemo(() => ({ state, dispatch, t }), [state, dispatch, t])

  return (
    <div className={styles.root}>
      <ReportsContext.Provider value={context}>
        <Pivot
          defaultSelectedKey={params.query || 'default'}
          onLinkClick={(item) =>
            dispatch(CHANGE_QUERY({ key: item.props.itemKey }))
          }>
          {queries.map(({ key, text, iconName }) => (
            <PivotItem
              key={key}
              itemKey={key}
              headerText={text}
              itemIcon={iconName}>
              <div className={styles.container}>
                {state.loading && (
                  <div className={styles.progress}>
                    <Icon iconName='OEM' className={styles.icon} />
                    <ProgressIndicator
                      className={styles.indicator}
                      label={t('reports.generatingReportLabel')}
                      description={t('reports.generatingReportDescription')}
                    />
                  </div>
                )}
                <List
                  enableShimmer={state.loading}
                  items={state.subset}
                  groups={{
                    ...state.groupBy,
                    totalFunc: (items) => {
                      const hrs = items.reduce(
                        (sum, item) => sum + item.duration,
                        0
                      ) as number
                      return t('common.headerTotalDuration', {
                        duration: DateUtils.getDurationString(hrs, t)
                      })
                    }
                  }}
                  columns={getColumns({ isResizable: true }, t)}
                  commandBar={commandBar(context)}
                />
                <UserMessage
                  hidden={
                    !isEmpty(state.timeentries) ||
                    state.loading ||
                    !state.preset
                  }
                  text={t('reports.noEntriesText')}
                />
                <FilterPanel
                  isOpen={state.isFiltersOpen}
                  headerText={t('reports.filterPanelHeaderText')}
                  filters={filters}
                  items={state.timeentries}
                  onDismiss={() => dispatch(TOGGLE_FILTER_PANEL())}
                  onFiltersUpdated={(filters) =>
                    dispatch(FILTERS_UPDATED({ filters }))
                  }
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
