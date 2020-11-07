import gql from 'graphql-tag'

export const GET_SUBSCRIPTION = gql`
  {
    subscription {
      id
      name
      settings {
        forecast {
          enabled
          notifications
        }
      }
    }
  }
`
