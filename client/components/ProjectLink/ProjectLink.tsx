import { Icon } from '@fluentui/react'
import { Button } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { createRouterLink } from 'utils'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import styles from './ProjectLink.module.scss'
import { IProjectLinkProps } from './types'
import { ConditionalWrapper } from 'components/ConditionalWrapper'
import { ProjectPopover } from 'components/ProjectPopover/ProjectPopover'

/**
 * Renders a `<Link />` or `<Button />` that navigates to the specified project.
 * Optionally, renders the link/button with a popover (`ProjectPopover`).
 *
 * @category Reusable Component
 */
export const ProjectLink: ReusableComponent<IProjectLinkProps> = (props) => {
  let element: ReactElement = null
  const to = createRouterLink(props.linkTemplate, {
    tag: props.project.tag.split(' ').join('_')
  })
  switch (props.appearance) {
    case 'link': {
      element = (
        <div className={ProjectLink.className}>
          {props.showIcon && (
            <Icon className={styles.icon} iconName={props.project?.icon} />
          )}
          <Link
            className={styles.link}
            to={to}
            onClick={() => {
              if (props.onClick) {
                props.onClick(null)
              }
            }}
          >
            <span>{props.text ?? props.project?.name}</span>
          </Link>
        </div>
      )
      break
    }
    default: {
      element = (
        <Button
          appearance={props.appearance}
          icon={icon(props.icon)}
          onClick={() => {
            window.open(to, props.target)
          }}
          size={props.size}
        >
          <span>{props.text}</span>
        </Button>
      )
      break
    }
  }

  return (
    <ConditionalWrapper
      condition={props.withPopover}
      wrapper={(children) => (
        <ProjectPopover project={props.project}>{children}</ProjectPopover>
      )}
    >
      {element}
    </ConditionalWrapper>
  )
}

ProjectLink.displayName = 'ProjectLink'
ProjectLink.className = styles.projectLink
ProjectLink.defaultProps = {
  appearance: 'link',
  target: '_self',
  linkTemplate: '/projects/{{tag}}',
  showIcon: true,
  size: 'medium',
  withPopover: false
}
