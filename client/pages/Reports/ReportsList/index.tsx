/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { List, TabComponent, UserMessage } from 'components'
import { Progress } from 'components/Progress'
import $date from 'DateUtils'
import React, { useContext } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { ReportsContext } from '../context'
import commandBar from './commandBar'
import { useColumns } from './useColumns'

/**
 * Reports list
 *
 * @category Reports
 */
export const ReportsList: TabComponent = () => {
  const { t } = useTranslation()
  const context = useContext(ReportsContext)
  const columns = useColumns()
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
        items={context.state.subset}
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
        commandBar={commandBar({ ...context, columns })}
      />
      <UserMessage
        hidden={
          !isEmpty(context.state.data.timeEntries) ||
          context.state.loading ||
          !context.state.preset
        }
        text={t('reports.noEntriesText')}
      />
    </div>
  )
}
