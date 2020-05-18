
import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    mutation($customer: CustomerInput!) { 
        result: createCustomer(customer: $customer) {
            success
            error {
                message
            }
        }
    }
`