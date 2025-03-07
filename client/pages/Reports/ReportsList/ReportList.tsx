import { CheckboxVisibility } from '@fluentui/react'
import { List } from 'components'
import { Progress } from 'components/Progress'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { SET_FILTER_STATE } from '../reducer/actions'
import styles from './ReportsList.module.scss'
import { SaveFilterForm } from './SaveFilterForm'
import { useReportsList } from './useReportsList'

/**
 * Reports list
 *
 * @category Reports
 */
export const ReportsList: TabComponent = () => {
  const {
    t,
    context,
    columns,
    menuItems,
    createPlaceholder,
    createContentAfter
  } = useReportsList()
  return (
    <div className={ReportsList.className}>
      {context.state.loading && (
        <Progress
          className={styles.progress}
          text={t('reports.generatingReportProgressText')}
        />
      )}
      <List
        enableShimmer={context.state.loading}
        checkboxVisibility={CheckboxVisibility.always}
        items={context.state.data.timeEntries}
        columns={columns}
        menuItems={menuItems}
        exportFileName={context.queryPreset?.exportFileName}
        filterValues={context.state?.activeFilter?.values}
        onFilter={(state) => context.dispatch(SET_FILTER_STATE(state))}
        filterPanel={{
          headerElements: <SaveFilterForm />
        }}
        searchBox={{
          fullWidth: true,
          persist: true,
          hidden: context.state.loading,
          placeholder: createPlaceholder,
          contentAfter: createContentAfter
        }}
        enableViewColumnsEdit
        persistViewColumns={ReportsList.displayName}
      />
    </div>
  )
}

ReportsList.displayName = 'ReportsList'
ReportsList.className = styles.reportList
