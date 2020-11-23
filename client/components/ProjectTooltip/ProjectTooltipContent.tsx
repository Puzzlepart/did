import { stringIsNullOrEmpty } from '@pnp/common'
import { EntityLabel } from 'components'
import React, { FunctionComponent } from 'react'
import { isEmpty } from 'underscore'
import styles from './ProjectTooltip.module.scss'
import { IProjectTooltipProps } from './types'

export const ProjectTooltipContent: FunctionComponent<IProjectTooltipProps> = ({ project }: IProjectTooltipProps) => {
   return (
    <div className={styles.root}>
      <div className={styles.title}>
        <span>{project.name}</span>
      </div>
      <div className={styles.subTitle}>
        <span>for {project.customer.name}</span>
      </div>
      <div hidden={stringIsNullOrEmpty(project.description)} className={styles.description}>
        <p>{project.description}</p>
      </div>
      {!isEmpty(project.labels) && (
        <div className={styles.labels}>
          {project.labels.map((label, idx) => (
            <EntityLabel key={idx} label={label} />
          ))}
        </div>
      )}
      <div className={styles.tag}>
        <span>{project.id}</span>
      </div>
    </div>
  )
}
