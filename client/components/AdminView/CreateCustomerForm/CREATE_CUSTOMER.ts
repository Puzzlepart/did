
import gql from 'graphql-tag';

export default gql`
    mutation($key: String!, $name: String!, $description: String!) { 
        result: createCustomer(key: $key, name: $name, description: $description) {
            success
            error
        }
    }
`;