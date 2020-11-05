import gql from 'graphql-tag'

export default gql`
  query {
    tokens: apiTokens {
      name
      created
    }
  }
`
