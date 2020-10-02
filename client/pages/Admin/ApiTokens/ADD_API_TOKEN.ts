import gql from 'graphql-tag'

export default gql`
  mutation($name: String!) {
    key: addApiToken(name: $name)
  }
`
