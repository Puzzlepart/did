import React, { useRef } from 'react'
import { StyledComponent } from 'types'
import styles from './PeriodColumn.module.scss'
import { PeriodColumnTooltip } from './PeriodColumnTooltip'
import { IPeriodColumnProps } from './types'
import { usePeriodColumn } from './usePeriodColumn'

/**
 * @category SummaryView
 */
export const PeriodColumn: StyledComponent<IPeriodColumnProps> = (props) => {
  const target = useRef()
  const hours = usePeriodColumn(props)
  if (hours.total === null) return null
  return (
    <PeriodColumnTooltip {...props} hours={hours}>
      <div className={PeriodColumn.className}>
        <div ref={target}>{hours.total.toFixed(0)}</div>
      </div>
    </PeriodColumnTooltip>
  )
}

PeriodColumn.displayName = 'PeriodColumn'
PeriodColumn.className = styles.periodColumn
