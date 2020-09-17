import gql from 'graphql-tag'

/**
 * @ignore
 */
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
