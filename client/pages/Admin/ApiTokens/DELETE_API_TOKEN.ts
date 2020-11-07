import { gql } from '@apollo/client'

export default gql`
  mutation($name: String!) {
    result: deleteApiToken(name: $name) {
      success
      error {
        message
      }
    }
  }
`
