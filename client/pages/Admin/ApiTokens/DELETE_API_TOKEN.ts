import gql from 'graphql-tag'


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
