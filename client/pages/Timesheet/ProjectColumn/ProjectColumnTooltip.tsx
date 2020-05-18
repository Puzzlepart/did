import { stringIsNullOrEmpty } from '@pnp/common'
import { EntityLabel } from 'components/EntityLabel'
import * as React from 'react'
import { isEmpty } from 'underscore'
import styles from './ProjectColumn.module.scss'
import { IProjectColumnTooltipProps } from './types'

/**
 * @category Timesheet
 */
export const ProjectColumnTooltip = ({ project }: IProjectColumnTooltipProps): JSX.Element => {
    return (
        <div className={styles.tooltip}>
            <div className={styles.title}><span>{project.name}</span></div>
            <div className={styles.subTitle}><span>for {project.customer.name}</span></div>
            <div hidden={stringIsNullOrEmpty(project.description)} className={styles.description}>
                <p>{project.description}</p>
            </div>
            {!isEmpty(project.labels) && (
                <div className={styles.labels}>
                    {project.labels.map((label, idx) => <EntityLabel key={idx} label={label} />)}
                </div>
            )}
            <div className={styles.tag}><span>{project.key}</span></div>
        </div>
    )
}