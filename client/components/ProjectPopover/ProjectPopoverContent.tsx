import { Icon } from '@fluentui/react'
import { Caption2, Caption2Strong } from '@fluentui/react-components'
import { EntityLabel, ProjectTag } from 'components'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { LabelObject, StyledComponent } from 'types'
import _ from 'underscore'
import styles from './ProjectTooltip.module.scss'
import { IProjectPopoverProps } from './types'

export const ProjectPopoverContent: StyledComponent<IProjectPopoverProps> = ({
  project
}) => {
  return (
    <div className={ProjectPopoverContent.className}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <Icon iconName={project.icon} styles={{ root: { fontSize: 28 } }} />
          </div>
          <div className={styles.title}>
            <span>{project.name}</span>
            {project.customer && (
              <div className={styles.subTitle}>
                <Caption2Strong>for {project.customer.name}</Caption2Strong>
              </div>
            )}
          </div>
          <ProjectTag project={project} />
        </div>
        <div className={styles.description}>
          <Caption2>
            <ReactMarkdown>{project.description}</ReactMarkdown>
          </Caption2>
        </div>
        {!_.isEmpty(project.labels) && (
          <div className={styles.labels}>
            {(project.labels as LabelObject[]).map((label, index) => (
              <EntityLabel key={index} label={label} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

ProjectPopoverContent.displayName = 'ProjectPopoverContent'
ProjectPopoverContent.className = styles.projectTooltip
