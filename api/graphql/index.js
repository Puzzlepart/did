const { ApolloServer, gql } = require('apollo-server-express')
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
const { StorageService, MSGraphService, SubscriptionService } = require('../../services')
const { filter, pick } = require('underscore')
const value = require('get-value')

const Query = gql`
  """
  A type that describes a Error
  """
  type Error {
    name: String
    message: String
    code: String
    statusCode: String
  }

  """
  A type that describes a EventError
  """
  type EventError {
    code: String
  }

  """
  Result for Mutations
  """
  type BaseResult {
    success: Boolean
    error: Error
    data: String
  }

  """
  The Query type is a special type that defines the entry point of every
  GraphQL query. Otherwise, the Query type is the same as any other
  GraphQL object type, and its fields work exactly the same way.
  """
  type Query {
    """
    Query cannot be initialized empty
    """
    _: String
  }

  """
  The Mutation type is a special type that is used to modify server-side data.
  Just like in queries, if the mutation field returns an object type,
  you can ask for nested fields. It can also contain multiple fields.
  However, unlike queries, mutation fields run in series, one after the other.
  """
  type Mutation {
    """
    Mutation cannot be initialized empty
    """
    _: String
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
      requireResolversForResolveType: false,
    },
  })
}

const schema = getSchema()

const createContext = async ({ req }) => {
  try {
    let subscription = req.user && req.user.subscription
    if (!!req.token) {
      subscription = await SubscriptionService.findSubscriptionWithToken(req.token)
      if (!subscription) throw new Error("You don't have access to this resource.")
    } else if (!req.user) throw new Error()
    let services = {
      storage: new StorageService(subscription),
      subscription: SubscriptionService,
    }
    if (!!req.user) services.msgraph = new MSGraphService(req)
    return {
      services,
      user: req.user || {},
      subscription,
    }
  } catch (e) {
    return new Error()
  }
}

module.exports = new ApolloServer({
  schema,
  rootValue: global,
  playground: false,
  context: createContext,
  engine: {
    reportSchema: true,
    variant: 'current',
    generateClientInfo: ({ context }) => {
      return {
        clientName: value(context, 'subscription.name', { default: '' }),
      }
    },
  },
  formatError: error => pick(error, 'message'),
})
