import { gql } from '@apollo/client'

export const CREATE_OR_UPDATE_CUSTOMER = gql`
  mutation($customer: CustomerInput!, $update: Boolean) {
    result: createOrUpdateCustomer(customer: $customer, update: $update) {
      success
      error {
        message
      }
    }
  }
`
