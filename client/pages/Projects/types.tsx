import { ApolloError } from '@apollo/client'
import { OutlookCategory, Project } from 'types'

/**
 * @category Projects
 */
export interface IProjectsUrlParameters {
  projectKey: string
  currentView: ProjectsView
}

/**
 * @ignore
 */
export type ProjectsView = 'search' | 'my' | 'new'

/**
 * @category Projects
 */
export interface IProjectsState {
  view?: ProjectsView
  selected?: Project
  projects?: Project[]
  outlookCategories?: OutlookCategory[]
  error?: ApolloError
}
