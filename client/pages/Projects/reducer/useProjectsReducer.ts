/* eslint-disable unicorn/prevent-abbreviations */
import copy from 'fast-copy'
import { useReduxReducer } from 'hooks'
import { useParams } from 'react-router-dom'
import _ from 'underscore'
import { fuzzyStringEqual } from 'utils'
import { IProjectsState, IProjectsUrlParameters } from '../types'
import {
  CLOSE_EDIT_PANEL,
  DATA_UPDATED,
  OPEN_EDIT_PANEL,
  SET_SELECTED_PROJECT
} from './actions'

/**
 * Use Projects reducer.
 */
export function useProjectsReducer() {
  const urlParams = useParams<IProjectsUrlParameters>()
  return useReduxReducer(
    {
      projects: [],
      outlookCategories: []
    } as IProjectsState,
    (builder) =>
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
            state.selected = _.find(state.projects, ({ tag }) =>
              fuzzyStringEqual(tag, urlParams.currentTab)
            )
          }
          state.error = payload.error as any
        })
        .addCase(SET_SELECTED_PROJECT, (state, { payload }) => {
          state.selected = payload
        })
        .addCase(OPEN_EDIT_PANEL, (state, { payload }) => {
          state.editProject = payload
        })
        .addCase(CLOSE_EDIT_PANEL, (state) => {
          state.editProject = null
        })
  )
}
