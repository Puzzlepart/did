import { createReducer } from '@reduxjs/toolkit'
import copy from 'fast-copy'
import { find } from 'underscore'
import { CHANGE_DETAILS_TAB, CHANGE_VIEW, DATA_UPDATED, SET_SELECTED_PROJECT } from './actions'
import { IProjectsReducerParams } from './types'
import { initState } from './initState'

/**
 * Create reducer for Projects
 */
export default ({ url: params }: IProjectsReducerParams) =>
  createReducer(initState(params), {
    [DATA_UPDATED.type]: (state, { payload }: ReturnType<typeof DATA_UPDATED>) => {
      if (payload.data) {
        state.outlookCategories = payload.data.outlookCategories
        state.projects = payload.data.projects.map((p) => {
          const _p = copy(p)
          _p.outlookCategory = find(state.outlookCategories, (c) => c.displayName === p.tag)
          return _p
        })
        state.selected = find(
          state.projects,
          (p) => JSON.stringify(params).toLowerCase().indexOf(p.tag.toLowerCase()) !== -1
        )
      }
      state.error = payload.error
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

export * from './initState'
export * from './useProjectsReducer'
