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
    await ctx.services.storage.createOrUpdateProject(
      variables.project,
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

async function projects(_obj, variables, ctx) {
  let [projects, customers, labels] = await Promise.all([
    ctx.services.storage.getProjects(variables.customerKey, {
      sortBy: variables.sortBy,
    }),
    ctx.services.storage.getCustomers(),
    ctx.services.storage.getLabels(),
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
