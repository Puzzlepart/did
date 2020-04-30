const debug = require('debug')('middleware/graphql/resolvers/mutation/createProject');
import _ from 'underscore';

/**
 * Create project
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
export default async function createProject(_obj, variables, context) {
    try {
        debug('Attempting to create project in storage: ', JSON.stringify(variables));
        await context.services.storage.createProject(variables, context.user.profile.oid);
        debug('Created project with key %s in storage', variables.projectKey);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}