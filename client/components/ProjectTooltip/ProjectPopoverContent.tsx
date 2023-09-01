import { Icon } from '@fluentui/react'
import { Caption2, Caption2Strong } from '@fluentui/react-components'
import { EntityLabel, ProjectLink } from 'components'
import React, { FC } from 'react'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { useTranslation } from 'react-i18next'
import { LabelObject } from 'types'
import _ from 'underscore'
import styles from './ProjectTooltip.module.scss'
import { IProjectPopoverProps } from './types'

export const ProjectPopoverContent: FC<IProjectPopoverProps> = ({
  project
}) => {
  const { t } = useTranslation()
  // eslint-disable-next-line no-console
  console.log(project)
  return (
    <FadeIn>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              <Icon
                iconName={project.icon}
                styles={{ root: { fontSize: 24 } }}
              />
            </div>
            <div className={styles.title}>
              <span>{project.name}</span>
              {project.customer && (
                <div className={styles.subTitle}>
                  <span>for {project.customer.name}</span>
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
                appearance='button'
                project={project}
                text={t('projects.navigateText')}
                icon='FastForward'
              />
            </div>
          )}
          <Caption2Strong className={styles.tag}>{project.tag}</Caption2Strong>
        </div>
      </div>
    </FadeIn>
  )
}
