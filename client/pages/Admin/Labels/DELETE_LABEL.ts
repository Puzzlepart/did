import gql from 'graphql-tag'


export default gql`
  mutation($name: String!) {
    deleteLabel(name: $name) {
      success
      error {
        message
      }
    }
  }
`
