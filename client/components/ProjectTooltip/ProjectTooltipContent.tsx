import { stringIsNullOrEmpty } from '@pnp/common'
import { EntityLabel, ProjectLink } from 'components'
import { Icon } from 'office-ui-fabric'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'underscore'
import styles from './ProjectTooltip.module.scss'
import { IProjectTooltipProps } from './types'

export const ProjectTooltipContent: FunctionComponent<IProjectTooltipProps> = ({
  project
}: IProjectTooltipProps) => {
  const { t } = useTranslation()
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <Icon iconName={project.icon} styles={{ root: { fontSize: 24 } }} />
        </div>
        <div className={styles.title}>
          <span>{project.name}</span>
          <div className={styles.subTitle}>
            <span>for {project.customer.name}</span>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <p hidden={stringIsNullOrEmpty(project.description)}>{project.description}</p>
      </div>
      {!isEmpty(project.labels) && (
        <div className={styles.labels}>
          {project.labels.map((label, idx) => (
            <EntityLabel key={idx} label={label} />
          ))}
        </div>
      )}
      <div className={styles.footer}>
        <div className={styles.link}>
          <ProjectLink project={project} text={t('projects.navigateText')} icon='NavigateForward' />
        </div>
        <div className={styles.tag}>
          <span>{project.id}</span>
        </div>
      </div>
    </div>
  )
}
