
import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
{
    user: currentUser {
        role
    }
}`;
