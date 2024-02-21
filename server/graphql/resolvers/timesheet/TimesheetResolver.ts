/* eslint-disable unicorn/empty-brace-spaces */
/* eslint-disable unicorn/prevent-abbreviations */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { DateObject } from '../../../../shared/utils/date'
import {
  ConfirmedPeriodsService,
  TimesheetService,
  UserService
} from '../../../services'
import { IAuthOptions } from '../../authChecker'
import { RequestContext } from '../../requestContext'
import { BaseResult } from '../types'
import {
  TimesheetOptions,
  TimesheetPeriodInput,
  TimesheetPeriodObject,
  TimesheetQuery,
  VacationSummary,
  WeekStatusQueryResult
} from './types'
import { PermissionScope } from '../../../../shared/config/security'

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
   * @param _timesheetSvc - Timesheet service
   * @param _userSvc - User service
   */
  constructor(
    private readonly _timesheetSvc: TimesheetService,
    private readonly _userSvc: UserService,
    private readonly _cpSvc: ConfirmedPeriodsService
  ) {}

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
    @Ctx() context: RequestContext,
    @Arg('query') query: TimesheetQuery,
    @Arg('options') options: TimesheetOptions
  ) {
    try {
      return await this._timesheetSvc.getTimesheet({
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
  async vacation(@Ctx() context: RequestContext) {
    try {
      return await this._timesheetSvc.getVacation(
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
      await this._timesheetSvc.submitPeriod({ ...options, period })
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
      await this._timesheetSvc.unsubmitPeriod({ ...options, period })
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

  /**
   * Get status for the provided week and user (and year if provided).
   *
   * @remarks For now, this is using the `ACCESS_REPORTS` scope, but this
   * could be changed in the future.
   *
   * @param email - User email
   * @param week - Week number
   * @param year - Year (optional, defaults to current year)
   *
   * @returns An object containing the user's ID, submit status and total hours for the week
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.ACCESS_REPORTS })
  @Query(() => WeekStatusQueryResult, {
    description: 'Get status of the current week'
  })
  public async weekStatus(
    @Arg('email') email: string,
    @Arg('week') week: number,
    @Arg('year', { nullable: true }) year?: number
  ): Promise<WeekStatusQueryResult> {
    const user = await this._userSvc.getById(email)
    if (!user) throw new Error(`No user found with email ${email}`)
    const confirmedPeriods = await this._cpSvc.find({
      userId: user._id,
      week,
      year: year ?? new Date().getFullYear()
    })
    const date = new DateObject().fromObject({
      week,
      year: year ?? new Date().getFullYear()
    })
    let submitStatus = 0
    if (date.isWeekSplit) {
      if (confirmedPeriods.length === 2) {
        submitStatus = 2
      } else if (confirmedPeriods.length === 1) {
        submitStatus = 1
      }
    } else {
      if (confirmedPeriods.length === 1) {
        submitStatus = 2
      }
    }
    const hours = confirmedPeriods.reduce((sum, { hours }) => sum + hours, 0)

    return {
      userId: user._id,
      submitStatus,
      hours,
      isWeekSplit: date.isWeekSplit,
      url: `/timesheet/week/overview/${date.startOfWeek.format('YYYY-MM-DD')}`
    }
  }
}
