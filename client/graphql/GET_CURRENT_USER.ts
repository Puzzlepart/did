import gql from 'graphql-tag'

/**
 * @ignore
 */
export const GET_CURRENT_USER = gql`
  {
    currentUser {
      id
      mail
      displayName
      role {
        name
        icon
        permissions
      }
      preferredLanguage
      subscription {
        name
      }
    }
  }
`
