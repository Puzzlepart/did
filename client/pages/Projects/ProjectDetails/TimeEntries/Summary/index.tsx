import DateUtils from 'DateUtils'
import React, { FunctionComponent } from 'react'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { getSummary } from './getSummary'
import styles from './Summary.module.scss'
import { ISummaryProps } from './types'

export const Summary: FunctionComponent<ISummaryProps> = ({ timeentries }: ISummaryProps) => {
  const { t } = useTranslation()
  const items = getSummary(timeentries, t)
  return (
    <FadeIn className={styles.root}>
      {items.map(({ label, value }, idx) => (
        <div key={idx} className={styles.item}>
          <div className={styles.value}>{DateUtils.getDurationString(value, t)}</div>
          <div className={styles.label}>{label}</div>
        </div>
      ))}
    </FadeIn>
  )
}
