import { gql } from '@apollo/client'

export default gql`
  query {
    tokens: apiTokens {
      name
      created
    }
  }
`
