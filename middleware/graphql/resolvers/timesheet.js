const _ = require('underscore');
const { TableBatch } = require('azure-storage');
const { executeBatch, addEntity, entGen } = require('../../../utils/table');
const { getDurationHours, getDurationMinutes, formatDate, getMonthIndex, getWeek, startOfMonth, endOfMonth, getYear } = require('../../../utils');
const uuidv4 = require('uuid').v4;
const matchEvents = require('./timesheet.matching');

const typeDef = `  
 type Event {
	id: String
	key: String
	title: String
	body: String
	isOrganizer: Boolean
	startTime: String
	endTime: String
	date: String
	durationHours: Float
	durationMinutes: Int
	project: Project
	customer: Customer
	projectKey: String
	customerKey: String
	suggestedProject: Project
	webLink: String
	lastModifiedDateTime: String
	error: EventError
  }

  type TimesheetPeriod {
	id: String!
	name: String!
	startDateTime: String!
	endDateTime: String!
	events: [Event!]!
	matchedEvents: [Event!]!
	confirmedDuration: Float!
  }
  
  extend type Query {
    timesheet(startDateTime: String!, endDateTime: String!, dateFormat: String!, locale: String!): [TimesheetPeriod]!
  } 

  extend type Mutation {
    confirmPeriod(entries: [TimeEntryInput!], startDateTime: String!, endDateTime: String!): BaseResult!
	unconfirmPeriod(startDateTime: String!, endDateTime: String!): BaseResult!
  }
`;

async function timesheet(_obj, { startDateTime, endDateTime, dateFormat, locale }, { user, services: { graph: GraphService, storage: StorageService } }) {
    const week = getWeek(startDateTime);
    const startMonthIdx = getMonthIndex(startDateTime);
    const endMonthIdx = getMonthIndex(endDateTime);
    const isSplit = endMonthIdx !== startMonthIdx;

    let periods = [{
        id: `${week}_${startMonthIdx}`,
        name: `Week ${week}`,
        startDateTime,
        endDateTime: isSplit
            ? endOfMonth(startDateTime).toISOString()
            : endDateTime,
    }];

    if (isSplit) {
        periods.push({
            id: `${week}_${endMonthIdx}`,
            startDateTime: startOfMonth(endDateTime).toISOString(),
            endDateTime: endDateTime,
        });
        periods = periods.map(period => ({ ...period, name: `Week ${week} (${formatDate(period.startDateTime, 'MMMM')})` }))
    }

    let [projects, customers, timeentries] = await Promise.all([
        StorageService.getProjects(),
        StorageService.getCustomers(),
        StorageService.getTimeEntries({
            resourceId: user.profile.oid,
            startDateTime,
            endDateTime,
        }),
    ]);

    projects = projects
        .map(p => ({
            ...p,
            customer: _.find(customers, c => c.id.toUpperCase() === p.customerKey.toUpperCase())
        }))
        .filter(p => p.customer);

    for (let i = 0; i < periods.length; i++) {
        let period = periods[i];
        period.confirmedDuration = 0;
        const entries = [...timeentries].filter(entry => `${entry.weekNumber}_${entry.monthNumber}` === period.id);
        const isConfirmed = entries.length > 0;
        if (isConfirmed) {
            period.events = entries.map(entry => ({
                ...entry,
                project: _.find(projects, p => p.id === entry.projectId),
                customer: _.find(customers, c => c.id === entry.customerId),
            }));
            period.matchedEvents = period.events;
            period.confirmedDuration = period.events.reduce((sum, evt) => sum + evt.durationMinutes, 0);
        } else {
            period.events = await GraphService.getEvents(period.startDateTime, period.endDateTime);
            period.events = matchEvents(period.events, projects, customers);
            period.matchedEvents = period.events.filter(evt => evt.project);
        }
        period.events = period.events.map(evt => ({
            ...evt,
            date: formatDate(evt.startTime, dateFormat, locale),
        }));
    }
    return periods;
};

async function confirmPeriod(_obj, { entries, startDateTime, endDateTime }, { user, tenantId, services: { graph: GraphService } }) {
    try {
        let entities = [];
        if (!entries || entries.length === 0) {
            const key = uuidv4();
            entities.push({
                PartitionKey: entGen.String(tenantId),
                RowKey: entGen.String(key),
                EventId: entGen.String(key),
                DurationHours: entGen.Double(0),
                DurationMinutes: entGen.Int32(0),
                StartTime: entGen.DateTime(startDateTime),
                EndTime: entGen.DateTime(endDateTime),
                ResourceId: entGen.String(user.profile.oid),
                WeekNumber: entGen.Int32(getWeek(startDateTime)),
                MonthNumber: entGen.Int32(getMonthIndex(startDateTime)),
                YearNumber: entGen.Int32(getYear(startDateTime))
            });
        } else {
            const calendarView = await GraphService.getEvents(startDateTime, endDateTime);
            entities = entries.map(entry => {
                const event = calendarView.filter(e => e.id === entry.id)[0];
                if (!event) return;
                return {
                    PartitionKey: entGen.String(tenantId),
                    RowKey: entGen.String(uuidv4()),
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
                    ResourceId: entGen.String(user.profile.oid),
                    ResourceEmail: entGen.String(user.profile.email),
                    ResourceName: entGen.String(user.profile.displayName),
                    ManualMatch: entGen.Boolean(entry.isManualMatch),
                };
            }).filter(entry => entry);
        }
        if (entities.length === 1) {
            await addEntity('ConfirmedTimeEntries', _.first(entities));
        } else {
            const batch = new TableBatch();
            entities.forEach(entity => batch.insertEntity(entity));
            await executeBatch('ConfirmedTimeEntries', batch);
        }
        return { success: true, error: null };
    } catch (error) {
        console.log(error);
        return { success: false, error: _.omit(error, 'requestId') };
    }
};

async function unconfirmPeriod(_obj, { startDateTime, endDateTime }, { user, services: { storage: StorageService } }) {
    try {
        const entities = await StorageService.getTimeEntries({
            resourceId: user.profile.oid,
            startDateTime,
            endDateTime,
        }, { noParse: true });
        const batch = new TableBatch();
        entities.forEach(entity => batch.deleteEntity(entity));
        await executeBatch('ConfirmedTimeEntries', batch);
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error: _.omit(error, 'requestId') };
    }
};

module.exports = {
    resolvers: {
        Query: { timesheet },
        Mutation: { confirmPeriod, unconfirmPeriod }
    },
    typeDef
}