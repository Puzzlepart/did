import 'reflect-metadata'
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { TimesheetService } from '../../../services'
import { IAuthOptions } from '../../authChecker'
import { BaseResult } from '../types'
import {
  TimesheetOptions,
  TimesheetPeriodInput,
  TimesheetPeriodObject,
  TimesheetQuery
} from './types'

@Service()
@Resolver(TimesheetPeriodObject)
export class TimesheetResolver {
  /**
   * Constructor for TimesheetResolver
   *
   * @param {TimesheetService} _timesheet Timesheet service
   */
  constructor(private readonly _timesheet: TimesheetService) {}

  /**
   * Get timesheet
   *
   * Query: @timesheet
   *
   * @param {TimesheetQuery} query Query
   * @param {TimesheetOptions} options Options
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [TimesheetPeriodObject], { description: 'Get timesheet for startDate - endDate' })
  async timesheet(@Arg('query') query: TimesheetQuery, @Arg('options') options: TimesheetOptions) {
    try {
      return await this._timesheet.getTimesheet({ ...query, ...options })
    } catch (error) {
      throw error
    }
  }

  /**
   * Submit period
   *
   * @param {TimesheetPeriodInput} period Period
   * @param {TimesheetOptions} options Timesheet options (forecast, tzoffset etc)
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, {
    description:
      'Adds matched time entries for the specified period and an entry for the confirmed period'
  })
  async submitPeriod(
    @Arg('period', () => TimesheetPeriodInput) period: TimesheetPeriodInput,
    @Arg('options') options: TimesheetOptions
  ): Promise<BaseResult> {
    try {
      await this._timesheet.submitPeriod({ ...options, period })
      return {
        success: false,
        error: null
      }
    } catch (error) {
      return {
        success: false,
        error
      }
    }
  }

  /**
   * Unsubmit period
   *
   * @param {TimesheetPeriodInput} period Period
   * @param {boolean} forecast Forecast
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Mutation(() => BaseResult, {
    description:
      'Deletes time entries for the specified period and the entry for the confirmed period'
  })
  async unsubmitPeriod(
    @Arg('period', () => TimesheetPeriodInput) period: TimesheetPeriodInput,
    @Arg('options') options: TimesheetOptions
  ): Promise<BaseResult> {
    try {
      await this._timesheet.unsubmitPeriod({ ...options, period })
      return {
        success: true,
        error: null
      }
    } catch (error) {
      return {
        success: false,
        error
      }
    }
  }
}

export * from './types'
