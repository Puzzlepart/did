const { find, first } = require('underscore')
const { gql } = require('apollo-server-express')

const typeDef = gql`
  """
  A type that describes a TimeEntry
  """
  type TimeEntry {
    id: String
    key: String
    title: String!
    description: String
    startDateTime: String
    endDateTime: String
    webLink: String
    duration: Float
    projectId: String
    weekNumber: Int
    monthNumber: Int
    year: Int
    resourceName: String
    webUrl: String
    project: Project
    customer: Customer
  }

  extend type Query {
    """
    Get time entries
    """
    timeentries(
      startDateTime: String
      endDateTime: String
      projectId: String
      resourceId: String
      weekNumber: Int
      monthNumber: Int
      startMonthIndex: Int
      endMonthIndex: Int
      year: Int
      currentUser: Boolean
      forecast: Boolean
    ): [TimeEntry!]
  }
`

async function timeentries(_obj, variables, ctx) {
  if (variables.currentUser) resourceId = ctx.user.id
  let [projects, customers, timeentries] = await Promise.all([
    ctx.services.azstorage.getProjects(),
    ctx.services.azstorage.getCustomers(),
    ctx.services.azstorage.getTimeEntries(variables, variables.forecast),
  ])
  let entries = timeentries.map(entry => ({
    ...entry,
    project: entry.projectId && find(projects, p => p.id === entry.projectId),
    customer: entry.projectId && find(customers, c => c.key === first(entry.projectId.split(' '))),
  }))
  return entries
}

module.exports = {
  resolvers: {
    Query: { timeentries },
    Mutation: {},
  },
  typeDef,
}
