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
        year: Int, 
        currentUser: Boolean
    ): [TimeEntry!]
    } 
`

async function timeentries(
    _obj,
    { resourceId, weekNumber, year, projectId, currentUser },
    { user, services: { storage: StorageService } }
) {
    if (currentUser) resourceId = user.profile.oid
    console.log(resourceId)
    let [projects, customers, timeentries] = await Promise.all([
        StorageService.getProjects(),
        StorageService.getCustomers(),
        StorageService.getTimeEntries({
            resourceId,
            weekNumber,
            year,
            projectId
        })
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