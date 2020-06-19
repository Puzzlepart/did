const _ = require('underscore')
const TableUtil = require('../../../utils/table')
const { executeBatch, createBatch } = new TableUtil()

const typeDef = `  
  type Customer {
    key: String
    name: String
    description: String
    webLink: String
    externalSystemURL: String
    icon: String
    inactive: Boolean
  } 

  input CustomerInput {
    key: String
    name: String
    description: String
    icon: String
  }
  
  extend type Query {
    customers: [Customer!]!
  }  

  extend type Mutation {	
    createCustomer(customer: CustomerInput!): BaseResult   
    deleteCustomer(key: String!): BaseResult
  }
`


async function customers(_obj, _variables, ctx) {
  return await ctx.services.storage.getCustomers()
}

async function createCustomer(_obj, variables, ctx) {
  try {
    await ctx.services.storage.createCustomer(variables.customer, ctx.user.id)
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: _.omit(error, 'requestId') }
  }
}

async function deleteCustomer(_obj, variables, ctx) {
  try {
    let projects = await ctx.services.storage.getProjects(variables.key, { noParse: true })
    if (projects.length > 0) {
      const batch = projects.reduce((b, entity) => {
        b.deleteEntity(entity)
        return b
      }, createBatch())
      await executeBatch('Projects', batch)
    }
    await ctx.services.storage.deleteCustomer(variables.key)
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: _.omit(error, 'requestId') }
  }
}


module.exports = {
  resolvers: {
    Query: { customers },
    Mutation: { createCustomer, deleteCustomer }
  },
  typeDef
}