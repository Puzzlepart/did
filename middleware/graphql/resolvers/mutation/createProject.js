const log = require('debug')('middleware/graphql/resolvers/mutation/createProject');
const _ = require('underscore');

/**
 * Create project
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args
 * @param {*} context Context
 */
async function createProject(_obj, args, context) {
    try {
        log('Attempting to create project in storage: ', JSON.stringify(args));
        await context.services.storage.createProject(args, context.user.profile.oid);
        log('Created project with key %s in storage', args.projectKey);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = createProject;