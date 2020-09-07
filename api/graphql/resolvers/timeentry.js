const { find, first } = require('underscore')

const typeDef = `   
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

    input TimeEntryInput {
        id: String!
        projectId: String!
        manualMatch: Boolean
    }

    extend type Query {
        timeentries (
        projectId: String, 
        resourceId: String, 
        weekNumber: Int, 
        monthNumber: Int, 
        year: Int, 
        currentUser: Boolean
    ): [TimeEntry!]
    } 
`

async function timeentries(_obj, variables, ctx) {
    if (variables.currentUser) resourceId = ctx.user.id
    let [projects, customers, timeentries] = await Promise.all([
        ctx.services.storage.getProjects(),
        ctx.services.storage.getCustomers(),
        ctx.services.storage.getTimeEntries(variables)
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
        Mutation: {}
    },
    typeDef
}