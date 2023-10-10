import { Customer } from 'types'
import { IProjectFormProps } from '../Projects'
import { ICustomerFormProps } from './CustomerForm'

/**
 * URL parameters for the Customers page.
 */
export interface ICustomersUrlParameters {
  /**
   * The current tab selected by the user.
   */
  currentTab: string

  /**
   * The details tab selected by the user.
   */
  detailsTab: string
}

/**
 * The available tabs for the Customers page.
 *
 * - `s`- Search the list of customers.
 * - `new` - Create a new customer.
 */
export type CustomersTab = 's' | 'new'

/**
 * The state of the Customers component.
 */
export interface ICustomersState {
  /**
   * The currently selected customer.
   */
  selected?: Customer

  /**
   * The list of customers.
   */
  customers?: Customer[]

  /**
   * The form for creating/editing a project.
   */
  projectForm?: IProjectFormProps

  /**
   * The form for creating/editing a customer.
   */
  customerForm?: ICustomerFormProps

  /**
   * Any error that occurred while loading or updating the state.
   */
  error?: any
}
