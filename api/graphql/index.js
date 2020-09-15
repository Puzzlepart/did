const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools')
const { typeDef: Customer } = require('./resolvers/customer')
const { typeDef: Project } = require('./resolvers/project')
const { typeDef: Timesheet } = require('./resolvers/timesheet')
const { typeDef: TimeEntry } = require('./resolvers/timeentry')
const { typeDef: OutlookCategory } = require('./resolvers/outlookCategory')
const { typeDef: User } = require('./resolvers/user')
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
 */
const getSchema = () => {
  const typeDefs = [
    Query,
    Customer,
    Project,
    TimeEntry,
    Label,
    OutlookCategory,
    User,
    Role,
    ApiToken,
    Notification,
    Timesheet,
  ]
  const resolvers = require('./resolvers')
  return makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
  })
}

const schema = getSchema()

const getContext = async ({ req }) => {
  let subscription = req.user && req.user.subscription
  if (!!req.token) {
    subscription = await SubscriptionService.findSubscriptionWithToken(req.token)
    if (!subscription) throw new Error('You don\'t have access to this resource.')
  } else if (!req.user) throw new Error()
  let services = {
    storage: new StorageService(subscription),
    subscription: SubscriptionService,
  }
  if (!!req.user) services.graph = new GraphService(req)
  return ({
    services,
    user: req.user,
  })
}

module.exports = new ApolloServer({
  schema,
  rootValue: global,
  playground: false,
  context: getContext,
  engine: {
    reportSchema: true,
    variant: 'current',
    generateClientInfo: ({context}) => {
      return {
        clientName: context.user && context.user.subscription.name
      };
    }
  },
})
