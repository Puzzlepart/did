import { createReducer } from '@reduxjs/toolkit'
import _ from 'underscore'
import { ICustomersUrlParameters } from '../types'
import { CHANGE_TAB, DATA_UPDATED, SET_SELECTED_CUSTOMER } from './actions'
import createInitialState from './initState'

/**
 * Create reducer for `<Customers />` using `@reduxjs/toolkit`.
 */
export default (urlParameters: ICustomersUrlParameters) =>
  createReducer(createInitialState(urlParameters), (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
        state.customers = payload.query.data?.customers || []
        state.selected = _.find(
          state.customers,
          (c) =>
            urlParameters.customerKey?.toLowerCase() === c.key.toLowerCase()
        )
      })
      .addCase(SET_SELECTED_CUSTOMER, (state, { payload }) => {
        state.selected = payload.customer
      })
      .addCase(CHANGE_TAB, (state, { payload }) => {
        state.currentTab = payload.tab
        state.selected = null
      })
  )

export * from './useCustomersReducer'
