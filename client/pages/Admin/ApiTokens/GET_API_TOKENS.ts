import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
  query {
    tokens: getApiTokens {
      name
      timestamp
    }
  }
`
