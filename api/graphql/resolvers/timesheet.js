const { first, filter, find, pick, contains } = require('underscore')
const { formatDate, getMonthIndex, getWeek } = require('../../../utils')
const EventMatching = require('./timesheet.matching')
const { connectEntities } = require('./project.utils')
const { getPeriods } = require('./timesheet.utils')
const value = require('get-value')
const log = require('debug')('api/graphql/resolvers/timesheet')
const { gql } = require('apollo-server-express')

const typeDef = gql`
  """
  A type that describes a TimeEntry
  """
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
    labels: [Label]
    error: EventError
  }

  """
  A type that describes a TimesheetPeriod
  """
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

  """
  Input object for Event used in Mutation submitPeriod
  """
  input EventInput {
    id: String!
    projectId: String!
    manualMatch: Boolean
  }

  """
  Input object for TimeEntry used in Mutation submitPeriod
  """
  input TimeEntryInput {
    id: String!
    projectId: String!
    manualMatch: Boolean
  }

  """
  Input object for TimesheetPeriod used in Mutation unsubmitPeriod
  """
  input TimesheetPeriodInput {
    id: String!
    startDateTime: String!
    endDateTime: String!
    matchedEvents: [EventInput]
  }

  extend type Query {
    """
    Get timesheet for startDateTime - endDateTime
    """
    timesheet(startDateTime: String!, endDateTime: String!, dateFormat: String!, locale: String!): [TimesheetPeriod]!
  }

  extend type Mutation {
    """
    Adds matched time entries for the specified period and an entry for the confirmed period
    """
    submitPeriod(entries: [TimeEntryInput!], period: TimesheetPeriodInput!, forecast: Boolean): BaseResult!

    """
    Deletes time entries for the specified period and the entry for the confirmed period
    """
    unsubmitPeriod(period: TimesheetPeriodInput!, forecast: Boolean): BaseResult!
  }
`

async function timesheet(_obj, variables, ctx) {
  if (!ctx.services.graph) return { success: false, error: null }

  log('Quering timesheet from %s to %s', variables.startDateTime, variables.endDateTime)

  let periods = getPeriods(variables.startDateTime, variables.endDateTime, variables.locale)

  log(
    'Found %s periods: %j',
    periods.length,
    periods.map(p => pick(p, 'id', 'startDateTime', 'endDateTime'))
  )

  let [projects, customers, timeentries, labels] = await Promise.all([
    ctx.services.storage.getProjects(),
    ctx.services.storage.getCustomers(),
    ctx.services.storage.getTimeEntries(
      {
        resourceId: ctx.user.id,
        startDateTime: variables.startDateTime,
        endDateTime: variables.endDateTime,
      },
      { sortAsc: true }
    ),
    ctx.services.storage.getLabels(),
  ])

  projects = connectEntities(projects, customers, labels)

  const eventMatching = new EventMatching(projects, customers, labels)

  for (let i = 0; i < periods.length; i++) {
    let period = periods[i]
    let confirmed = await ctx.services.storage.getConfirmedPeriod(ctx.user.id, period.id)
    if (confirmed) {
      period.events = timeentries.map(entry => {
        const customerKey = first(entry.projectId.split(' '))
        return {
          ...entry,
          project: find(projects, p => p.id === entry.projectId),
          customer: find(customers, c => c.key === customerKey),
          labels: filter(labels, lbl => {
            const str = value(entry, 'labels', { default: '' })
            return str.indexOf(lbl.name) !== -1
          }),
        }
      })
      period.matchedEvents = period.events
      period.confirmed = true
      period.confirmedDuration = confirmed.hours
    } else {
      period.events = await ctx.services.graph.getEvents(period.startDateTime, period.endDateTime)
      period.events = eventMatching.match(period.events)
      period.matchedEvents = period.events.filter(evt => evt.project)
      period.confirmedDuration = 0
    }
    period.events = period.events.map(evt => ({
      ...evt,
      date: formatDate(evt.startDateTime, variables.dateFormat, variables.locale),
    }))
  }
  return periods
}

async function submitPeriod(_obj, variables, ctx) {
  try {
    let hours = 0
    if (variables.period.matchedEvents.length > 0) {
      const [events, labels] = await Promise.all([
        ctx.services.graph.getEvents(variables.period.startDateTime, variables.period.endDateTime),
        ctx.services.storage.getLabels(),
      ])

      let timeentries = variables.period.matchedEvents
        .map(entry => {
          const event = find(events, e => e.id === entry.id)
          if (!event) return
          const _labels = filter(labels, lbl => contains(event.categories, lbl.name)).map(lbl => lbl.name)
          return {
            user: ctx.user,
            entry,
            event,
            labels: _labels,
          }
        })
        .filter(entry => entry)

      hours = await ctx.services.storage.addTimeEntries(variables.period.id, timeentries)
    }
    await ctx.services.storage.addConfirmedPeriod(variables.period.id, ctx.user.id, hours)
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: pick(error, 'name', 'message', 'code', 'statusCode'),
    }
  }
}

async function unsubmitPeriod(_obj, variables, ctx) {
  try {
    await ctx.services.storage.deleteUserTimeEntries(variables.period.id, ctx.user.id)
    await ctx.services.storage.removeConfirmedPeriod(variables.period.id, ctx.user.id)
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: pick(error, 'name', 'message', 'code', 'statusCode'),
    }
  }
}

module.exports = {
  resolvers: {
    Query: { timesheet },
    Mutation: { submitPeriod, unsubmitPeriod },
  },
  typeDef,
}
