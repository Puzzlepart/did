import { ApolloError } from '@apollo/client'
import { OutlookCategory, Project } from 'types'

/**
 * @category Projects
 */
export interface IProjectsUrlParameters {
  projectKey: string
  currentTab: ProjectsTab
}

/**
 * @ignore
 */
export type ProjectsTab = 's' | 'm' | 'new'

/**
 * @category Projects
 */
export interface IProjectsState {
  currentTab?: ProjectsTab
  selected?: Project
  projects?: Project[]
  outlookCategories?: OutlookCategory[]
  error?: ApolloError
}
