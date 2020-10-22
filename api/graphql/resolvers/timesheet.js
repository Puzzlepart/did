const { filter, find, pick, contains, isEmpty } = require('underscore')
const { formatDate, getMonthIndex, getWeek } = require('../../../utils')
const EventMatching = require('./timesheet.matching')
const { connectEntities } = require('./project.utils')
const { getPeriods, connectTimeEntries } = require('./timesheet.utils')
const value = require('get-value')
const { gql, AuthenticationError, ApolloError } = require('apollo-server-express')

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
    forecastedHours: Float!
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
    forecastedHours: Float
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
    submitPeriod(period: TimesheetPeriodInput!, forecast: Boolean!): BaseResult!

    """
    Deletes time entries for the specified period and the entry for the confirmed period
    """
    unsubmitPeriod(period: TimesheetPeriodInput!, forecast: Boolean!): BaseResult!
  }
`

/**
 * Timesheet
 * 
 * @param {*} _obj {}
 * @param {*} variables Variables: startDateTime, endDateTime, dateFormat, locale
 * @param {*} ctx GraphQL context
 */
async function timesheet(_obj, variables, ctx) {
  if (!ctx.services.msgraph) throw new AuthenticationError()
  try {
    let periods = getPeriods(variables.startDateTime, variables.endDateTime, variables.locale)

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
      let [confirmed, forecasted] = await Promise.all([
        ctx.services.azstorage.getConfirmedPeriod(ctx.user.id, period.id),
        ctx.services.azstorage.getForecastedPeriod(ctx.user.id, period.id)
      ])
      period.isForecasted = !!forecasted
      period.forecastedHours = period.isForecasted && forecasted.hours
      period.isConfirmed = !!confirmed
      if (period.isConfirmed) {
        period.events = connectTimeEntries(
          filter(timeentries, entry => entry.periodId === period.id),
          projects,
          customers,
          labels,
        )
        period.matchedEvents = period.events
      } else {
        if (period.isForecast && period.isForecasted) {
          let timeentries = await ctx.services.azstorage.getTimeEntries(
            {
              resourceId: ctx.user.id,
              startDateTime: variables.startDateTime,
              endDateTime: variables.endDateTime,
            },
            { sortAsc: true, forecast: true }
          )
          period.events = connectTimeEntries(timeentries, projects, customers, labels)
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
  } catch (error) {
    throw new ApolloError(error.message, error.code, { statusCode: error.statusCode })
  }
}

/**
 * Submit period
 * 
 * @param {*} _obj {}
 * @param {*} variables Variables: period, forecast
 * @param {*} ctx GraphQL context
 */
async function submitPeriod(_obj, variables, ctx) {
  try {
    let { period, forecast } = { ...variables }
    period.hours = 0
    console.log(period)
    if (!isEmpty(period.matchedEvents)) {
      const [events, labels] = await Promise.all([
        ctx.services.msgraph.getEvents(period.startDateTime, period.endDateTime),
        ctx.services.azstorage.getLabels(),
      ])
      let timeentries = period.matchedEvents.reduce((arr, event) => {
        const entry = {
          ...pick(event, 'projectId', 'manualMatch'),
          event: find(events, e => e.id === event.id),
        }
        if (!entry.event) return arr
        entry.labels = filter(labels, lbl => contains(event.categories, lbl.name)).map(lbl => lbl.name)
        return [...arr, entry]
      }, [])
      period.hours = await ctx.services.azstorage.addTimeEntries(
        pick(period, 'id'),
        ctx.user,
        timeentries,
        forecast
      )
    }
    if (forecast) {
      await ctx.services.azstorage.addForecastedPeriod(
        pick(period, 'id', 'hours'),
        ctx.user.id
      )
    }
    else {
      await ctx.services.azstorage.addConfirmedPeriod(
        pick(period, 'id', 'hours', 'forecastedHours'),
        ctx.user.id
      )
    }
    return { success: true, error: null }
  } catch (error) {
    return {
      success: false,
      error: pick(error, 'name', 'message', 'code', 'statusCode'),
    }
  }
}

/**
 * Unsubmit period
 * 
 * @param {*} _obj {}
 * @param {*} variables Variables: period, forecast
 * @param {*} ctx GraphQL context
 */
async function unsubmitPeriod(_obj, variables, ctx) {
  try {
    if (variables.forecast) {
      await Promise.all([
        ctx.services.azstorage.deleteTimeEntries(variables.period.id, ctx.user.id, true),
        ctx.services.azstorage.removeForecastedPeriod(variables.period.id, ctx.user.id)
      ])
    } else {
      await Promise.all([
        ctx.services.azstorage.deleteTimeEntries(variables.period.id, ctx.user.id, false),
        ctx.services.azstorage.removeConfirmedPeriod(variables.period.id, ctx.user.id)
      ])
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
