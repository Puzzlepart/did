import { OperationVariables } from '@apollo/client'
import { IFormControlProps } from 'components/FormControl'
import { ITabProps } from 'components/Tabs/types'
import { Customer, CustomerInput } from 'types'

export interface ICustomerFormProps
  extends ITabProps,
    IFormControlProps<Customer> {}

/**
 * Variables for creating or updating a customer.
 */
export interface CreateOrUpdateCustomerVariables extends OperationVariables {
  /**
   * The customer input object.
   */
  customer: CustomerInput

  /**
   * Flag that decides whether to update or create a customer.
   */
  update?: boolean
}
