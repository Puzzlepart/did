import gql from 'graphql-tag'

/**
 * @ignore
 */
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
