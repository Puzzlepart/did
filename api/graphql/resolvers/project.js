const { omit } = require('underscore')
const { connectEntities } = require('./project.utils')

const typeDef = `  
  type Project {
    id: String
    key: String
    name: String
    description: String
    webLink: String
    externalSystemURL: String
    icon: String
    customerKey: String
    customer: Customer
    inactive: Boolean
    labels: [Label]
  }

  input ProjectInput {
    key: String
    name: String
    description: String
    icon: String
    customerKey: String
    labels: [String]
  }
  
  extend type Query {
    projects(customerKey: String, sortBy: String): [Project!]!
  }  

  extend type Mutation {
    createOrUpdateProject(project: ProjectInput!): BaseResult
  }
`

async function createOrUpdateProject(_obj, variables, ctx) {
  try {
    await ctx.services.storage.createOrUpdateProject(variables.project, ctx.user.id)
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: omit(error, 'requestId') }
  }
}

async function projects(_obj, variables, ctx) {
  let [
    projects,
    customers,
    labels,
  ] = await Promise.all([
    ctx.services.storage.getProjects(variables.customerKey, { sortBy: variables.sortBy }),
    ctx.services.storage.getCustomers(),
    ctx.services.storage.getLabels(),
  ])
  projects = connectEntities(projects, customers, labels)
  return projects
}

module.exports = {
  resolvers: {
    Query: { projects },
    Mutation: { createOrUpdateProject }
  },
  typeDef
}
