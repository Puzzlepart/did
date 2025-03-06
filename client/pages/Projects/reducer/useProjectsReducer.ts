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
  PROJECT_DELETE_SUCCESS,
  SET_SELECTED_PROJECT
} from './actions'
import { Project } from 'types'
import { current } from '@reduxjs/toolkit'

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
            outlookCategory: _.find(state.outlookCategories, (c) =>
              fuzzyStringEqual(c.displayName, p.tag)
            ),
            extensions: tryParseJson(p.extensions as string, {})
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
        state.selected =
          typeof payload === 'string'
            ? _.find(current(state).projects, ({ tag }) =>
                fuzzyStringEqual(tag, payload)
              )
            : (payload as Project)
      })
      .addCase(OPEN_EDIT_PANEL, (state, { payload }) => {
        state.editProject = payload
      })
      .addCase(CLOSE_EDIT_PANEL, (state) => {
        state.editProject = null
      })
      .addCase(PROJECT_DELETE_SUCCESS, (state) => {
        state.selected = null
        document.location.replace('/projects')
      })
  )
}
