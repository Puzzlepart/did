import { CheckboxVisibility } from '@fluentui/react'
import { List, Progress, TabComponent } from 'components'
import React from 'react'
import { APPLY_FILTER_STATE, SET_FILTER_STATE, SET_FILTERS_OPEN } from '../reducer/actions'
import styles from './ReportsList.module.scss'
import { SaveFilterForm } from './SaveFilterForm'
import { useReportsList } from './useReportsList'
import { IReportsListProps } from './types'
import { ExportProgress } from '../components/ExportProgress'

/**
 * Reports list
 *
 * @category Reports
 */
export const ReportsList: TabComponent<IReportsListProps> = (props) => {
  const {
    t,
    context,
    columns,
    menuItems,
    loadReportCommand,
    filterPanelItems,
    createPlaceholder,
    createContentAfter,
    exportProgress,
    exportProgressMessage
  } = useReportsList(props)
  return (
    <div className={ReportsList.className}>
      {(Boolean(props.loading) || context.state.loading) && (
        <Progress
          className={styles.progress}
          label={
            Boolean(props.loading)
              ? props.loading
              : t('reports.generatingReportProgressLabel', {
                  ...context.queryPreset,
                  text: context.queryPreset?.text?.toLowerCase()
              })
          }
          text={t('reports.generatingReportProgressText')}
        />
      )}
      {exportProgress && (
        <ExportProgress 
          progress={exportProgress} 
          progressMessage={exportProgressMessage}
        />
      )}
      <List
        hidden={props.hidden}
        enableShimmer={Boolean(props.loading) || context.state.loading}
        checkboxVisibility={CheckboxVisibility.always}
        items={props.items ?? context.state.data.timeEntries}
        columns={columns}
        menuItems={menuItems}
        menuItemsAfterFilters={loadReportCommand ? [loadReportCommand] : []}
        // Intentionally do not pass exportFileName so the List's default Excel export is disabled;
        // instead, we use a custom export implementation with progress tracking (see ExportProgress).
        filterValues={context.state?.activeFilter?.values}
        onFilter={(state) =>
          props.filters && context.dispatch(SET_FILTER_STATE(state))
        }
        filterPanelItems={filterPanelItems}
        filterPanelLoading={context.state?.preload?.loading}
        onFilterPanelToggle={(isOpen) => {
          context.dispatch(SET_FILTERS_OPEN(isOpen))
          if (!isOpen) {
            const filterState = context.state?.filterState ?? { filters: [] }
            context.dispatch(
              APPLY_FILTER_STATE({
                ...filterState,
                filters: [...(filterState.filters ?? [])]
              })
            )
          }
        }}
        filterPanel={{
          headerElements: <SaveFilterForm />
        }}
        searchBox={
          props.search && {
            fullWidth: true,
            persist: true,
            hidden: context.state.loading,
            placeholder: createPlaceholder,
            contentAfter: createContentAfter
          }
        }
        enableViewColumnsEdit
        persistViewColumns={ReportsList.displayName}
        filters={props.filters}
        error={props.error}
      />
    </div>
  )
}

ReportsList.displayName = 'ReportsList'
ReportsList.className = styles.reportList
ReportsList.defaultProps = {
  loading: '',
  exportFileName: 'TimeEntries-Custom-{0}.xlsx'
}
