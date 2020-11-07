import { gql } from '@apollo/client'

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
