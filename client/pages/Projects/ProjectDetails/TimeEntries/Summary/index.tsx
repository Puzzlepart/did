import React, { FunctionComponent, useMemo } from 'react'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { getSummary } from '../../utils'
import styles from './Summary.module.scss'
import { ISummaryProps } from './types'

export const Summary: FunctionComponent<ISummaryProps> = ({ timeentries }: ISummaryProps) => {
  const { t } = useTranslation()
  const summary = useMemo(() => getSummary(timeentries, t), [timeentries])
  return (
    <FadeIn className={styles.root}>
      {summary.map(({ label, value }, idx) => (
        <div key={idx} className={styles.item}>
          <div className={styles.value}>{value}</div>
          <div className={styles.label}>{label}</div>
        </div>
      ))}
    </FadeIn>
  )
}
