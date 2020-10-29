const unconfirmed_periods = require('./notification.unconfirmed-periods')
const forecast = require('./notification.forecast')
const { gql } = require('apollo-server-express')

const typeDef = gql`
  """
  A type that describes a Notification
  """
  type Notification {
    id: String
    type: Int!
    severity: Int!
    text: String!
    moreLink: String
  }

  """
  Input object for Notification template used in Query notifications
  """
  input NotificationTemplates {
    unconfirmedPeriods: String!
    forecast: String!
  }

  extend type Query {
    """
    Get notifications
    """
    notifications(templates: NotificationTemplates!, locale: String!): [Notification!]!
  }
`

async function notifications(_obj, variables, ctx) {
  if (!ctx.user.id) return { success: false, error: null }

  let notifications = await Promise.all([
    unconfirmed_periods({
      template: variables.templates.unconfirmedPeriods,
      ctx,
      locale: variables.locale,
    }),
    forecast({
      template: variables.templates.forecast,
      ctx,
      locale: variables.locale,
    })
  ])
  return [].concat.apply([], notifications);
}

module.exports = {
  resolvers: {
    Query: { notifications },
    Mutation: {},
  },
  typeDef,
}
