import gql from 'graphql-tag'

/**
 * @ignore
 */
export const GET_DATA = gql`
  query {
    adUsers {
      id
      displayName
    }
    users {
      id
      displayName
      role {
        name
        permissions
      }
    }
    roles {
      name
      icon
      permissions
    }
  }
`
