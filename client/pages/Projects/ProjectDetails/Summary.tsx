import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ProjectDetails.module.scss'
import { ProjectDetailsContext } from './ProjectDetailsContext'
import { getSummary } from './utils'

export const Summary = () => {
  const { t } = useTranslation()
  const { timeentries } = useContext(ProjectDetailsContext)
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
