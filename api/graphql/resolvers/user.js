const { pick, find, filter } = require('underscore')
const { gql } = require('apollo-server-express')

const typeDef = gql`
  """
  A type that describes a Subscription
  """
  type Subscription {
    name: String!
  }

  """
  A type that describes a User
  """
  type User {
    id: String
    role: Role
    displayName: String
    email: String
    userLanguage: String
    sub: Subscription
  }

  """
  A type that describes a ADUser
  """
  type ADUser {
    id: String
    displayName: String
  }

  """
  Input object for User used in Mutation addOrUpdateUser
  """
  input UserInput {
    id: String!
    displayName: String
    role: String
    userLanguage: String
  }

  extend type Query {
    """
    Get all users from Active Directory
    """
    adUsers: [ADUser!]!

    """
    Get all users
    """
    users: [User!]!

    """
    Get the currently logged in user
    """
    currentUser: User!
  }

  extend type Mutation {
    """
    Add or update user
    """
    addOrUpdateUser(user: UserInput!, update: Boolean): BaseResult!
  }
`

async function adUsers(_obj, _variables, ctx) {
  let users = await ctx.services.graph.getUsers()
  return users
}

async function users(_obj, _variables, ctx) {
  let [users, roles] = await Promise.all([ctx.services.storage.getUsers(), ctx.services.storage.getRoles()])
  users = filter(
    users.map(user => ({
      ...user,
      role: find(roles, role => role.name === user.role),
    })),
    user => !!user.role
  )
  return users
}

async function currentUser(_obj, _variables, ctx) {
  try {
    const [user, sub, roles] = await Promise.all([
      ctx.services.storage.getUser(ctx.user.id),
      ctx.services.subscription.getSubscription(ctx.user.tenantId),
      ctx.services.storage.getRoles(),
    ])
    return {
      ...user,
      email: ctx.user.profile.email,
      sub,
      role: find(roles, role => role.name === user.role),
    }
  } catch (error) {}
}

async function addOrUpdateUser(_obj, variables, ctx) {
  try {
    await ctx.services.storage.addOrUpdateUser(variables.user, variables.update)
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: pick(error, 'name', 'message', 'code', 'statusCode'),
    }
  }
}

module.exports = {
  resolvers: {
    Query: { adUsers, users, currentUser },
    Mutation: { addOrUpdateUser },
  },
  typeDef,
}
