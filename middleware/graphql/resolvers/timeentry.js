const _ = require('underscore');

const typeDef = `   
    type TimeEntry {
        id: String
        key: String
        eventId: String!
        title: String!
        description: String
        startTime: String
        endTime: String
        webLink: String
        durationHours: Float
        durationMinutes: Int
        projectId: String
        weekNumber: Int
        monthNumber: Int
        yearNumber: Int
        resourceId: String
        resourceEmail: String
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
        yearNumber: Int, 
        currentUser: Boolean, 
        dateFormat: String
    ): [TimeEntry!]
    } 
`;

async function timeentries(_obj, variables, context) {
    let resourceId = variables.resourceId;
    if (variables.currentUser) resourceId = context.user.profile.oid;
    let [projects, customers, timeentries] = await Promise.all([
        context.services.storage.getProjects(),
        context.services.storage.getCustomers(),
        context.services.storage.getTimeEntries({ resourceId, weekNumber: variables.weekNumber, yearNumber: variables.yearNumber, projectId: variables.projectId }, { dateFormat: variables.dateFormat }),
    ]);
    let entries = timeentries.map(entry => ({
        ...entry,
        project: entry.projectId && _.find(projects, p => p.id === entry.projectId),
        customer: entry.customerId && _.find(customers, c => c.id === entry.customerId),
    }));
    console.log('timeentries', timeentries.length);
    return entries;
};

module.exports = {
    resolvers: {
        Query: { timeentries },
        Mutation: {}
    },
    typeDef
}