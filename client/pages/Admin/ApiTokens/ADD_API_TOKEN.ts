import gql from 'graphql-tag'

/**
 * @ignore
 */
export default gql`
  mutation($name: String!) {
    key: addApiToken(name: $name)
  }
`
