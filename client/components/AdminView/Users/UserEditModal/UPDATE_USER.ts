
import gql from 'graphql-tag';

export default gql`
    mutation($user: UserInput!) { 
        result: updateUser(user: $user) {
            success
            error
        }
    }
`;