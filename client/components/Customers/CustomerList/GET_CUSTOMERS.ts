
import gql from 'graphql-tag';

export default gql`
{
    customers {
        id
        key
        name
        description
        webLink
        icon
    }
}`;
