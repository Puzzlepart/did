/* eslint-disable tsdoc/syntax */
import { TooltipHost } from '@fluentui/react'
import React, { useRef } from 'react'
import styles from './PeriodColumn.module.scss'
import { PeriodColumnTooltip } from './PeriodColumnTooltip'
import { IPeriodColumnProps } from './types'
import { usePeriodColumn } from './usePeriodColumn'

/**
 * @category SummaryView
 */
export const PeriodColumn: React.FC<IPeriodColumnProps> = (props) => {
  const target = useRef()
  const hours = usePeriodColumn(props)
  if (hours.total === null) return null

  return (
    <TooltipHost
      calloutProps={{
        calloutMaxWidth: 420,
        target
      }}
      tooltipProps={{
        onRenderContent: () => <PeriodColumnTooltip {...props} hours={hours} />
      }}
    >
      <div className={styles.root}>
        <div ref={target}>{hours.total.toFixed(0)}</div>
      </div>
    </TooltipHost>
  )
}

export * from './types'
