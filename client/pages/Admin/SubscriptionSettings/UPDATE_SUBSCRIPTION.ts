import gql from 'graphql-tag'

export const UPDATE_SUBSCRIPTION = gql`
  mutation($id: String!, $settings: SubscriptionSettingsInput!) {
    updateSubscription(id: $id, settings: $settings) {
      success
      error {
        message
      }
    }
  }
`