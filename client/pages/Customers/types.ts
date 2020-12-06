import { Customer } from 'types'

export interface ICustomersParams {
  key: string
  view: string
}

export type CustomersView = 'search' | 'new'

export interface ICustomersState {
  view?: CustomersView
  selected?: Customer
  customers?: Customer[]
}
