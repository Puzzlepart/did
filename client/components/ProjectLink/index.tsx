/* eslint-disable tsdoc/syntax */
import { Icon } from 'office-ui-fabric-react'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProjectLink.module.scss'
import { IProjectLinkProps } from './types'

/**
 * Renders a `<Link />` from `react-router-dom` that
 * navigates to the specified project
 *
 * @category Function Component
 */
export const ProjectLink: React.FC<IProjectLinkProps> = (props) => (
  <Link
    className={styles.root}
    to={`/projects/search/${props.project?.tag}`.toLowerCase()}>
    {props.icon && <Icon className={styles.icon} iconName={props.icon} />}
    <span>{props.text || props.project?.name}</span>
  </Link>
)
