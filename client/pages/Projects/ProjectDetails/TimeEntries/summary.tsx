import React, { FunctionComponent, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getSummary } from '../utils'
import { ISummaryProps } from './types'
import styles from './TimeEntries.module.scss'

export const Summary: FunctionComponent<ISummaryProps> = ({ timeentries }: ISummaryProps) => {
  const { t } = useTranslation()
  const summary = useMemo(() => getSummary(timeentries, t), [timeentries])
  return (
    <div className={styles.summary} hidden={timeentries.length === 0}>
      <ul>
        {summary.map(({ label, value }, idx) => (
          <li key={idx}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
