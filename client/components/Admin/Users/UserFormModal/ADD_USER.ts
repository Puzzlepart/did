
import gql from 'graphql-tag';

/**
 * @ignore
 */
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