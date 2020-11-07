import { gql } from '@apollo/client'

export const UPDATE_SUBSCRIPTION = gql`
  mutation($id: String!, $settings: SubscriptionSettingsInput!) {
    result: updateSubscription(id: $id, settings: $settings) {
      success
      error {
        message
      }
    }
  }
`
