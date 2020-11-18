import { OutlookCategory, Project } from 'types'


export interface IProjectsParams {
  key: string
  view: ProjectsView
  detailsTab: string
}

export type ProjectsView = 'search' | 'my' | 'new'

export interface IProjectsState {
  view?: ProjectsView;
  selected?: Project;
  projects?: Project[];
  outlookCategories?: OutlookCategory[]
}

export type ProjectsQueryResult = { projects: Project[]; outlookCategories: OutlookCategory[] }