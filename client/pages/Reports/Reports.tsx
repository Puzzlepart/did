/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { FilterPanel, FlexiblePivot, List, UserMessage } from 'components'
import $date from 'DateUtils'
import { Icon, PivotItem, ProgressIndicator } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import commandBar from './commandBar'
import { ReportsContext } from './context'
import { useReports } from './hooks'
import {
  CHANGE_QUERY,
  FILTERS_UPDATED,
  TOGGLE_FILTER_PANEL
} from './reducer/actions'
import styles from './Reports.module.scss'
import { SaveFilterForm } from './SaveFilterForm'
import { SummaryView } from './SummaryView'

/**
 * @category Function Component
 */
export const Reports: FunctionComponent = () => {
  const { t } = useTranslation()
  const { queries, columns, filters, context } = useReports()
  return (
    <ReportsContext.Provider value={context}>
      <FlexiblePivot
        className={styles.root}
        selectedKey={context.state.preset?.itemKey || 'default'}
        items={queries}
        fixedLinkWidth={true}
        onLinkClick={({ props }) => context.dispatch(CHANGE_QUERY({ props }))}>
        {queries
          .filter((q) => !q.hidden)
          .map((props, index) => (
            <PivotItem
              {...props}
              key={index}
              headerButtonProps={{ disabled: context.state.loading }}>
              <div className={styles.container}>
                {context.state.loading && (
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
                  enableShimmer={context.state.loading}
                  items={context.state.subset}
                  listGroupProps={{
                    ...context.state.groupBy,
                    totalFunc: (items) => {
                      const hrs = items.reduce(
                        (sum, item) => sum + item.duration,
                        0
                      ) as number
                      return t('common.headerTotalDuration', {
                        duration: $date.getDurationString(hrs, t)
                      })
                    }
                  }}
                  columns={columns}
                  commandBar={commandBar(context)}
                />
                <UserMessage
                  hidden={
                    !isEmpty(context.state.data.timeEntries) ||
                    context.state.loading ||
                    !context.state.preset
                  }
                  text={t('reports.noEntriesText')}
                />
                <FilterPanel
                  isOpen={context.state.isFiltersOpen}
                  headerText={t('reports.filterPanelHeaderText')}
                  filters={filters}
                  items={context.state.data.timeEntries}
                  onDismiss={() => context.dispatch(TOGGLE_FILTER_PANEL())}
                  onFiltersUpdated={(filters) =>
                    context.dispatch(FILTERS_UPDATED({ filters }))
                  }
                  shortListCount={10}>
                  <SaveFilterForm />
                </FilterPanel>
              </div>
            </PivotItem>
          ))}
        <PivotItem
          key='summary'
          itemKey='summary'
          headerText={t('admin.summary')}
          itemIcon='CalendarWeek'
          headerButtonProps={{ disabled: context.state.loading }}>
          <div className={styles.container}>
            {context.state.loading && (
              <div className={styles.progress}>
                <Icon iconName='OEM' className={styles.icon} />
                <ProgressIndicator
                  className={styles.indicator}
                  label={t('reports.generatingReportLabel')}
                  description={t('reports.generatingReportDescription')}
                />
              </div>
            )}
            <SummaryView />
          </div>
        </PivotItem>
        <PivotItem itemKey='default' headerButtonProps={{ disabled: true }}>
          <UserMessage
            className={styles.container}
            iconName='ReportDocument'
            text={t('reports.selectReportText')}
          />
        </PivotItem>
      </FlexiblePivot>
    </ReportsContext.Provider>
  )
}
