
import gql from 'graphql-tag';

/**
 * @ignore
 */
export interface IDeleteCustomerVariables {
    key: string;
}

/**
 * @ignore
 */
export default gql`
    mutation($key: String!) { 
        result: deleteCustomer(key: $key) {
            success
            error {
                message
            }
        }
    }
`;