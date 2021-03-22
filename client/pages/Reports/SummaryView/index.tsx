/* eslint-disable tsdoc/syntax */
import { List, TabComponent, UserMessage } from 'components'
import { Progress } from 'components/Progress'
import React, { useContext } from 'react'
import { isBrowser } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
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
    <div className={styles.root}>
      <div className={styles.container}>
        {context.state.loading && (
          <Progress
            label={t('reports.generatingReportLabel')}
            description={t('reports.generatingReportDescription')}
            iconProps={{ iconName: 'OEM' }}
          />
        )}
        <List
          hidden={!state.loading && isEmpty(rows)}
          enableShimmer={state.loading}
          columns={columns}
          items={rows}
          height={isBrowser && window.innerHeight - 200}
          headerClassName={styles.columnHeader}
        />
        <UserMessage
          hidden={!isEmpty(rows) || state.loading}
          text={t('admin.noTimeEntriesText')}
        />
      </div>
    </div>
  )
}
