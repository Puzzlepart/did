/* eslint-disable unicorn/prevent-abbreviations */
import { useReduxReducer } from 'hooks/useReduxReducer'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import _ from 'underscore'
import { fuzzyStringEqual } from 'utils'
import { ICustomersState, ICustomersUrlParameters } from '../types'
import {
  CLOSE_CUSTOMER_PANEL,
  CLOSE_PROJECT_PANEL,
  DATA_UPDATED,
  OPEN_CUSTOMER_PANEL,
  OPEN_PROJECT_PANEL,
  SET_SELECTED_CUSTOMER
} from './actions'

/**
 * Use Customers reducer. It will create the initial state
 * and return a reducer and its state.
 *
 * @param urlParameters - URL parameters
 */
export function useCustomersReducer() {
  const { t } = useTranslation()
  const initialState: ICustomersState = {
    customers: []
  }
  const urlParams = useParams<ICustomersUrlParameters>()
  return useReduxReducer(initialState, (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
        state.customers = payload.data?.customers || []
        state.selected = _.find(state.customers, ({ key }) =>
          fuzzyStringEqual(key, urlParams.currentTab)
        )
      })
      .addCase(SET_SELECTED_CUSTOMER, (state, { payload }) => {
        state.selected = payload
      })
      .addCase(OPEN_PROJECT_PANEL, (state, { payload }) => {
        state.projectForm = {
          customerKey: state.selected.key,
          panelProps: {
            isOpen: true,
            headerText: t('customers.projectFormHeaderText', state.selected),
            scroll: true,
            onDismiss: payload.onDismissCallback
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
            scroll: true
          }
        }
      })
      .addCase(CLOSE_CUSTOMER_PANEL, (state) => {
        if (state.customerForm?.panelProps) {
          state.customerForm = null
        }
      })
  )
}
