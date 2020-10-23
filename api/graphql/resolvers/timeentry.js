const { find, first, pick, omit } = require('underscore')
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
    webUrl: String
    project: Project
    customer: Customer
    resource: User
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
      sortAsc: Boolean
    ): [TimeEntry!]
  }
`

async function timeentries(_obj, variables, ctx) {
  if (variables.currentUser) {
    delete variables.currentUser
    variables.resourceId = ctx.user.id
  }
  let [users, projects, customers, timeentries] = await Promise.all([
    ctx.services.azstorage.getUsers(),
    ctx.services.azstorage.getProjects(),
    ctx.services.azstorage.getCustomers(),
    ctx.services.azstorage.getTimeEntries(
      omit(variables, 'sortAsc', 'forecast'),
      pick(variables, 'sortAsc', 'forecast')
    ),
  ])
  let entries = timeentries.map(entry => {
    let project
    let customer
    let resource = find(users, user => user.id === entry.resourceId)
    if (!!entry.projectId) {
      project = find(projects, p => p.id === entry.projectId)
      customer = find(customers, c => c.key === first(entry.projectId.split(' ')))
    }
    return {
      ...entry,
      project,
      customer,
      resource
    }
  })
  return entries
}

module.exports = {
  resolvers: {
    Query: { timeentries },
    Mutation: {},
  },
  typeDef,
}
