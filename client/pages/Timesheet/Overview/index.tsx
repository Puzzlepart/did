/* eslint-disable tsdoc/syntax */
import { EventList, FlexiblePivotItem } from 'components'
import { config } from 'package'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { TimesheetContext } from '../context'
import styles from './Overview.module.scss'
import { useAdditionalColumns } from './useAdditionalColumns'
import { useGroups } from './useGroups'

/**
 * @category Timesheet
 */
export const Overview: FlexiblePivotItem = () => {
  const { loading, error, selectedPeriod } = useContext(TimesheetContext)
  const additionalColumns = useAdditionalColumns()
  const groups = useGroups()
  const className = [styles.root]
  if (isMobile) className.push(styles.mobile)
  return (
    <div className={className.join(' ')}>
      <EventList
        hidden={!!error}
        enableShimmer={!!loading}
        items={selectedPeriod?.getEvents()}
        showEmptyDays={true}
        dateFormat={config.app.TIMESHEET_OVERVIEW_TIME_FORMAT}
        listGroupProps={groups}
        additionalColumns={additionalColumns}
      />
    </div>
  )
}
