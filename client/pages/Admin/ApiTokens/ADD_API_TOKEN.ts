import { gql } from '@apollo/client'

export default gql`
  mutation($name: String!) {
    key: addApiToken(name: $name)
  }
`
