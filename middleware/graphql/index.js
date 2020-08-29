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
const StorageService = require('../../services/storage')
const GraphService = require('../../services/graph')
const SubscriptionService = require('../../services/subscription')

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


const schema = makeExecutableSchema({
  typeDefs: [
    Query,
    Customer,
    Project,
    Timesheet,
    TimeEntry,
    User,
    OutlookCategory,
    Subscription,
    Label,
    Role,
    Notification
  ],
  resolvers: require('./resolvers'),
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
})

module.exports = graphql(req => ({
  schema,
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
