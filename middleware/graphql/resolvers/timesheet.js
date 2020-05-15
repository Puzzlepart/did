const { filter, find, omit } = require('underscore')
const { TableBatch } = require('azure-storage')
const value = require('get-value')
const { executeBatch, entGen } = require('../../../utils/table')
const { getDurationHours, formatDate, getMonthIndex, getWeek, startOfMonth, endOfMonth, getYear } = require('../../../utils')
const matchEvents = require('./timesheet.matching')

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
	duration: Float
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
	week: Int!
	month: String!
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
`

async function timesheet(_obj, { startDateTime, endDateTime, dateFormat, locale }, { user, services: { graph: GraphService, storage: StorageService } }) {
    const week = getWeek(startDateTime)
    const startMonthIdx = getMonthIndex(startDateTime)
    const endMonthIdx = getMonthIndex(endDateTime)
    const isSplit = endMonthIdx !== startMonthIdx

    let periods = [{
        id: `${week}_${startMonthIdx}`,
        week,
        month: formatDate(startDateTime, 'MMMM', locale),
        startDateTime,
        endDateTime: isSplit
            ? endOfMonth(startDateTime).toISOString()
            : endDateTime,
    }]

    if (isSplit) {
        periods.push({
            id: `${week}_${endMonthIdx}`,
            week,
            month: formatDate(endDateTime, 'MMMM', locale),
            startDateTime: startOfMonth(endDateTime).toISOString(),
            endDateTime: endDateTime,
        })
    }

    let [
        projects,
        customers,
        timeentries,
        labels,
    ] = await Promise.all([
        StorageService.getProjects(),
        StorageService.getCustomers(),
        StorageService.getTimeEntries({
            resourceId: user.profile.oid,
            startDateTime,
            endDateTime,
        }),
        StorageService.getLabels(),
    ])

    projects = projects
        .map(project => ({
            ...project,
            customer: find(customers, c => c.id.toUpperCase() === project.customerKey.toUpperCase()),
            labels: filter(labels, label => {
                const labels = value(project, 'labels', { default: '' })
                return labels.indexOf(label.id) !== -1
            }),
        }))
        .filter(p => p.customer)

    for (let i = 0; i < periods.length; i++) {
        let period = periods[i]
        period.confirmedDuration = 0
        const entries = [...timeentries].filter(entry => `${entry.weekNumber}_${entry.monthNumber}` === period.id)
        const isConfirmed = entries.length > 0
        if (isConfirmed) {
            period.events = entries.map(entry => ({
                ...entry,
                project: find(projects, p => p.id === entry.projectId),
                customer: find(customers, c => c.id === entry.customerId),
            }))
            period.matchedEvents = period.events
            period.confirmedDuration = period.events.reduce((sum, evt) => sum + evt.duration, 0)
        } else {
            period.events = await GraphService.getEvents(period.startDateTime, period.endDateTime)
            period.events = matchEvents(period.events, projects, customers)
            period.matchedEvents = period.events.filter(evt => evt.project)
        }
        period.events = period.events.map(evt => ({
            ...evt,
            date: formatDate(evt.startTime, dateFormat, locale),
        }))
    }
    return periods
}

async function confirmPeriod(_obj, { entries, startDateTime, endDateTime }, { user, tenantId, services: { graph: GraphService } }) {
    try {
        const calendarView = await GraphService.getEvents(startDateTime, endDateTime)
        let entities = entries.map(entry => {
            const event = calendarView.filter(e => e.id === entry.id)[0]
            if (!event) return
            return {
                PartitionKey: entGen.String(user.profile.oid),
                RowKey: entGen.String(entry.id),
                ResourceName: entGen.String(user.profile.displayName),
                Title: entGen.String(event.title),
                Description: entGen.String(event.body),
                StartTime: entGen.DateTime(event.startTime),
                EndTime: entGen.DateTime(event.endTime),
                Duration: entGen.Double(getDurationHours(event.startTime, event.endTime)),
                ProjectId: entGen.String(entry.projectId),
                WebLink: entGen.String(event.webLink),
                WeekNumber: entGen.Int32(getWeek(event.startTime)),
                MonthNumber: entGen.Int32(getMonthIndex(event.startTime)),
                Year: entGen.Int32(getYear(event.startTime)),
                ManualMatch: entGen.Boolean(entry.isManualMatch),
            }
        }).filter(entry => entry)
        const batch = new TableBatch()
        entities.forEach(entity => batch.insertEntity(entity))
        await executeBatch('TimeEntries', batch)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: omit(error, 'requestId') }
    }
}

async function unconfirmPeriod(_obj, { startDateTime, endDateTime }, { user, services: { storage: StorageService } }) {
    try {
        const entities = await StorageService.getTimeEntries({
            resourceId: user.profile.oid,
            startDateTime,
            endDateTime,
        }, { noParse: true })
        const batch = new TableBatch()
        entities.forEach(entity => batch.deleteEntity(entity))
        await executeBatch('TimeEntries', batch)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: omit(error, 'requestId') }
    }
}

module.exports = {
    resolvers: {
        Query: { timesheet },
        Mutation: { confirmPeriod, unconfirmPeriod }
    },
    typeDef
}