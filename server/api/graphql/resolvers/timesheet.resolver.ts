import { ApolloError } from 'apollo-server-express'
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { contains, filter, find, isEmpty, pick } from 'underscore'
import { formatDate } from '../../../utils/date'
import { AzStorageService, MSGraphService } from '../../services'
import { IAuthOptions } from '../authChecker'
import { Context } from '../context'
import { connectEntities } from './project.utils'
import EventMatching from './timesheet.matching'
import { TimesheetOptions, TimesheetPeriodInput, TimesheetPeriodObject, TimesheetQuery } from './timesheet.types'
import { connectTimeEntries, getPeriods } from './timesheet.utils'
import { BaseResult } from './types'

@Service()
@Resolver(TimesheetPeriodObject)
export class TimesheetResolver {
  /**
   * Constructor for TimesheetResolver
   *
   * AzStorageService and MSGraphService is automatically injected using Container from typedi
   *
   * @param {AzStorageService} _azstorage AzStorageService
   * @param {MSGraphService} _msgraph MSGraphService
   */
  constructor(private readonly _azstorage: AzStorageService, private readonly _msgraph: MSGraphService) {}
  /**
   * Get timesheet
   *
   * @param {TimesheetQuery} query Query
   * @param {TimesheetOptions} options Options
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [TimesheetPeriodObject], { description: 'Get timesheet for startDate - endDate' })
  async timesheet(@Arg('query') query: TimesheetQuery, @Arg('options') options: TimesheetOptions, @Ctx() ctx: Context) {
    try {
      const periods = getPeriods(query.startDate, query.endDate, options.locale)
      // eslint-disable-next-line prefer-const
      let [projects, customers, timeentries, labels] = await Promise.all([
        this._azstorage.getProjects(),
        this._azstorage.getCustomers(),
        this._azstorage.getTimeEntries(
          {
            resourceId: ctx.userId,
            startDateTime: query.startDate,
            endDateTime: query.endDate
          },
          { sortAsc: true }
        ),
        this._azstorage.getLabels()
      ])

      projects = connectEntities(projects, customers, labels)

      for (let i = 0; i < periods.length; i++) {
        const period = periods[i]
        const [confirmed, forecasted] = await Promise.all([
          this._azstorage.getConfirmedPeriod(ctx.userId, period.id),
          this._azstorage.getForecastedPeriod(ctx.userId, period.id)
        ])
        period.isForecasted = !!forecasted
        period.forecastedHours = period.isForecasted && forecasted.hours
        period.isConfirmed = !!confirmed
        if (period.isConfirmed) {
          period.events = connectTimeEntries(
            filter(timeentries, (entry) => entry.periodId === period.id),
            projects,
            customers,
            labels
          )
        } else {
          const eventMatching = new EventMatching(projects, customers, labels)
          const events = await this._msgraph.getEvents(period.startDate, period.endDate)
          period.events = eventMatching.matchEvents(events)
        }
        period.events = period.events.map((evt) => ({
          ...evt,
          date: formatDate(evt.startDateTime, options.dateFormat, options.locale)
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
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, {
    description: 'Adds matched time entries for the specified period and an entry for the confirmed period'
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
          this._msgraph.getEvents(period.startDate, period.endDate),
          this._azstorage.getLabels()
        ])
        const timeentries = period.matchedEvents.reduce((arr, me) => {
          const event = find(events, (e) => e.id === me.id)
          if (!event) return arr
          const entry = {
            ...pick(me, 'projectId', 'manualMatch'),
            event: find(events, (e) => e.id === me.id),
            labels: filter(labels, (lbl) => contains(event.categories, lbl.name)).map((lbl) => lbl.name)
          }
          return [...arr, entry]
        }, [])
        hours = await this._azstorage.addTimeEntries(ctx.userId, period.id, timeentries, forecast)
      }
      if (forecast) {
        await this._azstorage.addForecastedPeriod(ctx.userId, period.id, hours)
      } else {
        await this._azstorage.addConfirmedPeriod(ctx.userId, period.id, hours, period.forecastedHours)
      }
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
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
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, {
    description: 'Deletes time entries for the specified period and the entry for the confirmed period'
  })
  async unsubmitPeriod(
    @Arg('period', () => TimesheetPeriodInput) period: TimesheetPeriodInput,
    @Arg('forecast', { nullable: true }) forecast: boolean,
    @Ctx() ctx: Context
  ): Promise<BaseResult> {
    try {
      if (forecast) {
        await Promise.all([
          this._azstorage.deleteTimeEntries(period.id, ctx.userId, true),
          this._azstorage.removeForecastedPeriod(period.id, ctx.userId)
        ])
      } else {
        await Promise.all([
          this._azstorage.deleteTimeEntries(period.id, ctx.userId, false),
          this._azstorage.removeConfirmedPeriod(period.id, ctx.userId)
        ])
      }
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: pick(error, 'name', 'message', 'code', 'statusCode')
      }
    }
  }
}
