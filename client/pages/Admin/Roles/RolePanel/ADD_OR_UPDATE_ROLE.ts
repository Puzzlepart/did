import { gql } from '@apollo/client'

export default gql`
  mutation($role: RoleInput!, $update: Boolean) {
    addOrUpdateRole(role: $role, update: $update) {
      success
      error {
        message
      }
    }
  }
`
