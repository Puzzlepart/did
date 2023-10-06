import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { TimesheetService } from '../../../services'
import { IAuthOptions } from '../../authChecker'
import { Context } from '../../context'
import { BaseResult } from '../types'
import {
  TimesheetOptions,
  TimesheetPeriodInput,
  TimesheetPeriodObject,
  TimesheetQuery,
  VacationSummary
} from './types'

/**
 * Resolver for `TimesheetPeriodObject`.
 *
 * `TimesheetService` are injected through
 * _dependendy injection_.
 *
 * @see https://typegraphql.com/docs/dependency-injection.html
 *
 * @category GraphQL Resolver
 */
@Service()
@Resolver(TimesheetPeriodObject)
export class TimesheetResolver {
  /**
   * Constructor for TimesheetResolver
   *
   * @param _timesheet - Timesheet service
   */
  // eslint-disable-next-line unicorn/empty-brace-spaces
  constructor(private readonly _timesheet: TimesheetService) {}

  /**
   * Get timesheet
   *
   * @param query - Query
   * @param options - Options
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Query(() => [TimesheetPeriodObject], {
    description: 'Get timesheet for startDate - endDate'
  })
  async timesheet(
    @Ctx() context: Context,
    @Arg('query') query: TimesheetQuery,
    @Arg('options') options: TimesheetOptions
  ) {
    try {
      return await this._timesheet.getTimesheet({
        ...query,
        ...options,
        configuration: context.userConfiguration?.timesheet || {}
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * Get vacation summary
   *
   * Total vacation days, used and remaining.
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Query(() => VacationSummary, {
    description:
      'Get vacation summary. Total vacation days, used and remaining.'
  })
  async vacation(@Ctx() context: Context) {
    try {
      return await this._timesheet.getVacation(
        context.subscription.settings.vacation
      )
    } catch (error) {
      throw error
    }
  }

  /**
   * Submit period
   *
   * @param period - Period
   * @param options - Timesheet options (forecast, tzoffset etc)
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
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
   * @param period - Period
   * @param forecast - Forecast
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
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
