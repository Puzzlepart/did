import gql from 'graphql-tag'

export interface IAddOrUpdateUserVariables {
  user: any
  update?: boolean
}

/**
 * @ignore
 */
export default gql`
  mutation($user: UserInput!, $update: Boolean) {
    addOrUpdateUser(user: $user, update: $update) {
      success
      error {
        message
      }
    }
  }
`
