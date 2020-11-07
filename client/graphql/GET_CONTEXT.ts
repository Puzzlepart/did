import { gql } from '@apollo/client'

export const GET_CONTEXT = gql`
  {
    subscription {
      id
      name
      settings {
        forecast {
          enabled
          notifications
        }
      }
    }
    user: currentUser {
      id
      mail
      displayName
      role {
        name
        icon
        permissions
      }
      preferredLanguage
    }
  }
`
