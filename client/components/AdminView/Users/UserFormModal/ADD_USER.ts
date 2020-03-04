
import gql from 'graphql-tag';

export default gql`
    mutation($user: UserInput!) { 
        addUser(user: $user) {
            success
            error {
                message
            }
        }
    }
`;