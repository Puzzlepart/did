import { ApolloError } from '@apollo/client'
import { OutlookCategory, Project } from 'types'

/**
 * @category Projects
 */
export interface IProjectsUrlParameters {
  /**
   * The currently selected tab or project tag.
   */
  currentTab: ProjectsTab

  /**
   * The currently selected details tab.
   */
  detailsTab: string
}

/**
 * @ignore
 */
export type ProjectsTab = 's' | 'm' | 'new'

/**
 * Represents the state of the Projects component.
 *
 * @category Projects
 */
export interface IProjectsState {
  /**
   * The currently selected project.
   */
  selected?: Project

  /**
   * The list of projects.
   */
  projects?: Project[]

  /**
   * The project being edited.
   */
  editProject?: Project

  /**
   * The list of Outlook categories for the current user.
   */
  outlookCategories?: OutlookCategory[]

  /**
   * The error that occurred while fetching or updating data.
   */
  error?: ApolloError
}
