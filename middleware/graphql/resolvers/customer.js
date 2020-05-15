const _ = require('underscore')
const { TableBatch } = require('azure-storage')
const { executeBatch } = require('../../../utils/table')

const typeDef = `  
  type Customer {
    id: String
    key: String
    name: String
    description: String
    webLink: String
    externalSystemURL: String
    icon: String
    inactive: Boolean
  }
  
  extend type Query {
    customers: [Customer!]!
  }  

  extend type Mutation {	
    createCustomer(key: String!, name: String!, description: String!, icon: String!): BaseResult   
    deleteCustomer(key: String!): BaseResult
  }
`


async function customers(_obj, _args, context) {
  return await context.services.storage.getCustomers()
}

async function createCustomer(_obj, variables, context) {
  try {
    await context.services.storage.createCustomer(variables, context.user.profile.oid)
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: _.omit(error, 'requestId') }
  }
}

async function deleteCustomer(_obj, variables, context) {
  try {
    let projects = await context.services.storage.getProjects(variables.key, { noParse: true })
    if (projects.length > 0) {
      const batch = projects.reduce((b, entity) => {
        b.deleteEntity(entity)
        return b
      }, new TableBatch())
      await executeBatch('Projects', batch)
    }
    await context.services.storage.deleteCustomer(variables.key)
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