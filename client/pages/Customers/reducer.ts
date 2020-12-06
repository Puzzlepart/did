import { QueryResult } from '@apollo/client'
import { History } from 'history'
import { Customer } from 'types'
import { contains, find } from 'underscore'
import { CustomersView, ICustomersParams, ICustomersState } from './types'

export type CustomersAction =
  | {
    type: 'DATA_UPDATED'
    query: QueryResult<any>
    params: ICustomersParams
  }
  | {
    type: 'SET_SELECTED_CUSTOMER'
    customer: Customer
  }
  | {
    type: 'CHANGE_VIEW'
    view: any
  }

/**
 * Update history
 *
 * @param {ICustomersState} state State
 * @param {History} history History
 * @param {number} delay Delay in ms
 */
const updateHistory = (state: ICustomersState, history: History, delay: number = 250) => {
  const paths = [state.view, state.selected?.key]
  const path = `/${['customers', ...paths].filter((p) => p).join('/')}`.toLowerCase()
  setTimeout(() => history.push(path), delay)
}

/**
 * Initialize state
 *
 * @param {ICustomersParams} params Params
 */
export const initState = (params: ICustomersParams): ICustomersState => ({
  view: (contains(['search', 'new'], params.view) ? params.view : 'search') as CustomersView,
  customers: [],
})

/**
 * Reducer for Projects
 *
 * @param {ICustomersState} state State
 * @param {CustomersAction} action Action
 */
export default (history: History) => (
  state: ICustomersState,
  action: CustomersAction
): ICustomersState => {
  const newState: ICustomersState = { ...state }
  switch (action.type) {
    case 'DATA_UPDATED':
      {
        const { query } = action
        if (query.data) {
          newState.customers = query.data.customers
          newState.selected = find(
            newState.customers,
            (c) => JSON.stringify(action.params).toLowerCase().indexOf(c.key.toLowerCase()) !== -1
          )
        }
      }
      break

    case 'SET_SELECTED_CUSTOMER':
      {
        newState.selected = action.customer
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
  updateHistory(newState, history)
  return newState
}
