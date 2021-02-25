import { QueryResult } from '@apollo/client'
import { createAction, createReducer } from '@reduxjs/toolkit'
import copy from 'fast-copy'
import { History } from 'history'
import { Project } from 'types'
import { contains, find } from 'underscore'
import { IProjectsParams, IProjectsState, ProjectsQueryResult, ProjectsView } from './types'

export const DATA_UPDATED = createAction<{ query: QueryResult<ProjectsQueryResult> }>(
  'DATA_UPDATED'
)
export const SET_SELECTED_PROJECT = createAction<{ project: Project }>('SET_SELECTED_PROJECT')
export const CHANGE_VIEW = createAction<{ view: ProjectsView }>('CHANGE_VIEW')
export const CHANGE_DETAILS_TAB = createAction<{ detailsTab: string }>('CHANGE_DETAILS_TAB')

/**
 * Initialize state
 *
 * @param {IProjectsParams} params Params
 */
export const initState = (params: IProjectsParams): IProjectsState => ({
  view: contains(['search', 'my', 'new'], params.view) ? params.view : 'search',
  detailsTab: params.detailsTab,
  projects: [],
  outlookCategories: []
})

interface ICreateReducerParams {
  params: IProjectsParams
  history: History
}

/**
 * Create reducer for Projects
 */
export default ({ params }: ICreateReducerParams) =>
  createReducer(initState(params), {
    [DATA_UPDATED.type]: (state, { payload }: ReturnType<typeof DATA_UPDATED>) => {
      if (payload.query.data) {
        state.outlookCategories = payload.query.data.outlookCategories
        state.projects = payload.query.data.projects.map((p) => {
          const _p = copy(p)
          _p.outlookCategory = find(state.outlookCategories, (c) => c.displayName === p.tag)
          return _p
        })
        state.selected = find(
          state.projects,
          (p) => JSON.stringify(params).toLowerCase().indexOf(p.tag.toLowerCase()) !== -1
        )
      }
    },

    [SET_SELECTED_PROJECT.type]: (state, { payload }: ReturnType<typeof SET_SELECTED_PROJECT>) => {
      state.selected = payload.project
    },

    [CHANGE_VIEW.type]: (state, { payload }: ReturnType<typeof CHANGE_VIEW>) => {
      state.view = payload.view
      state.selected = null
    },

    [CHANGE_DETAILS_TAB.type]: (state, { payload }: ReturnType<typeof CHANGE_DETAILS_TAB>) => {
      state.detailsTab = payload.detailsTab
    }
  })
