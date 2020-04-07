const _ = require('underscore');
const log = require('debug')('middleware/graphql/resolvers/query/getProjects');

/**
 * Projects
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
async function projects(_obj, variables, context) {
    log('Retrieving projects from storage. customerKey: %s, sortBy: %s', variables.customerKey, variables.sortBy);
    let [projects, customers] = await Promise.all([
        context.services.storage.getProjects(variables.customerKey, { sortBy: variables.sortBy }),
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