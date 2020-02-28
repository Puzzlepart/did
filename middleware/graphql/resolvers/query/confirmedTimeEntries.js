const _ = require('underscore');
const log = require('debug')('middleware/graphql/resolvers/query/confirmedTimeEntries');

/**
 * Confirmed time entries
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args (resourceId, weekNumber, yearNumber, projectId, currentUser, dateFormat)
 * @param {*} context Context
 * 
 * @returns The entries and their total duration in minutes
 */
async function confirmedTimeEntries(_obj, args, context) {
    let resourceId = args.resourceId;
    if (args.currentUser) resourceId = context.user.profile.oid;
    log('Retrieving confirmed time entries, projects and customers from storage: %s', JSON.stringify(args));
    let [projects, customers, confirmedTimeEntries] = await Promise.all([
        context.services.storage.getProjects(),
        context.services.storage.getCustomers(),
        context.services.storage.getConfirmedTimeEntries({ resourceId, weekNumber: args.weekNumber, yearNumber: args.yearNumber, projectId: args.projectId }, { dateFormat: args.dateFormat }),
    ]);
    let entries = confirmedTimeEntries.map(entry => ({
        ...entry,
        project: _.find(projects, p => p.id === entry.projectId),
        customer: _.find(customers, c => c.id === entry.customerId),
    }));
    log('Retrieved %s confirmed time entries, %s projects and %s customers from storage', entries.length, projects.length, customers.length);
    const duration = entries.reduce((sum, ent) => sum + ent.durationMinutes, 0);
    return { entries, duration };
};

module.exports = confirmedTimeEntries;