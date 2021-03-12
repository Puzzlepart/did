/* eslint-disable tsdoc/syntax */
import { Icon, TooltipHost } from 'office-ui-fabric-react'
import React, { FunctionComponent, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { IWeekColumnProps } from './types'
import { useWeekColumn } from './useWeekColumn'
import styles from './WeekColumn.module.scss'
import { WeekColumnTooltip } from './WeekColumnTooltip'

/**
 * @category SummaryView
 */
export const WeekColumn: FunctionComponent<IWeekColumnProps> = (
  props: IWeekColumnProps
) => {
  const { t } = useTranslation()
  const target = useRef()
  const hours = useWeekColumn(props)
  if (hours.total === null) {
    return null
  }
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
        <Icon iconName='CheckboxComposite' className={styles.checkMark} />
        <span ref={target}>
          {t('common.hoursShortFormat', { hours: hours.total.toFixed(2) })}
        </span>
      </div>
    </TooltipHost>
  )
}

export * from './types'
