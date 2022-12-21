import { createAction } from '@reduxjs/toolkit'
import { OutlookCategory, Project } from 'types'
import { ProjectsTab } from '../types'

interface IProjectsData {
  projects: Project[]
  outlookCategories: OutlookCategory[]
}

export const DATA_UPDATED = createAction<{
  data: IProjectsData
  error: any
  loading: boolean
}>('DATA_UPDATED')
export const SET_SELECTED_PROJECT = createAction<{ project: Project }>(
  'SET_SELECTED_PROJECT'
)
export const CHANGE_TAB = createAction<{ tab: ProjectsTab }>('CHANGE_TAB')
