import { CheckboxVisibility } from '@fluentui/react'
import { List, UserMessage } from 'components'
import { Progress } from 'components/Progress'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import _ from 'underscore'
import { SET_FILTER_STATE } from '../reducer/actions'
import { SaveFilterForm } from './SaveFilterForm'
import { useReportsList } from './useReportsList'

/**
 * Reports list
 *
 * @category Reports
 */
export const ReportsList: TabComponent = () => {
  const { t, context, columns, menuItems } = useReportsList()
  return (
    <div>
      {context.state.loading && (
        <Progress
          text={t('reports.generatingReportProgressText')}
          padding='10px 0 20px 18px'
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
