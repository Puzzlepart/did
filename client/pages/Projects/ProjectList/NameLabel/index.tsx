import { ProjectLink } from 'components/ProjectLink'
import React, { FC } from 'react'
import styles from './NameLabel.module.scss'
import { INameLabelProps } from './types'

export const NameLabel: FC<INameLabelProps> = (props) => {
  return (
    <div className={styles.root}>
      {props.renderLink ? (
        <ProjectLink project={props.project} onClick={props.onClick} />
      ) : (
        <div>
          <span>{props.project.name}</span>
        </div>
      )}
    </div>
  )
}
