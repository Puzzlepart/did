import _ from 'underscore'
import {
  CustomersTab,
  ICustomersState,
  ICustomersUrlParameters
} from '../types'

/**
 * Initialize state from URL parameters
 *
 * @param urlParameters - URL parameters
 */
export default function initState(
  urlParameters: ICustomersUrlParameters
): ICustomersState {
  return {
    currentTab: (_.contains(['s', 'new'], urlParameters.currentTab)
      ? urlParameters.currentTab
      : 's') as CustomersTab,
    customers: []
  }
}
