const log = require('debug')('middleware/graphql/resolvers/mutation/deleteCustomer');
const _ = require('underscore');
const { TableBatch } = require('azure-storage');
const { executeBatch } = require('../../../../utils/table');

/**
 * Delete customer
 * 
 * @param {*} _obj Unused object
 * @param {*} args Args
 * @param {*} context Context
 */
async function deleteCustomer(_obj, args, context) {
    log('Deleting customer: %s', args.key);
    try {
        let projects = await context.services.storage.getProjects(args.key, { noParse: true });
        if (projects.length > 0) {
            log('Deleting %s projects connected to customer %s', projects.length, args.key);
            const batch = projects.reduce((b, entity) => {
                b.deleteEntity(entity);
                return b;
            }, new TableBatch());
            await executeBatch('Projects', batch);
        }
        await context.services.storage.deleteCustomer(args.key);
        log('Customer %s and connected projects deleted', args.key);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
}

module.exports = deleteCustomer;