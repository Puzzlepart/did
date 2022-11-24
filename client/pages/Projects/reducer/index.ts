import { createReducer } from '@reduxjs/toolkit'
import copy from 'fast-copy'
import _ from 'underscore'
import { IProjectsUrlParameters } from '../types'
import { CHANGE_VIEW, DATA_UPDATED, SET_SELECTED_PROJECT } from './actions'
import { initState } from './initState'

/**
 * Create reducer for Projects
 */
export default (urlParameters: IProjectsUrlParameters) =>
  createReducer(initState(urlParameters), {
    [DATA_UPDATED.type]: (
      state,
      { payload }: ReturnType<typeof DATA_UPDATED>
    ) => {
      if (payload.data) {
        state.outlookCategories = payload.data.outlookCategories
        state.projects = payload.data.projects.map((p) => {
          const _p = copy(p)
          _p.outlookCategory = _.find(
            state.outlookCategories,
            (c) => c.displayName === p.tag
          )
          return _p
        })
        state.selected = _.find(
          state.projects,
          (p) =>
            p.tag?.toLowerCase() === urlParameters?.projectKey?.toLowerCase()
        )
      }
      state.error = payload.error
    },

    [SET_SELECTED_PROJECT.type]: (
      state,
      { payload }: ReturnType<typeof SET_SELECTED_PROJECT>
    ) => {
      state.selected = payload.project
    },

    [CHANGE_VIEW.type]: (
      state,
      { payload }: ReturnType<typeof CHANGE_VIEW>
    ) => {
      state.view = payload.view
      state.selected = null
    }
  })

export * from './initState'
export * from './useProjectsReducer'
