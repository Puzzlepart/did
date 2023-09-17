import { QueryResult } from '@apollo/client'
import { createAction } from '@reduxjs/toolkit'
import { Customer } from 'types'

type OpenPanelPayload = {
  onDismissCallback: () => void
}

export const DATA_UPDATED =
  createAction<QueryResult<{ customers: Customer[] }>>('DATA_UPDATED')
export const SET_SELECTED_CUSTOMER = createAction<Customer>(
  'SET_SELECTED_CUSTOMER'
)
export const OPEN_PROJECT_PANEL =
  createAction<OpenPanelPayload>('OPEN_PROJECT_PANEL')
export const CLOSE_PROJECT_PANEL = createAction('CLOSE_PROJECT_PANEL')
export const OPEN_CUSTOMER_PANEL = createAction<OpenPanelPayload>(
  'OPEN_CUSTOMER_PANEL'
)
export const CLOSE_CUSTOMER_PANEL = createAction('CLOSE_CUSTOMER_PANEL')
