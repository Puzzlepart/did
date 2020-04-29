
import gql from 'graphql-tag';

export interface IDeleteCustomerVariables {
    key: string;
}

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