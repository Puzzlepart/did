import gql from 'graphql-tag'

export const GET_ROLES = gql`
  query {
    roles {
      name
      description
      icon
      permissions
      readOnly
    }
  }
`
