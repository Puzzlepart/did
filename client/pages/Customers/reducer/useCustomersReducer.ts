import { useReducer } from 'hooks/useReducer'
import { useMemo } from 'react'
import { TFunction } from 'react-i18next'
import _ from 'underscore'
import { ICustomersUrlParameters } from '../types'
import {
  CHANGE_TAB,
  CLOSE_CUSTOMER_PANEL,
  CLOSE_PROJECT_PANEL,
  DATA_UPDATED,
  OPEN_CUSTOMER_PANEL,
  OPEN_PROJECT_PANEL,
  SET_SELECTED_CUSTOMER
} from './actions'
import createInitialState from './initState'

/**
 * Use Customers reducer. Provided with `urlParameters` it will create
 * the initial state and return a reducer and its state.
 *
 * @param urlParameters - URL parameters
 * @param t - Translation function
 */
export function useCustomersReducer(
  urlParameters: ICustomersUrlParameters,
  t: TFunction
) {
  const initialState = useMemo(
    () => createInitialState(urlParameters),
    [urlParameters]
  )
  return useReducer(initialState, (builder) =>
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
      .addCase(OPEN_PROJECT_PANEL, (state, { payload }) => {
        state.projectForm = {
          customerKey: state.selected.key,
          panelProps: {
            isOpen: true,
            headerText: t('customers.projectFormHeaderText', state.selected),
            scroll: true,
            onDismiss: payload.onDismissCallback,
            onSave: payload.onSaveCallback
          }
        }
      })
      .addCase(CLOSE_PROJECT_PANEL, (state) => {
        state.projectForm = null
      })
      .addCase(OPEN_CUSTOMER_PANEL, (state, { payload }) => {
        state.customerForm = {
          edit: state.selected,
          panelProps: {
            isOpen: true,
            headerText: state.selected.name,
            onDismiss: payload.onDismissCallback,
            onSave: payload.onSaveCallback
          }
        }
      })
      .addCase(CLOSE_CUSTOMER_PANEL, (state) => {
        state.customerForm = null
      })
  )
}
