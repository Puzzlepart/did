import { stringIsNullOrEmpty } from '@pnp/common'
import { EntityLabel, ProjectLink } from 'components'
import { Icon } from '@fluentui/react-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject as Label } from 'types'
import { isEmpty } from 'underscore'
import styles from './ProjectTooltip.module.scss'
import { IProjectTooltipProps } from './types'

export const ProjectTooltipContent: React.FC<IProjectTooltipProps> = ({
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
        <p hidden={stringIsNullOrEmpty(project.description)}>
          {project.description}
        </p>
      </div>
      {!isEmpty(project.labels) && (
        <div className={styles.labels}>
          {(project.labels as Label[]).map((label, index) => (
            <EntityLabel key={index} label={label} />
          ))}
        </div>
      )}
      <div className={styles.footer}>
        <div className={styles.link}>
          <ProjectLink
            project={project}
            text={t('projects.navigateText')}
            icon='NavigateForward'
          />
        </div>
        <div className={styles.tag}>
          <span>{project.tag}</span>
        </div>
      </div>
    </div>
  )
}
