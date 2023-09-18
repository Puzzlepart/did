import { List, UserMessage } from 'components'
import { Progress } from 'components/Progress'
import { TabComponent } from 'components/Tabs'
import React, { useContext } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { ReportsContext } from '../context'
import { useSummaryView } from './hooks/useSummaryView'
import styles from './SummaryView.module.scss'

/**
 * @category Function Component
 */
export const SummaryView: TabComponent = () => {
  const { t } = useTranslation()
  const context = useContext(ReportsContext)
  const { state, rows, columns } = useSummaryView()
  return (
    <div className={SummaryView.className}>
      <div className={styles.container}>
        {context.state.loading && (
          <Progress text={t('reports.generatingReportProgressText')} />
        )}
        <List
          hidden={!state.loading && _.isEmpty(rows)}
          enableShimmer={state.loading}
          columns={columns}
          items={rows}
          height={isBrowser && window.innerHeight - 200}
          columnHeaderProps={{
            className: styles.columnHeader
          }}
        />
        <UserMessage
          hidden={!_.isEmpty(rows) || state.loading}
          text={t('admin.noTimeEntriesText')}
        />
      </div>
    </div>
  )
}

SummaryView.displayName = 'SummaryView'
SummaryView.className = styles.summaryView
