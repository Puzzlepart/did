const { first, filter, find, pick, contains } = require('underscore')
const { formatDate, getMonthIndex, getWeek } = require('../../../utils')
const EventMatching = require('./timesheet.matching')
const { connectEntities } = require('./project.utils')
const { getPeriods, connectTimeEntries } = require('./timesheet.utils')
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
    isSystemIgnored: Boolean
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
    isConfirmed: Boolean
    isForecasted: Boolean
    isForecast: Boolean
    confirmedDuration: Float!
    forecastedDuration: Float!
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
  Input object for TimesheetPeriod used in Mutation unsubmitPeriod
  """
  input TimesheetPeriodInput {
    id: String!
    startDateTime: String!
    endDateTime: String!
    matchedEvents: [EventInput]
    isForecast: Boolean
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
    submitPeriod(period: TimesheetPeriodInput!): BaseResult!

    """
    Deletes time entries for the specified period and the entry for the confirmed period
    """
    unsubmitPeriod(period: TimesheetPeriodInput!): BaseResult!
  }
`

async function timesheet(_obj, variables, ctx) {
  if (!ctx.services.msgraph) return { success: false, error: null }

  log('Quering timesheet from %s to %s', variables.startDateTime, variables.endDateTime)

  let periods = getPeriods(variables.startDateTime, variables.endDateTime, variables.locale)

  log(
    'Found %s periods: %j',
    periods.length,
    periods.map(p => pick(p, 'id', 'startDateTime', 'endDateTime'))
  )

  let [projects, customers, timeentries, labels] = await Promise.all([
    ctx.services.azstorage.getProjects(),
    ctx.services.azstorage.getCustomers(),
    ctx.services.azstorage.getTimeEntries(
      {
        resourceId: ctx.user.id,
        startDateTime: variables.startDateTime,
        endDateTime: variables.endDateTime,
      },
      { sortAsc: true }
    ),
    ctx.services.azstorage.getLabels(),
  ])

  projects = connectEntities(projects, customers, labels)

  const eventMatching = new EventMatching(projects, customers, labels)

  for (let i = 0; i < periods.length; i++) {
    let period = periods[i]
    period.confirmedDuration = 0
    period.forecastedDuration = 0
    let confirmed = await ctx.services.azstorage.getConfirmedPeriod(ctx.user.id, period.id)
    if (confirmed) {
      period.events = connectTimeEntries(timeentries, projects, customers, labels)
      period.matchedEvents = period.events
      period.isConfirmed = true
      period.confirmedDuration = confirmed.hours
    } else {
      if (period.isForecast) {
        let forecasted = await ctx.services.azstorage.getForecastedPeriod(ctx.user.id, period.id)
        period.isForecasted = !!forecasted
        if (period.isForecasted) {
          let timeentries = await ctx.services.azstorage.getTimeEntries(
            {
              resourceId: ctx.user.id,
              startDateTime: variables.startDateTime,
              endDateTime: variables.endDateTime,
            },
            true,
            { sortAsc: true }
          )
          period.events = connectTimeEntries(timeentries, projects, customers, labels)
          period.forecastedDuration = forecasted.hours
        }
      }
      if (!period.events) {
        period.events = await ctx.services.msgraph.getEvents(period.startDateTime, period.endDateTime)
        period.events = eventMatching.match(period.events)
      }
      period.matchedEvents = period.events.filter(evt => evt.project)
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
        ctx.services.msgraph.getEvents(variables.period.startDateTime, variables.period.endDateTime),
        ctx.services.azstorage.getLabels(),
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
      hours = await ctx.services.azstorage.addTimeEntries(variables.period.id, timeentries, variables.period.isForecast)
    }
    if (variables.period.isForecast) {
      log('Saving forecast period for %s for user %s', variables.period.id, ctx.user.id)
      await ctx.services.azstorage.addForecastedPeriod(variables.period.id, ctx.user.id, hours)
    } else {
      log('Saving confirmed period for %s for user %s', variables.period.id, ctx.user.id)
      await ctx.services.azstorage.addConfirmedPeriod(variables.period.id, ctx.user.id, hours)
    }
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
    const { id, isForecast } = variables.period
    await ctx.services.azstorage.deleteTimeEntries(id, ctx.user.id, isForecast)
    if (isForecast) {
      await ctx.services.azstorage.removeForecastedPeriod(id, ctx.user.id)
    } else {
      await ctx.services.azstorage.removeConfirmedPeriod(id, ctx.user.id)
    }
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
