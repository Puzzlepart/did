import { createReducer } from '@reduxjs/toolkit'
import { History } from 'history'
import { contains, find } from 'underscore'
import { CustomersView, ICustomersParameters, ICustomersState } from '../types'
import { CHANGE_VIEW, DATA_UPDATED, SET_SELECTED_CUSTOMER } from './actions'

/**
 * Initialize state
 *
 * @param params - Params
 */
export const initState = (
  parameters: ICustomersParameters
): ICustomersState => ({
  view: (contains(['search', 'new'], parameters.view)
    ? parameters.view
    : 'search') as CustomersView,
  customers: []
})

interface ICreateReducerParameters {
  params: ICustomersParameters
  history: History
}

/**
 * Create reducer for Customers
 */
export default ({ params }: ICreateReducerParameters) =>
  createReducer(initState(params), (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
        state.customers = payload.query.data?.customers || []
        state.selected = find(
          state.customers,
          (c) => params.key?.toLowerCase() === c.key.toLowerCase()
        )
      })
      .addCase(SET_SELECTED_CUSTOMER, (state, { payload }) => {
        state.selected = payload.customer
      })
      .addCase(CHANGE_VIEW, (state, { payload }) => {
        state.view = payload.view
        state.selected = null
      })
  )
