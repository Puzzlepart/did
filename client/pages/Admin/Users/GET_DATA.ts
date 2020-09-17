import gql from 'graphql-tag'

/**
 * @ignore
 */
export const GET_DATA = gql`
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
