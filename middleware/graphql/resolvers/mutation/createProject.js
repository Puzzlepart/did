const log = require('debug')('middleware/graphql/resolvers/mutation/createProject');
const _ = require('underscore');

/**
 * Create project
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
async function createProject(_obj, variables, context) {
    try {
        log('Attempting to create project in storage: ', JSON.stringify(variables));
        await context.services.storage.createProject(variables, context.user.profile.oid);
        log('Created project with key %s in storage', variables.projectKey);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = createProject;