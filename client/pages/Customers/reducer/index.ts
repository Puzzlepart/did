import { createReducer } from '@reduxjs/toolkit'
import _ from 'underscore'
import { ICustomersUrlParameters } from '../types'
import { CHANGE_VIEW, DATA_UPDATED, SET_SELECTED_CUSTOMER } from './actions'
import { initState } from './initState'

interface ICreateReducerParameters {
  params: ICustomersUrlParameters
}

/**
 * Create reducer for Customers
 */
export default ({ params }: ICreateReducerParameters) =>
  createReducer(initState(params), (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
        state.customers = payload.query.data?.customers || []
        state.selected = _.find(
          state.customers,
          (c) => params.customerKey?.toLowerCase() === c.key.toLowerCase()
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
