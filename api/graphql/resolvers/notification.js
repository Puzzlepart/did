const unconfirmed_periods = require('./notification.unconfirmed-periods')
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
  }
  
  extend type Query {
    """
    Get notifications
    """
    notifications(templates: NotificationTemplates!): [Notification!]!
  }  
`

async function notifications(_obj, variables, ctx) {
  if (!ctx.user.id) return { success: false, error: null }

  let [notifications] = await Promise.all([
    unconfirmed_periods({
      template: variables.templates.unconfirmedPeriods,
      ctx,
    }),
  ])
  return notifications
}



module.exports = {
  resolvers: {
    Query: { notifications },
    Mutation: {}
  },
  typeDef
}