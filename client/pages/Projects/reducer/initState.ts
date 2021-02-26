import { contains } from 'underscore'
import { IProjectsParams, IProjectsState } from '../types'

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