import { CheckboxVisibility } from '@fluentui/react'
import { List, UserMessage } from 'components'
import { Progress } from 'components/Progress'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import _ from 'underscore'
import { SET_FILTER_STATE } from '../reducer/actions'
import { SaveFilterForm } from './SaveFilterForm'
import { useReportsList } from './useReportsList'
import styles from './ReportsList.module.scss'

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
      />
      {_.isEmpty(context.state.data.timeEntries) &&
        !context.state.loading &&
        context.queryPreset && (
          <UserMessage
            text={t('reports.noEntriesText', context.queryPreset)}
            style={{ marginTop: -15 }}
          />
        )}
    </div>
  )
}

ReportsList.displayName = 'ReportsList'
ReportsList.className = styles.reportList
