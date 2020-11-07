import { gql } from '@apollo/client'

export const AD_USERS = gql`
  query {
    adUsers {
      id
      displayName
      givenName
      surname
      jobTitle
      mobilePhone
      mail
      preferredLanguage
    }
    users {
      id
      displayName
      givenName
      surname
      jobTitle
      mail
      role {
        name
        icon
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
