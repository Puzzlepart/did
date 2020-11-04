import { ApolloError } from 'apollo-server-express'
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { contains, filter, find, isEmpty, pick } from 'underscore'
import { formatDate } from '../../../utils'
import { AzStorageService, MSGraphService } from '../../services'
import { IAuthOptions } from '../authChecker'
import { Context } from '../context'
import { connectEntities } from './project.utils'
import EventMatching from './timesheet.matching'
import { TimesheetPeriodInput, TimesheetPeriodObject, TimesheetQuery } from './timesheet.types'
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
  constructor(private readonly _azstorage: AzStorageService, private readonly _msgraph: MSGraphService) { }
  /**
   * Get timesheet
   *
   * @param {TimesheetQuery} query Query
   * @param {string} locale Locale
   * @param {string} dateFormat Date format
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [TimesheetPeriodObject], { description: 'Get timesheet for startDateTime - endDateTime' })
  async timesheet(
    @Arg('query') query: TimesheetQuery,
    @Arg('locale') locale: string,
    @Arg('dateFormat') dateFormat: string,
    @Ctx() ctx: Context
  ) {
    try {
      const periods = getPeriods(query.startDateTime, query.endDateTime, locale)
      // eslint-disable-next-line prefer-const
      let [projects, customers, timeentries, labels] = await Promise.all([
        this._azstorage.getProjects(),
        this._azstorage.getCustomers(),
        this._azstorage.getTimeEntries(
          {
            resourceId: ctx.user.id,
            startDateTime: query.startDateTime,
            endDateTime: query.endDateTime
          },
          { sortAsc: true }
        ),
        this._azstorage.getLabels()
      ])

      projects = connectEntities(projects, customers, labels)

      for (let i = 0; i < periods.length; i++) {
        const period = periods[i]
        const [confirmed, forecasted] = await Promise.all([
          this._azstorage.getConfirmedPeriod(ctx.user.id, period.id),
          this._azstorage.getForecastedPeriod(ctx.user.id, period.id)
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
          period.matchedEvents = period.events
        } else {
          const eventMatching = new EventMatching(projects, customers, labels)
          period.events = await this._msgraph.getEvents(period.startDateTime, period.endDateTime)
          period.events = eventMatching.matchEvents(period.events)
          period.matchedEvents = period.events.filter((evt) => !!evt.project)
        }
        period.events = period.events.map((evt) => ({
          ...evt,
          date: formatDate(evt.startDateTime, dateFormat, locale)
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
          this._msgraph.getEvents(period.startDateTime, period.endDateTime),
          this._azstorage.getLabels()
        ])
        const timeentries = period.matchedEvents.reduce((arr, me) => {
          const entry: any = {
            ...pick(me, 'projectId', 'manualMatch'),
            event: find(events, (e) => e.id === me.id)
          }
          if (!entry.event) return arr
          entry.labels = filter(labels, (lbl) => contains(entry.event.categories, lbl.name)).map((lbl) => lbl.name)
          return [...arr, entry]
        }, [])
        hours = await this._azstorage.addTimeEntries(ctx.user.id, period.id, timeentries, forecast)
      }
      if (forecast) {
        await this._azstorage.addForecastedPeriod(ctx.user.id, period.id, hours)
      } else {
        await this._azstorage.addConfirmedPeriod(ctx.user.id, period.id, hours, period.forecastedHours)
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
          this._azstorage.deleteTimeEntries(period.id, ctx.user.id, true),
          this._azstorage.removeForecastedPeriod(period.id, ctx.user.id)
        ])
      } else {
        await Promise.all([
          this._azstorage.deleteTimeEntries(period.id, ctx.user.id, false),
          this._azstorage.removeConfirmedPeriod(period.id, ctx.user.id)
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
