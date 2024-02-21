import { HTMLProps } from 'react'
import { Project } from 'types'

/**
 * Props for the ProjectLink component.
 */
export interface IProjectTagProps extends HTMLProps<HTMLDivElement> {
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
}
