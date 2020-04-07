const { TableBatch } = require('azure-storage');
const { executeBatch } = require('../../../../utils/table');
const log = require('debug')('middleware/graphql/resolvers/mutation/unconfirmPeriod');
const _ = require('underscore');

/**
 * Unconfirm period
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
async function unconfirmPeriod(_obj, variables, context) {
    try {
        const entries = await context.services.storage.getConfirmedTimeEntries({
            resourceId: context.user.profile.oid,
            startDateTime: variables.startDateTime,
            endDateTime: variables.endDateTime,
        }, { noParse: true });
        if (entries.length == 0) return { success: false, error: 'No confirmed time entries to unconfirm for the specified period' };
        log('Unconfirming period %s to %s with %s confirmed time entries', variables.startDateTime, variables.endDateTime, entries.length);
        const batch = entries.reduce((b, entity) => {
            b.deleteEntity(entity);
            return b;
        }, new TableBatch());
        await executeBatch('ConfirmedTimeEntries', batch)
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
};

module.exports = unconfirmPeriod;