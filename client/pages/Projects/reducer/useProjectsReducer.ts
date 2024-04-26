/* eslint-disable unicorn/prevent-abbreviations */
import { useReduxReducer as useReducer } from 'hooks'
import { useParams } from 'react-router-dom'
import _ from 'underscore'
import { fuzzyStringEqual, tryParseJson } from 'utils'
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
  const initialState: IProjectsState = {
    projects: [],
    myProjects: [],
    outlookCategories: [],
    selected: null,
    editProject: null
  }
  return useReducer(initialState, (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
        if (payload.data) {
          state.outlookCategories = payload.data.outlookCategories
          state.projects = payload.data.projects.map((p) => ({
            ...p,
            properties: tryParseJson(p.properties as string, {}),
            outlookCategory: _.find(state.outlookCategories, (c) =>
              fuzzyStringEqual(c.displayName, p.tag)
            )
          }))
          state.myProjects = payload.data.myProjects.map((p) => p.tag)
          const selectedTag = state.selected?.tag ?? urlParams.currentTab
          if (selectedTag) {
            state.selected = _.find(state.projects, ({ tag }) =>
              fuzzyStringEqual(tag, selectedTag)
            )
          }
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
