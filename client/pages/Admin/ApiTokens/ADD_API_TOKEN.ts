

export default gql`
  mutation($name: String!) {
    key: addApiToken(name: $name)
  }
`
