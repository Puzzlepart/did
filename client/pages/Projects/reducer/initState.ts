import _  from 'underscore'
import { IProjectsParameters, IProjectsState } from '../types'

/**
 * Initialize state URL params
 *
 * @param url - Params
 */
export const initState = (url: IProjectsParameters): IProjectsState => ({
  view: _.contains(['search', 'my', 'new'], url.view) ? url.view : 'search',
  detailsTab: url.detailsTab,
  projects: [],
  outlookCategories: []
})
