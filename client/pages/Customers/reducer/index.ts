import { createReducer } from '@reduxjs/toolkit'
import _ from 'underscore'
import { CustomersView, ICustomersParameters, ICustomersState } from '../types'
import { CHANGE_VIEW, DATA_UPDATED, SET_SELECTED_CUSTOMER } from './actions'

/**
 * Initialize state
 *
 * @param parameters - Parameters
 */
export const initState = (
  parameters: ICustomersParameters
): ICustomersState => ({
  view: (_.contains(['search', 'new'], parameters.view)
    ? parameters.view
    : 'search') as CustomersView,
  customers: []
})

interface ICreateReducerParameters {
  params: ICustomersParameters
}

/**
 * Create reducer for Customers
 */
export default ({ params }: ICreateReducerParameters) =>
  createReducer(initState(params), (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
        if (payload.data) {
          state.customers = payload.data.customers || []
          state.selected = _.find(
            state.customers,
            (c) => params.key?.toLowerCase() === c.key.toLowerCase()
          )
        }
        state.error = payload.error
      })
      .addCase(SET_SELECTED_CUSTOMER, (state, { payload }) => {
        state.selected = payload.customer
      })
      .addCase(CHANGE_VIEW, (state, { payload }) => {
        state.view = payload.view
        state.selected = null
      })
  )
