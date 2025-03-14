import { CheckboxVisibility } from '@fluentui/react'
import { List, Progress, TabComponent } from 'components'
import React from 'react'
import { SET_FILTER_STATE } from '../reducer/actions'
import styles from './ReportsList.module.scss'
import { SaveFilterForm } from './SaveFilterForm'
import { useReportsList } from './useReportsList'
import { IReportsListProps } from './types'

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
    createPlaceholder,
    createContentAfter
  } = useReportsList(props)
  return (
    <div className={ReportsList.className}>
      {(props.loading || context.state.loading) && (
        <Progress
          className={styles.progress}
          text={t('reports.generatingReportProgressText')}
        />
      )}
      <List
        hidden={props.hidden}
        enableShimmer={props.loading || context.state.loading}
        checkboxVisibility={CheckboxVisibility.always}
        items={props.items ?? context.state.data.timeEntries}
        columns={columns}
        menuItems={menuItems}
        exportFileName={
          context.queryPreset?.exportFileName ?? props.exportFileName
        }
        filterValues={context.state?.activeFilter?.values}
        onFilter={(state) =>
          props.filters && context.dispatch(SET_FILTER_STATE(state))
        }
        filterPanel={{
          headerElements: <SaveFilterForm />
        }}
        searchBox={{
          fullWidth: true,
          persist: true,
          hidden: context.state.loading || !props.search,
          placeholder: createPlaceholder,
          contentAfter: createContentAfter
        }}
        enableViewColumnsEdit
        persistViewColumns={ReportsList.displayName}
        filters={props.filters}
      />
    </div>
  )
}

ReportsList.displayName = 'ReportsList'
ReportsList.className = styles.reportList
ReportsList.defaultProps = {
  exportFileName: 'TimeEntries-Custom-{0}.xlsx'
}
