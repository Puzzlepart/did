/* eslint-disable tsdoc/syntax */
/* eslint-disable unicorn/no-array-reduce */
import { List, TabComponent } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../context'
import { createColumns } from './createColumns'
import { generateRows } from './generateRows'
import { generateTotalRow } from './generateTotalRow'
import styles from './SummaryView.module.scss'

/**
 * @category Timesheet
 */
export const SummaryView: TabComponent = () => {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  const columns = createColumns(state.scope)
  const events = state.selectedPeriod?.getEvents(false) || []
  const items = [
    ...generateRows(events, columns),
    generateTotalRow(events, columns, t('common.sumLabel'))
  ]

  return (
    <div key={`summary_${state.selectedPeriod?.id}`} className={styles.root}>
      <List items={items} columns={columns} enableShimmer={!!state?.loading} />
    </div>
  )
}
