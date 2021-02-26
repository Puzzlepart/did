import { createAction } from '@reduxjs/toolkit'
import { OutlookCategory, Project } from 'types'
import { ProjectsView } from '../types'

interface IProjectsData {
    projects: Project[];
    outlookCategories: OutlookCategory[]
}

export const DATA_UPDATED = createAction<{ data: IProjectsData, error: any, loading: boolean }>(
    'DATA_UPDATED'
)
export const SET_SELECTED_PROJECT = createAction<{ project: Project }>('SET_SELECTED_PROJECT')
export const CHANGE_VIEW = createAction<{ view: ProjectsView }>('CHANGE_VIEW')
export const CHANGE_DETAILS_TAB = createAction<{ detailsTab: string }>('CHANGE_DETAILS_TAB')
