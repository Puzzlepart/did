import gql from 'graphql-tag'

/**
 * @ignore
 */
export const GET_CURRENT_USER = gql`
  {
    currentUser {
      id
      email
      fullName
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
