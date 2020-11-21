import React, { FunctionComponent, useMemo } from 'react'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { getSummary } from '../utils'
import styles from './TimeEntries.module.scss'
import { ISummaryProps } from './types'

export const Summary: FunctionComponent<ISummaryProps> = ({ timeentries }: ISummaryProps) => {
  const { t } = useTranslation()
  const summary = useMemo(() => getSummary(timeentries, t), [timeentries])
  return (
    <FadeIn className={styles.summary}>
      <ul>
        {summary.map(({ label, value }, idx) => (
          <li key={idx}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
          </li>
        ))}
      </ul>
    </FadeIn>
  )
}
