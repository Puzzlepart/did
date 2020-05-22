const unconfirmed_weeks = require('./notification.unconfirmed-weeks')

const typeDef = `  
  type Notification {
    id: String
    type: Int!
    severity: Int!
    dismissable: Int!
    text: String!
    moreLink: String
  }
  
  extend type Query {
    notifications: [Notification!]!
  }  
`

/**
 * Get notifications
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} _args Unused args
 * @param {*} context Context
 */
async function notifications(_obj, _args, { user, services: { storage: StorageService } }) {
  let [notifications] = await Promise.all([
    unconfirmed_weeks(user, StorageService),
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