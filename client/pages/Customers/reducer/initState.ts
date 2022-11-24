import _ from 'underscore'
import { CustomersView, ICustomersParameters, ICustomersState } from '../types'

/**
 * Initialize state
 *
 * @param parameters - Parameters
 */

export function initState(parameters: ICustomersParameters): ICustomersState {
  return {
    view: (_.contains(['search', 'new'], parameters.view)
      ? parameters.view
      : 'search') as CustomersView,
    customers: []
  }
}
