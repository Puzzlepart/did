/* eslint-disable tsdoc/syntax */
import { List, TabComponent } from 'components'
import React from 'react'
import styles from './SummaryView.module.scss'
import { useSummaryView } from './useSummaryView'

/**
 * @category Timesheet
 */
export const SummaryView: TabComponent = () => {
  const props = useSummaryView()

  return (
    <div className={styles.root}>
      <List {...props} />
    </div>
  )
}
