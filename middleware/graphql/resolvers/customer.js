const _ = require('underscore')
const { executeBatch, createBatch } = require('../../../utils/table')

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


async function customers(_obj, _args, { services: { storage: StorageService } }) {
  return await StorageService.getCustomers()
}

async function createCustomer(_obj, { customer }, { user, services: { storage: StorageService } }) {
  try {
    await StorageService.createCustomer(customer, user.id)
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: _.omit(error, 'requestId') }
  }
}

async function deleteCustomer(_obj, variables, { services: { storage: StorageService } }) {
  try {
    let projects = await StorageService.getProjects(variables.key, { noParse: true })
    if (projects.length > 0) {
      const batch = projects.reduce((b, entity) => {
        b.deleteEntity(entity)
        return b
      }, createBatch())
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