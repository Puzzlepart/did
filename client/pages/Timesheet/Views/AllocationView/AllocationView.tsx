import { UserMessage } from 'components'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../../context'
import { TimesheetViewComponent } from '../types'
import styles from './AllocationView.module.scss'
import { PieChartContainer } from './PieChartContainer'
import { useChartConfig } from './useChartConfig'
import { useChartData } from './useChartData'

/**
 * @category Timesheet
 */
export const AllocationView: TimesheetViewComponent = () => {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  const container = useRef<HTMLDivElement>(null)
  const charts = useChartConfig()
  const data = useChartData(charts, container.current)

  if (!state.loading && state.selectedPeriod?.totalDuration === 0) {
    return (
      <div className={AllocationView.className} ref={container}>
        <UserMessage text={t('timesheet.allocation.noDataText')} />
      </div>
    )
  }

  return (
    <div className={AllocationView.className} ref={container}>
      {charts.map((c) => (
        <PieChartContainer
          key={c.key}
          chart={c}
          entries={data[c.key]}
          container={container.current}
        />
      ))}
    </div>
  )
}

AllocationView.id = 'allocation'
AllocationView.displayName = 'AllocationView'
AllocationView.className = styles.allocationView
