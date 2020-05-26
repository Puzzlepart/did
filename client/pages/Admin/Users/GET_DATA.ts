
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
      id
      name
      permissions
    }
  }
  roles {
    id
    name
    permissions
  }
}
`
