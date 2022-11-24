import _ from 'underscore'
import {
  CustomersView,
  ICustomersState,
  ICustomersUrlParameters
} from '../types'

/**
 * Initialize state
 *
 * @param parameters - Parameters
 */

export function initState(
  parameters: ICustomersUrlParameters
): ICustomersState {
  return {
    view: (_.contains(['search', 'new'], parameters.view)
      ? parameters.view
      : 'search') as CustomersView,
    customers: []
  }
}
