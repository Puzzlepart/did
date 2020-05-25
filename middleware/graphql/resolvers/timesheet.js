const { find, omit } = require('underscore')
const { formatDate, getMonthIndex, getWeek } = require('../../../utils')
const matchEvents = require('./timesheet.matching')
const { connectEntities } = require('./project.utils')
const { getPeriods } = require('./timesheet.utils')

const typeDef = `  
 type Event {
	id: String
	title: String
	body: String
	isOrganizer: Boolean
	startDateTime: String
	endDateTime: String
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

  input EventInput {
    id: String!
    projectId: String!
    manualMatch: Boolean
  }

  input TimesheetPeriodInput {
	id: String!
	startDateTime: String!
    endDateTime: String!
    matchedEvents: [EventInput]
  }
  
  extend type Query {
    timesheet(startDateTime: String!, endDateTime: String!, dateFormat: String!): [TimesheetPeriod]!
  } 

  extend type Mutation {
    confirmPeriod(entries: [TimeEntryInput!], period: TimesheetPeriodInput!): BaseResult!
	unconfirmPeriod(period: TimesheetPeriodInput!): BaseResult!
  }
`

/**
 * Query: Get timesheet
 * 
 * Returns an array of periods (week_month_year)
 */
async function timesheet(_obj, { startDateTime, endDateTime, dateFormat }, { user, services: { graph: GraphService, storage: StorageService } }) {
    let periods = getPeriods(startDateTime, endDateTime, user.locale)

    let [
        projects,
        customers,
        timeentries,
        labels,
    ] = await Promise.all([
        StorageService.getProjects(),
        StorageService.getCustomers(),
        StorageService.getTimeEntries({
            resourceId: user.id,
            startDateTime,
            endDateTime,
        }),
        StorageService.getLabels(),
    ])

    projects = connectEntities(projects, customers, labels)

    for (let i = 0; i < periods.length; i++) {
        let period = periods[i]
        let confirmed = await StorageService.getConfirmedPeriod(user.id, period.id)
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
            date: formatDate(evt.startDateTime, dateFormat, locale),
        }))
    }
    return periods
}

/**
 * Mutation: Confirm period
 * 
 * Adds matched time entries for the specified period and an entry for the confirmed period
 */
async function confirmPeriod(_obj, { period }, { user, services: { graph: GraphService, storage: StorageService } }) {
    try {
        let hours = 0;
        if (period.matchedEvents.length > 0) {
            const calendarView = await GraphService.getEvents(period.startDateTime, period.endDateTime)

            let timeentries = period.matchedEvents.map(entry => {
                const event = find(calendarView, e => e.id === entry.id)
                if (!event) return
                return { user, entry, event }
            }).filter(entry => entry)

            hours = await StorageService.addTimeEntries(period.id, timeentries)
        }
        await StorageService.addConfirmedPeriod(period.id, user.id, hours)
        return { success: true, error: null }
    } catch (error) {
        return { success: false, error: omit(error, 'requestId') }
    }
}

/**
 * Mutation: Unconfirm period
 * 
 * Deletes time entries for the specified period and the entry for the confirmed period
 */
async function unconfirmPeriod(_obj, { period }, { user, services: { storage: StorageService } }) {
    try {
        await Promise.all([
            StorageService.deleteUserTimeEntries(period, user.id),
            StorageService.removeConfirmedPeriod(period.id, user.id)
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