import { QueryResult } from '@apollo/client'
import { createAction } from '@reduxjs/toolkit'
import { Customer } from 'types'
import { CustomersTab } from '../types'

type OpenPanelPayload = {
  onSaveCallback?: () => void
  onDismissCallback: () => void
}

export const DATA_UPDATED =
  createAction<{ query: QueryResult<any> }>('DATA_UPDATED')
export const SET_SELECTED_CUSTOMER = createAction<{ customer: Customer }>(
  'SET_SELECTED_CUSTOMER'
)
export const CHANGE_TAB = createAction<{ tab: CustomersTab }>('CHANGE_TAB')
export const OPEN_PROJECT_PANEL =
  createAction<OpenPanelPayload>('OPEN_PROJECT_PANEL')
export const CLOSE_PROJECT_PANEL = createAction('CLOSE_PROJECT_PANEL')
export const OPEN_CUSTOMER_PANEL = createAction<OpenPanelPayload>(
  'OPEN_CUSTOMER_PANEL'
)
export const CLOSE_CUSTOMER_PANEL = createAction('CLOSE_CUSTOMER_PANEL')
