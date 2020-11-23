import { Icon } from 'office-ui-fabric'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { IProjectLinkProps } from './types'
import styles from './ProjectLink.module.scss'

export const ProjectLink: React.FunctionComponent<IProjectLinkProps> = (props: IProjectLinkProps) => (
  <Link className={styles.root} to={`/projects/search/${props.project?.id}`}>
    {props.icon && <Icon className={styles.icon} iconName={props.icon} />}
    <span>{props.text || props.project?.name}</span>
  </Link>
)
