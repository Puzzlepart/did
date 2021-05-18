/* eslint-disable tsdoc/syntax */
import { ApolloError } from '@apollo/client'
import { OutlookCategory, Project } from 'types'

/**
 * @category Projects
 */
export interface IProjectsParameters {
  key: string
  view: ProjectsView
  detailsTab: string
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
  detailsTab?: string
  selected?: Project
  projects?: Project[]
  outlookCategories?: OutlookCategory[]
  error?: ApolloError
}
