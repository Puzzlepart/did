import _ from 'underscore'
import { IProjectsState, IProjectsUrlParameters } from '../types'

/**
 * Initialize state URL params
 *
 * @param url - Params
 */
export function initState(url: IProjectsUrlParameters): IProjectsState {
  return {
    view: _.contains(['search', 'my', 'new'], url.currentView)
      ? url.currentView
      : 'search',
    projects: [],
    outlookCategories: []
  }
}
