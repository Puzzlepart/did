import { Icon } from '@fluentui/react'
import { Button, Caption1Strong } from '@fluentui/react-components'
import { EntityLabel } from 'components'
import { SubText } from 'components/SubText'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LabelObject } from 'types'
import _ from 'underscore'
import { getFluentIcon } from 'utils'
import styles from './ProjectTooltip.module.scss'
import { IProjectPopoverProps } from './types'

export const ProjectPopoverContent: FC<IProjectPopoverProps> = ({
  project
}) => {
  const { t } = useTranslation()
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <Icon iconName={project.icon} styles={{ root: { fontSize: 24 } }} />
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
        <SubText text={project.description} />
        {!_.isEmpty(project.labels) && (
          <div className={styles.labels}>
            {(project.labels as LabelObject[]).map((label, index) => (
              <EntityLabel key={index} label={label} />
            ))}
          </div>
        )}
        {project.tag && (
          <div className={styles.footer}>
            <Button
              appearance='transparent'
              icon={getFluentIcon('FastForward')}
              onClick={() => {
                window.open(
                  `https://app.tempo.io/secure/project-edit.jspe?projectKey=${project.tag}`
                )
              }}
            >
              <span>{t('projects.navigateText')}</span>
            </Button>
          </div>
        )}
        <Caption1Strong className={styles.tag}>{project.tag}</Caption1Strong>
      </div>
    </div>
  )
}
