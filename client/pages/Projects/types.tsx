import { OutlookCategory, Project } from 'types'

export interface IProjectsParams {
  key: string
  view: string
}

export type ProjectsQueryResult = { projects: Project[]; outlookCategories: OutlookCategory[] }