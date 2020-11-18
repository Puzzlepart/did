import { QueryResult } from '@apollo/client'
import { Project } from 'types'
import { find } from 'underscore'
import { IProjectsState, ProjectsQueryResult, ProjectsView } from './types'
import {History} from 'history'

export type ProjectsAction =
    {
        type: 'DATA_UPDATED'
        query: QueryResult<ProjectsQueryResult>
    }
    |
    {
        type: 'SET_SELECTED_PROJECT',
        project: Project
    }
    |
    {
        type: 'CHANGE_VIEW',
        view: ProjectsView
        history: History
    }

/**
 * Reducer for Projects
 *
 * @param {IProjectsState} state State
 * @param {ProjectsAction} action Action
 */
export default (state: IProjectsState, action: ProjectsAction): IProjectsState => {
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

        default:
            throw new Error()
    }
    return newState
}
