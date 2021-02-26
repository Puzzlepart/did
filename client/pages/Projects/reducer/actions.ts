import { QueryResult } from '@apollo/client'
import { createAction } from '@reduxjs/toolkit'
import { Project } from 'types'
import { ProjectsQueryResult, ProjectsView } from '../types'

export const DATA_UPDATED = createAction<{ query: QueryResult<ProjectsQueryResult> }>(
  'DATA_UPDATED'
)
export const SET_SELECTED_PROJECT = createAction<{ project: Project }>('SET_SELECTED_PROJECT')
export const CHANGE_VIEW = createAction<{ view: ProjectsView }>('CHANGE_VIEW')
export const CHANGE_DETAILS_TAB = createAction<{ detailsTab: string }>('CHANGE_DETAILS_TAB')
