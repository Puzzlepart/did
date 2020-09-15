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

module.exports = new ApolloServer({
  schema,
  rootValue: global,
  playground: false,
  context: async ({ req }) => {
    let services = {
      storage: new StorageService(req.user.subscription),
      subscription: SubscriptionService,
    }
    if(req.user.id) services.graph = new GraphService(req)
    return ({
      services,
      user: req.user,
    })
  },
  engine: {    
    reportSchema: true,
    variant: 'current'
  },
})
