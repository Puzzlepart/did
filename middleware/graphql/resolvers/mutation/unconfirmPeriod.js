const { TableBatch } = require('azure-storage');
const { executeBatch } = require('../../../../utils/table');
const log = require('debug')('middleware/graphql/resolvers/mutation/unconfirmPeriod');
const _ = require('underscore');

/**
 * Unconfirm period
 * 
 * @param {*} _obj Unused object
 * @param {*} args Arguments
 * @param {*} context Context
 */
async function unconfirmPeriod(_obj, { startDateTime, endDateTime }, context) {
    try {
        const entries = await context.services.storage.getConfirmedTimeEntries({ resourceId: context.user.profile.oid, startDateTime, endDateTime }, { noParse: true });
        if (entries.length == 0) return { success: false, error: 'No confirmed time entries to unconfirm for the specified period' };
        log('Unconfirming period %s to %s with %s confirmed time entries', startDateTime, endDateTime, entries.length);
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