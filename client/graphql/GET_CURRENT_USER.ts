import gql from 'graphql-tag'

/**
 * @ignore
 */
export const GET_CURRENT_USER = gql`
  {
    currentUser {
      id
      email
      displayName
      role {
        name
        permissions
      }
      userLanguage
      sub {
        name
      }
    }
  }
`
