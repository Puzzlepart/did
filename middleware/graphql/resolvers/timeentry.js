const _ = require('underscore')

const typeDef = `   
    type TimeEntry {
        id: String
        key: String
        title: String!
        description: String
        startTime: String
        endTime: String
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
        isManualMatch: Boolean
    }

    extend type Query {
        timeentries (
        projectId: String, 
        resourceId: String, 
        weekNumber: Int, 
        year: Int, 
        currentUser: Boolean, 
        dateFormat: String
    ): [TimeEntry!]
    } 
`

async function timeentries(_obj, variables, context) {
    let resourceId = variables.resourceId
    if (variables.currentUser) resourceId = context.user.profile.oid
    let [projects, customers, timeentries] = await Promise.all([
        context.services.storage.getProjects(),
        context.services.storage.getCustomers(),
        context.services.storage.getTimeEntries({ resourceId, weekNumber: variables.weekNumber, year: variables.year, projectId: variables.projectId }, { dateFormat: variables.dateFormat }),
    ])
    let entries = timeentries.map(entry => ({
        ...entry,
        project: entry.projectId && _.find(projects, p => p.id === entry.projectId),
        customer: entry.customerId && _.find(customers, c => c.id === entry.customerId),
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