import { useReduxReducer as useReducer } from 'hooks/useReduxReducer'
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
 */
export function useCustomersReducer() {
  const { t } = useTranslation()
  const initialState: ICustomersState = {
    customers: [],
    projectForm: {
      panel: {
        open: false
      }
    }
  }
  const urlParameters = useParams<ICustomersUrlParameters>()
  return useReducer(initialState, (builder) =>
    builder
      .addCase(DATA_UPDATED, (state, { payload }) => {
        state.customers = payload.data?.customers || []
        state.selected = _.find(state.customers, ({ key }) =>
          fuzzyStringEqual(key, urlParameters.currentTab)
        )
      })
      .addCase(SET_SELECTED_CUSTOMER, (state, { payload }) => {
        state.selected = payload
      })
      .addCase(OPEN_PROJECT_PANEL, (state, { payload }) => {
        state.projectForm = {
          panel: {
            open: true,
            title: t('customers.projectFormHeaderText', state.selected),
            onDismiss: payload.onDismissCallback
          }
        }
      })
      .addCase(CLOSE_PROJECT_PANEL, (state) => {
        state.projectForm = {
          panel: {
            open: false
          }
        }
      })
      .addCase(OPEN_CUSTOMER_PANEL, (state, { payload }) => {
        state.customerForm = {
          edit: state.selected,
          panel: {
            open: true,
            title: state.selected.name,
            onDismiss: payload.onDismissCallback
          }
        }
      })
      .addCase(CLOSE_CUSTOMER_PANEL, (state) => {
        if (state.customerForm?.panel) {
          state.customerForm = null
        }
      })
  )
}
