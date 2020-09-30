import gql from 'graphql-tag'
import { CustomerModel } from './types'

export interface ICreateOrUpdateCustomerVariables {
  customer: CustomerModel
  update?: boolean
}

/**
 * @ignore
 */
export default gql`
  mutation($customer: CustomerInput!, $update: Boolean) {
    result: createOrUpdateCustomer(customer: $customer, update: $update) {
      success
      error {
        message
      }
    }
  }
`
