import { createReducer } from '@reduxjs/toolkit'
import copy from 'fast-copy'
import _ from 'underscore'
import { IProjectsUrlParameters } from '../types'
import { CHANGE_TAB, DATA_UPDATED, SET_SELECTED_PROJECT } from './actions'
import createInitialState from './initState'

/**
 * Create reducer for `<Projects />` using `@reduxjs/toolkit`.
 */
export default (urlParameters: IProjectsUrlParameters) =>
  createReducer(createInitialState(urlParameters), (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
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
      })
      .addCase(SET_SELECTED_PROJECT, (state, { payload }) => {
        state.selected = payload.project
      })
      .addCase(CHANGE_TAB, (state, { payload }) => {
        state.currentTab = payload.tab
        state.selected = null
      })
  )

export * from './useProjectsReducer'
