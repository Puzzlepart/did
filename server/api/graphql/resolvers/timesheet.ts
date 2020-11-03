/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ApolloError, AuthenticationError } from 'apollo-server-express'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { contains, filter, find, isEmpty, pick } from 'underscore'
import { formatDate } from '../../../utils'
import { Context } from '../context'
import { BaseResult } from '../types'
import { connectEntities } from './project.utils'
import EventMatching from './timesheet.matching'
import { TimesheetPeriodInput, TimesheetPeriodObject, TimesheetQuery } from './timesheet.types'
import { connectTimeEntries, getPeriods } from './timesheet.utils'

@Resolver(TimesheetPeriodObject)
export class TimesheetResolver {
  /**
   * Get timesheet
   *
   * @param {TimesheetQuery} query Query
   * @param {string} locale Locale
   * @param {string} dateFormat Date format
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Query(() => [TimesheetPeriodObject], { description: 'Get timesheet for startDateTime - endDateTime' })
  async timesheet(
    @Arg('query') query: TimesheetQuery,
    @Arg('locale') locale: string,
    @Arg('dateFormat') dateFormat: string,
    @Ctx() ctx: Context
  ) {
    if (!ctx.services.msgraph) throw new AuthenticationError('')
    try {
      const periods = getPeriods(query.startDateTime, query.endDateTime, locale)
      // eslint-disable-next-line prefer-const
      let [projects, customers, timeentries, labels] = await Promise.all([
        ctx.services.azstorage.getProjects(),
        ctx.services.azstorage.getCustomers(),
        ctx.services.azstorage.getTimeEntries(
          {
            resourceId: ctx.user.id,
            startDateTime: query.startDateTime,
            endDateTime: query.endDateTime,
          },
          { sortAsc: true }
        ),
        ctx.services.azstorage.getLabels(),
      ])

      projects = connectEntities(projects, customers, labels)

      for (let i = 0; i < periods.length; i++) {
        const period = periods[i]
        const [confirmed, forecasted] = await Promise.all([
          ctx.services.azstorage.getConfirmedPeriod(ctx.user.id, period.id),
          ctx.services.azstorage.getForecastedPeriod(ctx.user.id, period.id),
        ])
        period.isForecasted = !!forecasted
        period.forecastedHours = period.isForecasted && forecasted.hours
        period.isConfirmed = !!confirmed
        if (period.isConfirmed) {
          period.events = connectTimeEntries(
            filter(timeentries, entry => entry.periodId === period.id),
            projects,
            customers,
            labels
          )
          period.matchedEvents = period.events
        } else {
          const eventMatching = new EventMatching(projects, customers, labels)
          period.events = await ctx.services.msgraph.getEvents(period.startDateTime, period.endDateTime)
          period.events = eventMatching.matchEvents(period.events)
          period.matchedEvents = period.events.filter(evt => !!evt.project)
        }
        period.events = period.events.map(evt => ({
          ...evt,
          date: formatDate(evt.startDateTime, dateFormat, locale),
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
   * @param {TimesheetPeriodInput} period Period
   * @param {boolean} forecast Forecast
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Mutation(() => BaseResult, {
    description: 'Adds matched time entries for the specified period and an entry for the confirmed period',
  })
  async submitPeriod(
    @Arg('period', () => TimesheetPeriodInput) period: TimesheetPeriodInput,
    @Arg('forecast', { nullable: true }) forecast: boolean,
    @Ctx() ctx: Context
  ): Promise<BaseResult> {
    try {
      let hours = 0
      if (!isEmpty(period.matchedEvents)) {
        const [events, labels] = await Promise.all([
          ctx.services.msgraph.getEvents(period.startDateTime, period.endDateTime),
          ctx.services.azstorage.getLabels(),
        ])
        const timeentries = period.matchedEvents.reduce((arr, me) => {
          const entry: any = {
            ...pick(me, 'projectId', 'manualMatch'),
            event: find(events, e => e.id === me.id),
          }
          if (!entry.event) return arr
          entry.labels = filter(labels, lbl => contains(entry.event.categories, lbl.name)).map(lbl => lbl.name)
          return [...arr, entry]
        }, [])
        hours = await ctx.services.azstorage.addTimeEntries(ctx.user.id, period.id, timeentries, forecast)
      }
      if (forecast) {
        await ctx.services.azstorage.addForecastedPeriod(ctx.user.id, period.id, hours)
      } else {
        await ctx.services.azstorage.addConfirmedPeriod(ctx.user.id, period.id, hours, period.forecastedHours)
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
   * @param {TimesheetPeriodInput} period Period
   * @param {boolean} forecast Forecast
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Mutation(() => BaseResult, {
    description: 'Deletes time entries for the specified period and the entry for the confirmed period',
  })
  async unsubmitPeriod(
    @Arg('period', () => TimesheetPeriodInput) period: TimesheetPeriodInput,
    @Arg('forecast', { nullable: true }) forecast: boolean,
    @Ctx() ctx: Context
  ): Promise<BaseResult> {
    try {
      if (forecast) {
        await Promise.all([
          ctx.services.azstorage.deleteTimeEntries(period.id, ctx.user.id, true),
          ctx.services.azstorage.removeForecastedPeriod(period.id, ctx.user.id),
        ])
      } else {
        await Promise.all([
          ctx.services.azstorage.deleteTimeEntries(period.id, ctx.user.id, false),
          ctx.services.azstorage.removeConfirmedPeriod(period.id, ctx.user.id),
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
}

export * from './timeentry.types'
