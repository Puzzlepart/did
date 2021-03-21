/* eslint-disable tsdoc/syntax */
import { FlexiblePivotItem, List, UserMessage } from 'components'
import { Progress } from 'components/Progress'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import { ReportsContext } from '../context'
import { useSummaryView } from './hooks/useSummaryView'
import styles from './SummaryView.module.scss'

/**
 * @category Function Component
 */
export const SummaryView: FlexiblePivotItem = () => {
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
