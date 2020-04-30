
import gql from 'graphql-tag';

/**
 * @ignore
 */
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