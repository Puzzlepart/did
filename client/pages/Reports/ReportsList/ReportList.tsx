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
      <List
        hidden={props.hidden}
        enableShimmer={Boolean(props.loading) || context.state.loading}
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
