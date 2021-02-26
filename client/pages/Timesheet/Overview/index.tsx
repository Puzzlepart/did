import AppConfig from 'AppConfig'
import EventList from 'components/EventList'
import { ProgressIndicator } from 'office-ui-fabric'
import React, { FunctionComponent, useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { TimesheetContext } from '../'
import styles from './Overview.module.scss'
import { StatusBar } from './StatusBar'
import { useAdditionalColumns } from './useAdditionalColumns'
import { useGroups } from './useGroups'

export const Overview: FunctionComponent = () => {
  const { loading, error, selectedPeriod } = useContext(TimesheetContext)
  const additionalColumns = useAdditionalColumns()
  const groups = useGroups()
  const className = [styles.root]
  if (isMobile) className.push(styles.mobile)

  return (
    <div className={className.join(' ')}>
      <StatusBar />
      {loading && <ProgressIndicator {...loading} />}
      <EventList
        hidden={!!error}
        enableShimmer={!!loading}
        events={selectedPeriod?.getEvents()}
        showEmptyDays={true}
        dateFormat={AppConfig.TIMESHEET_OVERVIEW_TIME_FORMAT}
        groups={groups}
        additionalColumns={additionalColumns}
      />
    </div>
  )
}
