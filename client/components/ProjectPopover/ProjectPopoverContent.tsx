import { Icon } from '@fluentui/react'
import { Caption2, Caption2Strong } from '@fluentui/react-components'
import { EntityLabel, ProjectLink, ProjectTag } from 'components'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { LabelObject, StyledComponent } from 'types'
import _ from 'underscore'
import styles from './ProjectPopoverContent.module.scss'
import { IProjectPopoverProps } from './types'

export const ProjectPopoverContent: StyledComponent<IProjectPopoverProps> = (
  props
) => {
  return (
    <div
      className={ProjectPopoverContent.className}
      style={{ width: props.width }}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <Icon
              iconName={props.project.icon}
              styles={{ root: { fontSize: 28 } }}
            />
          </div>
          <div className={styles.title}>
            <ProjectLink
              project={props.project}
              appearance='link'
              showIcon={false}
            />
            {props.project.customer && (
              <div className={styles.subTitle}>
                <Caption2Strong>
                  for {props.project.customer.name}
                </Caption2Strong>
              </div>
            )}
          </div>
          <ProjectTag project={props.project} />
        </div>
        <div className={styles.description}>
          <Caption2>
            <ReactMarkdown>{props.project.description}</ReactMarkdown>
          </Caption2>
        </div>
        <div>{props.children}</div>
        {!_.isEmpty(props.project.labels) && (
          <div className={styles.labels}>
            {(props.project.labels as LabelObject[]).map((label, index) => (
              <EntityLabel key={index} label={label} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

ProjectPopoverContent.displayName = 'ProjectPopoverContent'
ProjectPopoverContent.className = styles.projectPopoverContent
