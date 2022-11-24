import { Customer } from 'types'

export interface ICustomersUrlParameters {
  currentView: string
  customerKey: string
}

export type CustomersView = 'search' | 'new'

export interface ICustomersState {
  view?: CustomersView
  selected?: Customer
  customers?: Customer[]
  error?: any
}
