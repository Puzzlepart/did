const { pick, find, filter } = require('underscore')
const { gql } = require('apollo-server-express')

const typeDef = gql`
  """
  A type that describes a User
  """
  type User {
    id: String
    displayName: String
    givenName: String
    surname: String
    jobTitle: String
    mobilePhone: String
    mail: String
    preferredLanguage: String
    subscription: Subscription
    role: Role
  }

  """
  Input object for User used in Mutation addOrUpdateUser
  """
  input UserInput {
    id: String!
    displayName: String
    givenName: String
    surname: String
    jobTitle: String
    mobilePhone: String
    mail: String
    preferredLanguage: String
    role: String
  }

  extend type Query {
    """
    Get all users from Active Directory
    """
    adUsers: [User!]!

    """
    Get all users
    """
    users: [User!]!

    """
    Get the currently logged in user
    """
    currentUser: User
  }

  extend type Mutation {
    """
    Add or update user
    """
    addOrUpdateUser(user: UserInput!, update: Boolean): BaseResult!

    """
    Bulk add users
    """
    bulkAddUsers(users: [UserInput]!): BaseResult!
  }
`

/**
 * Get AD users
 * 
 * @param {*} _obj {} 
 * @param {*} _variables {}
 * @param {*} ctx GraphQL context
 */
async function adUsers(_obj, _variables, ctx) {
  let users = await ctx.services.msgraph.getUsers()
  return users
}

/**
 * Get users
 * 
 * @param {*} _obj {} 
 * @param {*} _variables {}
 * @param {*} ctx GraphQL context
 */
async function users(_obj, _variables, ctx) {
  let [users, roles] = await Promise.all([
    ctx.services.azstorage.getUsers(),
    ctx.services.azstorage.getRoles()
  ])
  users = filter(
    users.map(user => ({
      ...user,
      role: find(roles, role => role.name === user.role),
    })),
    user => !!user.role
  )
  return users
}

/**
 * Get current user
 * 
 * @param {*} _obj {} 
 * @param {*} _variables {}
 * @param {*} ctx GraphQL context
 */
async function currentUser(_obj, _variables, ctx) {
  if (!ctx.user) return null
  try {
    const [user, roles, subscription] = await Promise.all([
      ctx.services.azstorage.getUser(ctx.user.id),
      ctx.services.azstorage.getRoles(),
      ctx.services.subscription.getSubscription(ctx.user.subscription.id),
    ])
    return {
      ...ctx.user,
      ...user,
      role: find(roles, role => role.name === user.role),
      subscription,
    }
  } catch (error) {
    return null
  }
}

/**
 * Add or update user
 * 
 * @param {*} _obj {} 
 * @param {*} variables 
 * @param {*} ctx GraphQL context
 */
async function addOrUpdateUser(_obj, variables, ctx) {
  try {
    await ctx.services.azstorage.addOrUpdateUser(variables.user, variables.update)
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: pick(error, 'name', 'message', 'code', 'statusCode'),
    }
  }
}

/**
 * Bulk add users
 * 
 * @param {*} _obj {} 
 * @param {*} variables 
 * @param {*} ctx GraphQL context
 */
async function bulkAddUsers(_obj, variables, ctx) {
  try {
    await ctx.services.azstorage.bulkAddUsers(variables.users)
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
    Mutation: { bulkAddUsers, addOrUpdateUser },
  },
  typeDef,
}
