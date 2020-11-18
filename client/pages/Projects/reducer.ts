import { QueryResult } from '@apollo/client'
import { Project } from 'types'
import { find } from 'underscore'
import { IProjectsState, ProjectsQueryResult } from './types'

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

        default:
            throw new Error()
    }
    return newState
}
