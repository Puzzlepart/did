/* eslint-disable react-hooks/exhaustive-deps */
import { CheckboxVisibility } from '@fluentui/react'
import { List, TabComponent, UserMessage } from 'components'
import { Progress } from 'components/Progress'
import $date from 'DateUtils'
import React, { useContext } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { ReportsContext } from '../context'
import { SET_FILTER_STATE } from '../reducer/actions'
import { SaveFilterForm } from '../SaveFilterForm'
import { useColumns } from './useColumns'
import { useCommands } from './useCommands'

/**
 * Reports list
 *
 * @category Reports
 */
export const ReportsList: TabComponent = () => {
  const { t } = useTranslation()
  const context = useContext(ReportsContext)
  const columns = useColumns()
  const commandBar = useCommands()
  return (
    <div>
      {context.state.loading && (
        <Progress
          label={t('reports.generatingReportLabel')}
          description={t('reports.generatingReportDescription')}
          iconProps={{ iconName: 'OEM' }}
        />
      )}
      <List
        enableShimmer={context.state.loading}
        checkboxVisibility={CheckboxVisibility.always}
        items={context.state.data.timeEntries}
        height={isBrowser && window.innerHeight - 200}
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
        commandBar={commandBar}
        exportFileName={context.state.preset?.exportFileName}
        filterValues={context.state?.activeFilter?.values}
        onFilter={(state) => context.dispatch(SET_FILTER_STATE(state))}
        filterPanelActions={
          <SaveFilterForm disabled={!context.state.filterState?.isFiltered} />
        }
      />
      <UserMessage
        hidden={
          !_.isEmpty(context.state.data.timeEntries) ||
          context.state.loading ||
          !context.state.preset
        }
        text={t('reports.noEntriesText')}
      />
    </div>
  )
}
