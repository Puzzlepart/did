const log = require('debug')('middleware/graphql/resolvers/mutation/deleteCustomer');
const _ = require('underscore');
const { TableBatch } = require('azure-storage');
const { executeBatch } = require('../../../../utils/table');

/**
 * Delete customer
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
async function deleteCustomer(_obj, variables, context) {
    log('Deleting customer: %s', variables.key);
    try {
        let projects = await context.services.storage.getProjects(variables.key, { noParse: true });
        if (projects.length > 0) {
            log('Deleting %s projects connected to customer %s', projects.length, variables.key);
            const batch = projects.reduce((b, entity) => {
                b.deleteEntity(entity);
                return b;
            }, new TableBatch());
            await executeBatch('Projects', batch);
        }
        await context.services.storage.deleteCustomer(variables.key);
        log('Customer %s and connected projects deleted', variables.key);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = deleteCustomer;