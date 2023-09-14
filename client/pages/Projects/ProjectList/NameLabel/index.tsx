import { ProjectLink } from 'components/ProjectLink'
import React from 'react'
import { StyledComponent } from 'types'
import styles from './NameLabel.module.scss'
import { INameLabelProps } from './types'

export const NameLabel: StyledComponent<INameLabelProps> = (props) => {
  return (
    <div className={NameLabel.className}>
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

NameLabel.displayName = 'NameLabel'
NameLabel.className = styles.nameLabel
