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
export const ProjectLink: ReusableComponent<IProjectLinkProps> = (props) => {
  const iconName = props.icon ?? props.project?.icon
  const to = `/projects/search/${props.project?.tag}`.toLowerCase()
  return (
    <div className={styles.root}>
      <Icon className={styles.icon} iconName={iconName} />
      <Link
        className={styles.link}
        to={to}
        onClick={() => props.onClick && props.onClick(null)}
      >
        <span>{props.text ?? props.project?.name}</span>
      </Link>
    </div>
  )
}
