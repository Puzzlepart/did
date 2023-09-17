import { Icon } from '@fluentui/react'
import { Button } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React from 'react'
import { Link } from 'react-router-dom'
import { createRouterLink } from 'utils'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import styles from './ProjectLink.module.scss'
import { IProjectLinkProps } from './types'

/**
 * Renders a `<Link />` from `react-router-dom` that
 * navigates to the specified project
 *
 * @category Reusable Component
 */
export const ProjectLink: ReusableComponent<IProjectLinkProps> = (props) => {
  const to = createRouterLink(props.linkTemplate, {
    tag: props.project.tag.split(' ').join('_')
  })
  switch (props.appearance) {
    case 'button': {
      return (
        <Button
          appearance='transparent'
          icon={icon(props.icon)}
          onClick={() => {
            window.open(to, props.target)
          }}
        >
          <span>{props.text}</span>
        </Button>
      )
    }
    default: {
      return (
        <div className={ProjectLink.className}>
          <Icon className={styles.icon} iconName={props.project?.icon} />
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
  }
}

ProjectLink.displayName = 'ProjectLink'
ProjectLink.className = styles.projectLink
ProjectLink.defaultProps = {
  appearance: 'default',
  target: '_self',
  linkTemplate: '/projects/{{tag}}'
}
