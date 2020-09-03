import gql from 'graphql-tag'

/**
 * @ignore
 */
export const GET_ROLES = gql`
    query {
        roles {
            name
            permissions
        }
    }
`