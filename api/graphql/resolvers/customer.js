const { pick } = require('underscore')
const AzTableUtilities = require('../../../utils/table')
const { executeBatch, createAzBatch } = new AzTableUtilities()
const { gql } = require('apollo-server-express')

const typeDef = gql`
  """
  A type that describes a Customer
  """
  type Customer {
    key: String
    name: String
    description: String
    webLink: String
    externalSystemURL: String
    icon: String
    inactive: Boolean
  }

  """
  Input object for Customer used in Mutation createOrUpdateCustomer
  """
  input CustomerInput {
    key: String
    name: String
    description: String
    webLink: String
    externalSystemURL: String
    icon: String
    inactive: Boolean
  }

  extend type Query {
    """
    Get all API tokens for the subscription
    """
    customers(sortBy: String): [Customer!]!
  }

  extend type Mutation {
    """
    Create or update customer
    """
    createOrUpdateCustomer(
      customer: CustomerInput!
      update: Boolean
    ): BaseResult

    """
    Delete customer
    """
    deleteCustomer(key: String!): BaseResult
  }
`

async function customers(_obj, variables, ctx) {
  return await ctx.services.storage.getCustomers({ sortBy: variables.sortBy })
}

async function createOrUpdateCustomer(_obj, variables, ctx) {
  try {
    await ctx.services.storage.createOrUpdateCustomer(
      variables.customer,
      ctx.user.id,
      variables.update
    )
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: pick(error, 'name', 'message', 'code', 'statusCode'),
    }
  }
}

async function deleteCustomer(_obj, variables, ctx) {
  try {
    let projects = await ctx.services.storage.getProjects(variables.key, {
      noParse: true,
    })
    if (projects.length > 0) {
      const batch = projects.reduce((b, entity) => {
        b.deleteEntity(entity)
        return b
      }, createAzBatch())
      await executeBatch('Projects', batch)
    }
    await ctx.services.storage.deleteCustomer(variables.key)
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
    Query: { customers },
    Mutation: { createOrUpdateCustomer, deleteCustomer },
  },
  typeDef,
}
