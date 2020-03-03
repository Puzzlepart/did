
import gql from 'graphql-tag';

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