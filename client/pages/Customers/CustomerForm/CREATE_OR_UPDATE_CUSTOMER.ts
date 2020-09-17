import gql from 'graphql-tag'

export interface ICustomerInput {
  key?: string
  name?: string
  description?: string
  icon?: string
}

export interface ICreateOrUpdateCustomerVariables {
  customer: ICustomerInput
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
