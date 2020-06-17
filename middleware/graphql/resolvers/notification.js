const unconfirmed_periods = require('./notification.unconfirmed-periods')

const typeDef = `  
  type Notification {
    id: String
    type: Int!
    severity: Int!
    text: String!
    moreLink: String
  }

  input NotificationTemplates {
    unconfirmedPeriods: String!
  }
  
  extend type Query {
    notifications(templates: NotificationTemplates!): [Notification!]!
  }  
`

/**
 * Get notifications
 */
async function notifications(_obj, variables, ctx) {
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