/* eslint-disable tsdoc/syntax */
import { TooltipHost } from 'office-ui-fabric-react'
import React, { useRef } from 'react'
import { IWeekColumnProps } from './types'
import { useWeekColumn } from './useWeekColumn'
import styles from './WeekColumn.module.scss'
import { WeekColumnTooltip } from './WeekColumnTooltip'

/**
 * @category SummaryView
 */
export const WeekColumn: React.FC<IWeekColumnProps> = (props) => {
  const target = useRef()
  const hours = useWeekColumn(props)
  if (hours.total === null) return null

  return (
    <TooltipHost
      calloutProps={{
        calloutMaxWidth: 420,
        target
      }}
      tooltipProps={{
        onRenderContent: () => <WeekColumnTooltip {...props} hours={hours} />
      }}>
      <div className={styles.root}>
        <div ref={target}>{hours.total.toFixed(0)}</div>
      </div>
    </TooltipHost>
  )
}

export * from './types'
