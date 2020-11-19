import { QueryResult } from '@apollo/client'
import { History } from 'history'
import { Project } from 'types'
import { find } from 'underscore'
import { IProjectsParams, IProjectsState, ProjectsQueryResult, ProjectsView } from './types'

export type ProjectsAction =
  | {
      type: 'DATA_UPDATED'
      query: QueryResult<ProjectsQueryResult>
      params: IProjectsParams
    }
  | {
      type: 'SET_SELECTED_PROJECT'
      project: Project
    }
  | {
      type: 'CHANGE_VIEW'
      view: ProjectsView
    }
  | {
      type: 'CHANGE_DETAILS_TAB'
      detailsTab: string
    }

/**
 * Update history
 *
 * @param {IProjectsState} state State
 * @param {History} history History
 * @param {number} delay Delay in ms
 */
const updateHistory = (state: IProjectsState, history: History, delay: number = 250) => {
  const paths = [state.view, state.selected?.id, state.detailsTab]
  const path = `/${['projects', ...paths].filter((p) => p).join('/')}`.toLowerCase()
  setTimeout(() => history.push(path), delay)
}

/**
 * Reducer for Projects
 *
 * @param {IProjectsState} state State
 * @param {ProjectsAction} action Action
 */
export default (history: History) => (state: IProjectsState, action: ProjectsAction): IProjectsState => {
  const newState: IProjectsState = { ...state }
  switch (action.type) {
    case 'DATA_UPDATED':
      {
        const { query } = action
        if (query.data) {
          newState.outlookCategories = query.data.outlookCategories
          newState.projects = query.data.projects.map((p) => ({
            ...p,
            outlookCategory: find(newState.outlookCategories, (c) => c.displayName === p.id)
          }))
          newState.selected = find(
            newState.projects,
            (p) => JSON.stringify(action.params).toLowerCase().indexOf(p.id.toLowerCase()) !== -1
          )
        }
      }
      break

    case 'SET_SELECTED_PROJECT':
      {
        newState.selected = action.project
      }
      break

    case 'CHANGE_VIEW':
      {
        newState.view = action.view
        newState.selected = null
      }
      break

    case 'CHANGE_DETAILS_TAB':
      {
        newState.detailsTab = action.detailsTab
      }
      break

    default:
      throw new Error()
  }
  updateHistory(newState, history)
  return newState
}
