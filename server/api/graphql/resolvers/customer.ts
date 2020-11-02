import { pick } from 'underscore'
const AzTableUtilities = require('../../../utils/table').default
const { executeBatch, createAzBatch } = new AzTableUtilities()
import { gql } from 'apollo-server-express'
import { IGraphQLContext } from '../IGraphQLContext'

export const typeDef = gql`
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
    createOrUpdateCustomer(customer: CustomerInput!, update: Boolean): BaseResult

    """
    Delete customer
    """
    deleteCustomer(key: String!): BaseResult
  }
`

/**
 * Get customers
 * 
 * @param {any} _obj {}
 * @param {any} variables Variables
 * @param {IGraphQLContext} ctx GraphQL context
 */
async function customers(_obj: any, variables: any, ctx: IGraphQLContext) {
  return await ctx.services.azstorage.getCustomers({ sortBy: variables.sortBy })
}

/**
 * Create or update customer
 * 
 * @param {any} _obj {}
 * @param {any} variables Variables
 * @param {IGraphQLContext} ctx GraphQL context
 */
async function createOrUpdateCustomer(_obj: any, variables: any, ctx: IGraphQLContext) {
  try {
    await ctx.services.azstorage.createOrUpdateCustomer(variables.customer, ctx.user.id, variables.update)
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: pick(error, 'name', 'message', 'code', 'statusCode'),
    }
  }
}

/**
 * Delete customer
 * 
 * @param {any} _obj {}
 * @param {any} variables Variables
 * @param {IGraphQLContext} ctx GraphQL context
 */
async function deleteCustomer(_obj: any, variables: any, ctx: IGraphQLContext) {
  try {
    const projects = await ctx.services.azstorage.getProjects(variables.key, {
      noParse: true,
    })
    if (projects.length > 0) {
      const batch = projects.reduce((b, entity) => {
        b.deleteEntity(entity)
        return b
      }, createAzBatch())
      await executeBatch('Projects', batch)
    }
    await ctx.services.azstorage.deleteCustomer(variables.key)
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: pick(error, 'name', 'message', 'code', 'statusCode'),
    }
  }
}

export const resolvers = {
  Query: { customers },
  Mutation: { createOrUpdateCustomer, deleteCustomer },
}