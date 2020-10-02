import gql from 'graphql-tag'

export interface IUserInput {
  id: string
  displayName: string
  role: string
}

export interface IAddOrUpdateUserVariables {
  user: IUserInput
  update?: boolean
}

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
