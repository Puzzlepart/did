
import gql from 'graphql-tag';

export default gql`
{
    user: currentUser {
        role
    }
}`;
