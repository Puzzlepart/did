import { QueryResult } from '@apollo/client'
import { createAction, createReducer } from '@reduxjs/toolkit'
import { History } from 'history'
import { Customer } from 'types'
import { contains, find } from 'underscore'
import { CustomersView, ICustomersParams, ICustomersState } from './types'

export const DATA_UPDATED = createAction<{ query: QueryResult<any> }>('DATA_UPDATED')
export const SET_SELECTED_CUSTOMER = createAction<{ customer: Customer }>('SET_SELECTED_CUSTOMER')
export const CHANGE_VIEW = createAction<{ view: CustomersView }>('CHANGE_VIEW')

/**
 * Initialize state
 *
 * @param {ICustomersParams} params Params
 */
export const initState = (params: ICustomersParams): ICustomersState => ({
  view: (contains(['search', 'new'], params.view) ? params.view : 'search') as CustomersView,
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
    [DATA_UPDATED.type]: (state, { payload }: ReturnType<typeof DATA_UPDATED>) => {
      if (payload.query.data) {
        state.customers = payload.query.data.customers
        state.selected = find(
          state.customers,
          (c) => JSON.stringify(params).toLowerCase().indexOf(c.key.toLowerCase()) !== -1
        )
      }
    },

    [SET_SELECTED_CUSTOMER.type]: (
      state,
      { payload }: ReturnType<typeof SET_SELECTED_CUSTOMER>
    ) => {
      state.selected = payload.customer
    },

    [CHANGE_VIEW.type]: (state, { payload }: ReturnType<typeof CHANGE_VIEW>) => {
      state.view = payload.view
      state.selected = null
    }
  })
