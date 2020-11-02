import { pick } from 'underscore'
import { gql } from 'apollo-server-express'

export const typeDef = gql`
  """
  A type that describes a Label
  """
  type Label {
    name: String!
    description: String
    color: String!
    icon: String
  }

  """
  Input object for Label used in Mutation addOrUpdateLabel
  """
  input LabelInput {
    name: String!
    description: String
    color: String!
    icon: String
  }

  extend type Query {
    """
    Get labels
    """
    labels: [Label!]!
  }

  extend type Mutation {
    """
    Add or update label
    """
    addOrUpdateLabel(label: LabelInput!, update: Boolean): BaseResult

    """
    Delete label
    """
    deleteLabel(name: String!): BaseResult
  }
`

async function labels(_obj, _variables, ctx) {
  const labels = await ctx.services.azstorage.getLabels()
  return labels
}

async function addOrUpdateLabel(_obj, variables, ctx) {
  try {
    await ctx.services.azstorage.addOrUpdateLabel(variables.label, ctx.user.id, variables.update)
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: pick(error, 'name', 'message', 'code', 'statusCode'),
    }
  }
}

async function deleteLabel(_obj, variables, ctx) {
  try {
    await ctx.services.azstorage.deleteLabel(variables.name)
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: pick(error, 'name', 'message', 'code', 'statusCode'),
    }
  }
}

export const resolvers = {
  Query: { labels },
  Mutation: { addOrUpdateLabel, deleteLabel },
}
