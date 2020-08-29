
import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
    mutation($customer: CustomerInput!) { 
        result: createOrUpdateCustomer(customer: $customer) {
            success
            error {
                message
            }
        }
    }
`