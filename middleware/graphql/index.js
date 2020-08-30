const graphql = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const { typeDef: Customer } = require('./resolvers/customer')
const { typeDef: Project } = require('./resolvers/project')
const { typeDef: Timesheet } = require('./resolvers/timesheet')
const { typeDef: TimeEntry } = require('./resolvers/timeentry')
const { typeDef: OutlookCategory } = require('./resolvers/outlookCategory')
const { typeDef: User } = require('./resolvers/user')
const { typeDef: Subscription } = require('./resolvers/subscription')
const { typeDef: Label } = require('./resolvers/label')
const { typeDef: Role } = require('./resolvers/role')
const { typeDef: Notification } = require('./resolvers/notification')
const { typeDef: ApiToken } = require('./resolvers/apiToken')
const { StorageService, GraphService, SubscriptionService } = require('../../services')
const { filter } = require('underscore')

const Query = `
  type Error {
    name: String
    message: String
    code: String
    statusCode: String
  }

  type EventError {
    message: String!
  }

  type BaseResult {
    success: Boolean
    error: Error
    data: String
  }

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`

/**
 * Get schema
 * 
 * @param {*} isLoggedIn Is the user logged in
 */
const getSchema = (isLoggedIn) => makeExecutableSchema({
  typeDefs: filter([
    Query,
    Customer,
    Project,
    TimeEntry,
    Subscription,
    Label,
    isLoggedIn && OutlookCategory,
    isLoggedIn && User,
    isLoggedIn && Role,
    isLoggedIn && ApiToken,
    isLoggedIn && Notification,
    isLoggedIn && Timesheet,
  ], t => t),
  resolvers: require('./resolvers')(isLoggedIn),
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
})

module.exports = graphql(req => ({
  schema: getSchema(!!req.user.id),
  rootValue: global,
  graphiql: process.env.GRAPHIQL_ENABLED == '1',
  pretty: req.app.get('env') === 'development',
  context: {
    services: {
      graph: req.user && new GraphService(req),
      storage: new StorageService(req.user.subscription),
      subscription: SubscriptionService,
    },
    user: req.user,
  }
}))
