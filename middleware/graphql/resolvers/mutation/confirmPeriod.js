const { TableBatch } = require('azure-storage');
const { executeBatch, entGen } = require('../../../../utils/table');
const { getDurationHours, getDurationMinutes, getWeek, getMonth, getYear } = require('../../../../utils');
const uuid = require('uuid/v1');
const log = require('debug')('middleware/graphql/resolvers/mutation/confirmPeriod');

/**
 * Confirm period
 * 
 * @param {*} _obj Unused object
 * @param {*} args Arguments
 * @param {*} context Context
 */
async function confirmPeriod(_obj, { startDateTime, endDateTime, entries }, context) {
    if (!entries || entries.length === 0) return { success: false, error: 'No entries to confirm for the specified period.' };
    try {
        log('Confirming period %s to %s', startDateTime, endDateTime);
        const calendarView = await context.services.graph.getEvents(startDateTime, endDateTime, 24);
        let batch = entries.reduce((b, entry) => {
            const event = calendarView.filter(e => e.id === entry.id)[0];
            if (!event) return;
            log('Confirming entry with id %s', entry.id);
            b.insertEntity({
                PartitionKey: entGen.String(context.tid),
                RowKey: entGen.String(uuid()),
                EventId: entGen.String(entry.id),
                Title: entGen.String(event.title),
                Description: entGen.String(event.body),
                StartTime: entGen.DateTime(new Date(event.startTime)),
                EndTime: entGen.DateTime(new Date(event.endTime)),
                DurationHours: entGen.Double(getDurationHours(event.startTime, event.endTime)),
                DurationMinutes: entGen.Int32(getDurationMinutes(event.startTime, event.endTime)),
                ProjectId: entGen.String(entry.projectId),
                WebLink: entGen.String(event.webLink),
                WeekNumber: entGen.Int32(getWeek(event.startTime)),
                MonthNumber: entGen.Int32(getMonth(event.startTime)),
                YearNumber: entGen.Int32(getYear(event.startTime)),
                ResourceId: entGen.String(context.user.profile.oid),
                ResourceEmail: entGen.String(context.user.profile.email),
                ResourceName: entGen.String(context.user.profile.displayName),
            });
            return b;
        }, new TableBatch());
        await executeBatch(process.env.AZURE_STORAGE_CONFIRMEDTIMEENTRIES_TABLE_NAME, batch)
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

module.exports = confirmPeriod;