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
    let [projects, customers, labels] = await Promise.all([
        context.services.storage.getProjects(args.customerKey, args.sortBy),
        context.services.storage.getCustomers(),
        context.services.storage.getLabels(),
    ]);
    log('Retrieved %s projects from storage', projects.length);
    projects = projects.map(project => ({
        ...project,
        customer: _.find(customers, c => c.id === project.id.split(' ')[0]),
        labels: _.filter(labels, l => (project.labels || '').indexOf(l.id) !== -1),
    }));
    projects = projects.filter(p => p.customer);
    return projects;
}

module.exports = projects;