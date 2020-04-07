const { TableBatch } = require('azure-storage');
const { executeBatch, entGen } = require('../../../../utils/table');
const { getDurationHours, getDurationMinutes, getWeek, getMonthIndex, getYear } = require('../../../../utils');
const uuid = require('uuid/v1');
const log = require('debug')('middleware/graphql/resolvers/mutation/confirmPeriod');
const _ = require('underscore');

/**
 * Confirm period
 * 
 * @param {*} _obj The previous object, which for a field on the root Query type is often not used.
 * @param {*} variables Variables sent by the client
 * @param {*} context Context
 */
async function confirmPeriod(_obj, variables, context) {
    if (!variables.entries || variables.entries.length === 0) {
        return {
            success: false,
            error: 'No entries to confirm for the specified period.',
        };
    }
    try {
        log('Confirming period %s to %s', variables.startDateTime, variables.endDateTime);
        const calendarView = await context.services.graph.getEvents(variables.startDateTime, variables.endDateTime);
        let batch = variables.entries.reduce((b, entry) => {
            const event = calendarView.filter(e => e.id === entry.id)[0];
            if (!event) return;
            log('Confirming entry with id %s', entry.id);
            b.insertEntity({
                PartitionKey: entGen.String(context.tenantId),
                RowKey: entGen.String(uuid()),
                EventId: entGen.String(entry.id),
                Title: entGen.String(event.title),
                Description: entGen.String(event.body),
                StartTime: entGen.DateTime(event.startTime),
                EndTime: entGen.DateTime(event.endTime),
                DurationHours: entGen.Double(getDurationHours(event.startTime, event.endTime)),
                DurationMinutes: entGen.Int32(getDurationMinutes(event.startTime, event.endTime)),
                ProjectId: entGen.String(entry.projectId),
                WebLink: entGen.String(event.webLink),
                WeekNumber: entGen.Int32(getWeek(event.startTime)),
                MonthNumber: entGen.Int32(getMonthIndex(event.startTime)),
                YearNumber: entGen.Int32(getYear(event.startTime)),
                ResourceId: entGen.String(context.user.profile.oid),
                ResourceEmail: entGen.String(context.user.profile.email),
                ResourceName: entGen.String(context.user.profile.displayName),
                ManualMatch: entGen.Boolean(entry.isManualMatch),
            });
            return b;
        }, new TableBatch());
        await executeBatch('ConfirmedTimeEntries', batch)
        return { success: true, error: null };
    } catch (error) {
        console.log(error);
        return { success: false, error: _.omit(error, 'requestId') };
    }
};

module.exports = confirmPeriod;