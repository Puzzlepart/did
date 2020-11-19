import { getValue } from 'helpers'
import React, { FunctionComponent } from 'react'
import FadeIn from 'react-fade-in'
import styles from './AllocationView.module.scss'
import { ICustomTooltipProps } from './types'

export const CustomTooltip: FunctionComponent<ICustomTooltipProps> = ({
  item,
  chart
}: ICustomTooltipProps) => {
  const { data, value } = getValue<any>(item, '0.payload', {})
  if (!data) return null
  return (
    <FadeIn className={styles.tooltip}>
      <div className={styles.text}>{getValue(data, chart.textKey)}</div>
      {chart.subTextKey && (
        <div className={styles.subText}>{getValue(data, chart.subTextKey, '')}</div>
      )}
      <p className={styles.summary}>{data.description}</p>
      <p className={styles.value}>
        {value} {chart.valuePostfix}
      </p>
    </FadeIn>
  )
}
