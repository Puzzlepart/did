const { TableBatch } = require('azure-storage');
const { executeBatch } = require('../../../../utils/table');
const log = require('debug')('middleware/graphql/resolvers/mutation/unconfirmWeek');

/**
 * Unconfirm week
 * 
 * @param {*} _obj Unused object
 * @param {*} args Arguments
 * @param {*} context Context
 */
async function unconfirmWeek(_obj, { yearNumber, weekNumber }, context) {
    try {
        const entries = await context.services.storage.getConfirmedTimeEntries({ resourceId: context.user.profile.oid, yearNumber, weekNumber }, { noParse: true });
        if (entries.length == 0) return { success: false, error: 'No confirmed time entries to unconfirm' };
        log('Unconfirming week %s in %s with %s confirmed time entries', weekNumber, yearNumber, entries.length);
        const batch = entries.reduce((b, entity) => { b.deleteEntity(entity); return b; }, new TableBatch());
        await executeBatch(process.env.AZURE_STORAGE_CONFIRMEDTIMEENTRIES_TABLE_NAME, batch)
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

module.exports = unconfirmWeek;