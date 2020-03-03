const _ = require('underscore');
const log = require('debug')('middleware/graphql/resolvers/query/getProjects');

/**
 * Projects
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args (customerKey, sortBy)
 * @param {*} context Context
 */
async function projects(_obj, args, context) {
    log('Retrieving projects from storage. customerKey: %s, sortBy: %s', args.customerKey, args.sortBy);
    let [projects, customers] = await Promise.all([
        context.services.storage.getProjects(args.customerKey, { sortBy: args.sortBy }),
        context.services.storage.getCustomers(),
    ]);
    log('Retrieved %s projects from storage', projects.length);
    projects = projects.map(p => ({
        ...p,
        customer: _.find(customers, c => c.id === p.id.split(' ')[0]),
    }));
    projects = projects.filter(p => p.customer);
    return projects;
}

module.exports = projects;