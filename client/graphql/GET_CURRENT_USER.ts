
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
        id
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
