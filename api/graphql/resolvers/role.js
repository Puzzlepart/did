const { pick } = require('underscore')
const { gql } = require('apollo-server-express')

const typeDef = gql`
  """
  A type that describes a Role
  """
  type Role {
    name: String!
    permissions: [String]!
    icon: String
  }

  """
  Input object for Role used in Mutation addOrUpdateRole
  """
  input RoleInput {
    name: String!
    icon: String!
    permissions: [String]!
  }

  extend type Query {
    """
    Get roles
    """
    roles: [Role!]!
  }

  extend type Mutation {
    """
    Add or update role
    """
    addOrUpdateRole(role: RoleInput!, update: Boolean): BaseResult
  }
`

async function roles(_obj, _variables, ctx) {
  let roles = await ctx.services.azstorage.getRoles()
  return roles
}

async function addOrUpdateRole(_obj, variables, ctx) {
  try {
    await ctx.services.azstorage.addOrUpdateRole(variables.role, variables.update)
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
    Query: { roles },
    Mutation: { addOrUpdateRole },
  },
  typeDef,
}
