const { pick, find, filter } = require('underscore')
const { gql } = require('apollo-server-express')

const typeDef = gql`
  """
  A type that describes SubscriptionForecastSettings
  """
  type SubscriptionForecastSettings {
    enabled: Boolean
    notifications: Int
  }

  """
  A input that describes SubscriptionForecastSettings
  """
  input SubscriptionForecastSettingsInput {
    enabled: Boolean
    notifications: Int
  }

  """
  A type that describes SubscriptionSettings
  """
  type SubscriptionSettings {
    forecast: SubscriptionForecastSettings
  }

  """
  A type that describes SubscriptionSettings
  """
  input SubscriptionSettingsInput {
    forecast: SubscriptionForecastSettingsInput
  }

  """
  A type that describes a Subscription
  """
  type Subscription {
    id: String!
    name: String!
    settings: SubscriptionSettings
  }

  extend type Mutation {
    """
    Update subscription
    """
    updateSubscription(id: String!, settings: SubscriptionSettingsInput!): BaseResult!
  }
`

async function updateSubscription(_obj, variables, ctx) {
  console.log(variables)
  try {
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: pick(error, 'name', 'message', 'code', 'statusCode'),
    }
  }
}

module.exports = {
  resolvers: {
    Query: {},
    Mutation: { updateSubscription },
  },
  typeDef,
}
