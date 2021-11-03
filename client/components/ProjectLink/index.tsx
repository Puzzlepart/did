/* eslint-disable tsdoc/syntax */
import { Icon } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProjectLink.module.scss'
import { IProjectLinkProps } from './types'

/**
 * Renders a `<Link />` from `react-router-dom` that
 * navigates to the specified project
 *
 * @category Reusable Component
 */
export const ProjectLink: ReusableComponent<IProjectLinkProps> = (props) => (
  <Link
    className={styles.root}
    to={`/projects/search/${props.project?.tag}`.toLowerCase()}
  >
    {props.icon && <Icon className={styles.icon} iconName={props.icon} />}
    <span>{props.text || props.project?.name}</span>
  </Link>
)
