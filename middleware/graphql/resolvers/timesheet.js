const { find, omit } = require('underscore')
const { formatDate, getMonthIndex, getWeek, startOfMonth, endOfMonth } = require('../../../utils')
const matchEvents = require('./timesheet.matching')
const { enrichProjects } = require('./project.utils')

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
    confirmed: Boolean
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

    projects = enrichProjects(projects, customers, labels)

    for (let i = 0; i < periods.length; i++) {
        let period = periods[i]
        let confirmed = await StorageService.getConfirmedPeriod(user.profile.oid, period.id)
        if (confirmed) {
            period.events = timeentries.map(entry => ({
                ...entry,
                project: find(projects, p => p.id === entry.projectId),
                customer: find(customers, c => c.id === entry.customerId),
            }))
            period.matchedEvents = period.events
            period.confirmed = true
            period.confirmedDuration = confirmed.hours
        } else {
            period.events = await GraphService.getEvents(period.startDateTime, period.endDateTime)
            period.events = matchEvents(period.events, projects, customers)
            period.matchedEvents = period.events.filter(evt => evt.project)
            period.confirmedDuration = 0
        }
        period.events = period.events.map(evt => ({
            ...evt,
            date: formatDate(evt.startTime, dateFormat, locale),
        }))
    }
    return periods
}

async function confirmPeriod(_obj, { entries, startDateTime, endDateTime }, { user, services: { graph: GraphService, storage: StorageService } }) {
    try {
        const period = `${getWeek(startDateTime)}_${getMonthIndex(startDateTime)}`
        let hours = 0;
        if (entries.length > 0) {
            const calendarView = await GraphService.getEvents(startDateTime, endDateTime)

            let timeentries = entries.map(entry => {
                const event = find(calendarView, e => e.id === entry.id)
                if (!event) return
                return { user, entry, event }
            }).filter(entry => entry)

            hours = await StorageService.addTimeEntries(timeentries)
        }
        await StorageService.addConfirmedPeriod(user.profile.oid, period, hours)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: omit(error, 'requestId') }
    }
}

async function unconfirmPeriod(_obj, { startDateTime, endDateTime }, { user, services: { storage: StorageService } }) {
    try {
        const period = `${getWeek(startDateTime)}_${getMonthIndex(startDateTime)}`
        await Promise.all([
            StorageService.deleteTimeEntries({
                resourceId: user.profile.oid,
                startDateTime,
                endDateTime,
            }, { noParse: true }),
            StorageService.removeConfirmedPeriod(user.profile.oid, period)
        ])
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