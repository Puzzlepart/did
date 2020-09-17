import gql from 'graphql-tag'

/**
 * @ignore
 */
export const GET_DATA = gql`
  query {
    users {
      id
      fullName
      role {
        name
        permissions
      }
    }
    roles {
      name
      permissions
    }
  }
`
