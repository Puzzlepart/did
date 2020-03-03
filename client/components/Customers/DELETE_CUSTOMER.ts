
import gql from 'graphql-tag';

export default gql`
    mutation($key: String!) { 
        deleteCustomer(key: $key) {
            success
            error {
                message
            }
        }
    }
`;