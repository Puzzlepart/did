import _ from 'underscore'
import { IProjectsState, IProjectsUrlParameters } from '../types'

/**
 * Initialize state from URL parameters
 *
 * @param urlParameters - URL parameters
 */
export default function initState(
  urlParameters: IProjectsUrlParameters
): IProjectsState {
  return {
    currentTab: _.contains(['s', 'm', 'new'], urlParameters.currentTab)
      ? urlParameters.currentTab
      : 's',
    projects: [],
    outlookCategories: []
  }
}
