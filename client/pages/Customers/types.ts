import { Customer } from 'types'

export interface ICustomersUrlParameters {
  currentTab: string
  customerKey: string
}

export type CustomersTab = 's' | 'new'

export interface ICustomersState {
  currentTab?: CustomersTab
  selected?: Customer
  customers?: Customer[]
  error?: any
}
