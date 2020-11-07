

export default gql`
  mutation($users: [UserInput]!) {
    bulkAddUsers(users: $users) {
      success
      error {
        message
      }
    }
  }
`
