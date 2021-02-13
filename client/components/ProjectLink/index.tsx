import { Icon } from 'office-ui-fabric'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProjectLink.module.scss'
import { IProjectLinkProps } from './types'

export const ProjectLink: FunctionComponent<IProjectLinkProps> = (props: IProjectLinkProps) => (
  <Link className={styles.root} to={`/projects/search/${props.project?.tag}`}>
    {props.icon && <Icon className={styles.icon} iconName={props.icon} />}
    <span>{props.text || props.project?.name}</span>
  </Link>
)
