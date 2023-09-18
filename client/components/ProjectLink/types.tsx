import { ButtonProps } from '@fluentui/react-components'
import { HTMLProps } from 'react'
import { Project } from 'types'
import { FluentIconName } from 'utils/getFluentIcon'

/**
 * Props for the ProjectLink component.
 */
export interface IProjectLinkProps extends HTMLProps<HTMLDivElement> {
  /**
   * The project to link to.
   */
  project: Project

  /**
   * The text to display in the link.
   */
  text?: string

  /**
   * The name of the icon to display next to the link text.
   */
  icon?: FluentIconName

  /**
   * The appearance of the link.
   */
  appearance?: ButtonProps['appearance'] | 'link'

  /**
   * Link template to use when generating the link.
   */
  linkTemplate?: string
}
