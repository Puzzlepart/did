import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ProjectDetails.module.scss'
import { ProjectDetailsContext } from './types'
import { getSummary } from './utils'

export const Summary = () => {
    const { t } = useTranslation('common')
    const context = useContext(ProjectDetailsContext)
    const summary = useMemo(() => getSummary(context.timeentries, t), [context.timeentries])
    return (
        <div className={styles.summary}>
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