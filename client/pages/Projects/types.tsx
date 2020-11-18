import { OutlookCategory, Project } from 'types'

export interface IProjectsParams {
  key: string
  view: string
  detailsTab: string
}

export interface IProjectsState {
  selected?: Project;
  projects?: Project[];
  outlookCategories?: OutlookCategory[]
}

export type ProjectsQueryResult = { projects: Project[]; outlookCategories: OutlookCategory[] }