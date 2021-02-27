import { contains } from 'underscore'
import { IProjectsParams, IProjectsState } from '../types'

/**
 * Initialize state URL params
 *
 * @param url - Params
 */
export const initState = (url: IProjectsParams): IProjectsState => ({
  view: contains(['search', 'my', 'new'], url.view) ? url.view : 'search',
  detailsTab: url.detailsTab,
  projects: [],
  outlookCategories: []
})
