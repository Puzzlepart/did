
import gql from 'graphql-tag';

export const GET_CUSTOMERS = gql`
{
    customers {
        id
        key
        name
        description
        webLink
        icon
        labels{
            name
            description
            color
            icon
        }
    }
}`;
