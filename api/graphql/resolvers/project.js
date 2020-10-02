const { pick } = require('underscore')
const { connectEntities } = require('./project.utils')
const { gql } = require('apollo-server-express')

const typeDef = gql`
  """
  A type that describes a Project
  """
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

  """
  Input object for Project used in Mutation createOrUpdateProject
  """
  input ProjectInput {
    key: String
    name: String
    description: String
    webLink: String
    externalSystemURL: String
    icon: String
    customerKey: String
    inactive: Boolean
    labels: [String]
    createOutlookCategory: Boolean
  }

  extend type Query {
    """
    Get projects
    """
    projects(customerKey: String, sortBy: String): [Project!]!
  }

  extend type Mutation {
    """
    Create or update project
    """
    createOrUpdateProject(project: ProjectInput!, update: Boolean): BaseResult
  }
`

async function createOrUpdateProject(_obj, variables, ctx) {
  try {
    const id = await ctx.services.azstorage.createOrUpdateProject(variables.project, ctx.user.id, variables.update)
    if (variables.project.createOutlookCategory) {
      await ctx.services.graph.createOutlookCategory(id)
    }
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: pick(error, 'name', 'message', 'code', 'statusCode'),
    }
  }
}

async function projects(_obj, variables, ctx) {
  let [projects, customers, labels] = await Promise.all([
    ctx.services.azstorage.getProjects(variables.customerKey, {
      sortBy: variables.sortBy,
    }),
    ctx.services.azstorage.getCustomers(),
    ctx.services.azstorage.getLabels(),
  ])
  projects = connectEntities(projects, customers, labels)
  return projects
}

module.exports = {
  resolvers: {
    Query: { projects },
    Mutation: { createOrUpdateProject },
  },
  typeDef,
}
