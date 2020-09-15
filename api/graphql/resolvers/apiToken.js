const { find, pick } = require('underscore')
const jwt = require('jsonwebtoken')
const { gql } = require('apollo-server-express')

const typeDef = gql`
  """
  A type that describes a ApiToken
  """
  type ApiToken {
    name: String
    timestamp: String
  }

  extend type Query {
    """
    Get all API tokens for the subscription
    """
    apiTokens: [ApiToken!]!
  }

  extend type Mutation {
    """
    Add API token with the specified name
    """
    addApiToken(name: String!): String

    """
    Delete the API token with the specified name
    """
    deleteApiToken(name: String): BaseResult
  }
`

async function apiTokens(_obj, variables, ctx) {
  const tokens = await ctx.services.subscription.getApiTokens(ctx.user.tenantId)
  return tokens
}

async function addApiToken(_obj, variables, ctx) {
  let token = jwt.sign(
    {
      data: pick(ctx.user, 'id', 'tenantId'),
    },
    process.env.API_TOKEN_SECRET
  )
  const entry = await ctx.services.subscription.addApiToken(
    variables.name,
    ctx.user.tenantId,
    token
  )
  return entry ? token : null
}

async function deleteApiToken(_obj, variables, ctx) {
  try {
    await ctx.services.subscription.deleteApiToken(
      variables.name,
      ctx.user.tenantId
    )
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
    Query: { apiTokens },
    Mutation: { addApiToken, deleteApiToken },
  },
  typeDef,
}
