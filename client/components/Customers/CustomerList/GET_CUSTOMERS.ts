
import gql from 'graphql-tag';

/**
 * @ignore
 */
export default gql`
{
    customers {
        id
        key
        name
        description
        webLink
        icon
        inactive
    }
}`;
