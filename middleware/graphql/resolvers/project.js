const { find, filter, omit, first } = require('underscore')
const value = require('get-value')

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
  
  extend type Query {
    projects(customerKey: String, sortBy: String): [Project!]!
  }  

  extend type Mutation {
    createProject(customerKey: String!, projectKey: String!, name: String!, description: String!, icon: String!): BaseResult
    addLabelToProject(projectId: String!, labelId: String!): BaseResult
  }
`

async function createProject(_obj, variables, { user, services: { storage: StorageService } }) {
  try {
    await StorageService.createProject(variables, user.profile.oid)
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
  projects = projects.map(project => ({
    ...project,
    customer: find(customers, c => c.id === first(project.id.split(' '))),
    labels: filter(labels, label => {
      const labels = value(project, 'labels', { default: '' })
      return labels.indexOf(label.id) !== -1
    }),
  }))
  projects = projects.filter(p => p.customer)
  return projects
}

module.exports = {
  resolvers: {
    Query: { projects },
    Mutation: { createProject, addLabelToProject }
  },
  typeDef
}
