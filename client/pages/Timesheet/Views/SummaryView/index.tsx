import { List } from 'components'
import React from 'react'
import { TimesheetViewComponent } from '../types'
import styles from './SummaryView.module.scss'
import { useSummaryView } from './useSummaryView'

/**
 * @category Timesheet
 */
export const SummaryView: TimesheetViewComponent = () => {
  const props = useSummaryView()
  return (
    <div className={SummaryView.className}>
      <List {...props} />
    </div>
  )
}

SummaryView.id = 'summary'
SummaryView.displayName = 'Timesheet.SummaryView'
SummaryView.className = styles.summaryView
