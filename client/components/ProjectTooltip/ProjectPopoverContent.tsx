import { Icon } from '@fluentui/react'
import { Caption2, Caption2Strong } from '@fluentui/react-components'
import { EntityLabel, ProjectLink } from 'components'
import React from 'react'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { useTranslation } from 'react-i18next'
import { LabelObject, StyledComponent } from 'types'
import _ from 'underscore'
import styles from './ProjectTooltip.module.scss'
import { IProjectPopoverProps } from './types'
import { Tag } from '@fluentui/react-tags-preview'

export const ProjectPopoverContent: StyledComponent<IProjectPopoverProps> = ({
  project
}) => {
  const { t } = useTranslation()
  return (
    <FadeIn>
      <div className={ProjectPopoverContent.className}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              <Icon
                iconName={project.icon}
                styles={{ root: { fontSize: 28 } }}
              />
            </div>
            <div className={styles.title}>
              <span>{project.name}</span>
              {project.customer && (
                <div className={styles.subTitle}>
                  <Caption2Strong>for {project.customer.name}</Caption2Strong>
                </div>
              )}
            </div>
          </div>
          <Caption2>{project.description}</Caption2>
          {!_.isEmpty(project.labels) && (
            <div className={styles.labels}>
              {(project.labels as LabelObject[]).map((label, index) => (
                <EntityLabel key={index} label={label} />
              ))}
            </div>
          )}
          {project.tag && (
            <div className={styles.footer}>
              <ProjectLink
                appearance='transparent'
                size='small'
                project={project}
                icon='Home'
                text={t('projects.navigateText')}
              />
            </div>
          )}
          <Tag className={styles.tag} size='extra-small'>
            {project.tag}
          </Tag>
        </div>
      </div>
    </FadeIn>
  )
}

ProjectPopoverContent.displayName = 'ProjectPopoverContent'
ProjectPopoverContent.className = styles.projectTooltip
