const log = require('debug')('middleware/graphql/resolvers/mutation/createProject');

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
        await context.services.storage.createProject(args);
        log('Created project with key %s in storage', args.projectKey);
        return { success: true, error: null };
    } catch (error) {
        log('Failed to create project with key %s in storage: %s', args.key, error.message);
        return { success: false, error: error.message };
    }
}

module.exports = createProject;