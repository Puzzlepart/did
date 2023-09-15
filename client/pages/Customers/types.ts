import { Customer } from 'types'
import { IProjectFormProps } from '../Projects'
import { ICustomerFormProps } from './CustomerForm'

export interface ICustomersUrlParameters {
  currentTab: string
  customerKey: string
}

export type CustomersTab = 's' | 'new'

export interface ICustomersState {
  currentTab?: CustomersTab
  selected?: Customer
  customers?: Customer[]
  projectForm?: IProjectFormProps
  customerForm?: ICustomerFormProps
  error?: any
}
