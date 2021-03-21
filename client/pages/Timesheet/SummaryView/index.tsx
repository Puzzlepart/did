/* eslint-disable tsdoc/syntax */
/* eslint-disable unicorn/no-array-reduce */
import { List, TabComponent } from 'components'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TimesheetContext } from '../context'
import { createColumns } from './createColumns'
import { generateRows } from './generateRows'
import { generateTotalRow } from './generateTotalRow'
import styles from './SummaryView.module.scss'

/**
 * @category Timesheet
 */
export const SummaryView: TabComponent = () => {
  const { t } = useTranslation()
  const context = useContext(TimesheetContext)
  const columns = createColumns(context.scope)
  const events = context.selectedPeriod?.getEvents(false) || []
  const items = [
    ...generateRows(events, columns),
    generateTotalRow(events, columns, t('common.sumLabel'))
  ]

  return (
    <div key={`summary_${context.selectedPeriod?.id}`} className={styles.root}>
      <List
        items={items}
        columns={columns}
        enableShimmer={!!context?.loading}
      />
    </div>
  )
}
