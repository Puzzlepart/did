
import gql from 'graphql-tag';

export default gql`
    mutation($user: UserInput!) { 
        updateUser(user: $user) {
            success
            error {
                message
            }
        }
    }
`;