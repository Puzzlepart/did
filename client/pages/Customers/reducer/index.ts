import { createReducer } from '@reduxjs/toolkit'
import { History } from 'history'
import { contains, find } from 'underscore'
import { CustomersView, ICustomersParams, ICustomersState } from '../types'
import { CHANGE_VIEW, DATA_UPDATED, SET_SELECTED_CUSTOMER } from './actions'

/**
 * Initialize state
 *
 * @param params - Params
 */
export const initState = (params: ICustomersParams): ICustomersState => ({
  view: (contains(['search', 'new'], params.view)
    ? params.view
    : 'search') as CustomersView,
  customers: []
})

interface ICreateReducerParams {
  params: ICustomersParams
  history: History
}

/**
 * Create reducer for Customers
 */
export default ({ params }: ICreateReducerParams) =>
  createReducer(initState(params), {
    [DATA_UPDATED.type]: (
      state,
      { payload }: ReturnType<typeof DATA_UPDATED>
    ) => {
      state.customers = payload.query.data?.customers || []
      state.selected = find(
        state.customers,
        (c) => [params.key, params.view].indexOf(c.key.toLowerCase()) !== -1
      )
    },

    [SET_SELECTED_CUSTOMER.type]: (
      state,
      { payload }: ReturnType<typeof SET_SELECTED_CUSTOMER>
    ) => {
      state.selected = payload.customer
    },

    [CHANGE_VIEW.type]: (
      state,
      { payload }: ReturnType<typeof CHANGE_VIEW>
    ) => {
      state.view = payload.view
      state.selected = null
    }
  })
