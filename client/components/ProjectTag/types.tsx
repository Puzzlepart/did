import { InteractionTagProps } from '@fluentui/react-tags-preview'
import { HTMLProps } from 'react'
import { Project } from 'types'

/**
 * Props for the ProjectLink component.
 */
export interface IProjectTagProps
  extends Omit<HTMLProps<HTMLDivElement>, 'size'>,
    Pick<InteractionTagProps, 'size'> {
  /**
   * The project to link to.
   */
  project: Project

  /**
   * Does the user have a Outlook category for this project.
   */
  hasOutlookCategory?: boolean

  /**
   * Should the user be able to favorite this project, meaning
   * adding the project tag as a Outlook category.
   */
  enableFavoriting?: boolean

  /**
   * Display the project icon.
   */
  displayIcon?: boolean

  /**
   * The href for the Outlook categories page.
   */
  outlookCategoriesHref?: string
}
