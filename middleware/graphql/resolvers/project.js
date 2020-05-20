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
  }
  
  extend type Query {
    projects(customerKey: String, sortBy: String): [Project!]!
  }  

  extend type Mutation {
    createProject(project: ProjectInput!): BaseResult
    addLabelToProject(projectId: String!, labelId: String!): BaseResult
  }
`

async function createProject(_obj, { project }, { user, services: { storage: StorageService } }) {
  try {
    await StorageService.createProject(project, user.id)
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: omit(error, 'requestId') }
  }
}

async function addLabelToProject(_obj, { projectId, labelId }, { services: { storage: StorageService } }) {
  try {
    await StorageService.addLabelToProject(projectId, labelId)
    return { success: true, error: null }
  } catch (error) {
    return { success: false, error: omit(error, 'requestId') }
  }
}

async function projects(_obj, variables, { services: { storage: StorageService } }) {
  let [
    projects,
    customers,
    labels,
  ] = await Promise.all([
    StorageService.getProjects(variables.customerKey, { sortBy: variables.sortBy }),
    StorageService.getCustomers(),
    StorageService.getLabels(),
  ])
  projects = connectEntities(projects, customers, labels)
  return projects
}

module.exports = {
  resolvers: {
    Query: { projects },
    Mutation: { createProject, addLabelToProject }
  },
  typeDef
}
