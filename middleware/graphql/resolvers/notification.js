const unconfirmed_periods = require('./notification.unconfirmed-periods')

const typeDef = `  
  type Notification {
    id: String
    type: Int!
    severity: Int!
    dismissable: Int!
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
async function notifications(_obj, args, { user, services: { storage: StorageService } }) {
  let [notifications] = await Promise.all([
    unconfirmed_periods({
      template: args.templates.unconfirmedPeriods,
      user,
      StorageService,
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