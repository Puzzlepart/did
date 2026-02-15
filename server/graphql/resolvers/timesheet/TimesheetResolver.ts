/* eslint-disable unicorn/empty-brace-spaces */
/* eslint-disable unicorn/prevent-abbreviations */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { DateObject } from '../../../../shared/utils/date'
import {
  AppliedOpsService,
  ConfirmedPeriodsService,
  TimesheetService,
  UserIgnoredEventsService,
  UserService
} from '../../../services'
import { IAuthOptions } from '../../authChecker'
import { RequestContext } from '../../requestContext'
import { BaseResult } from '../types'
import {
  TimesheetIgnoreEventInput,
  TimesheetIgnoreEventsInput,
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
   * @param _cpSvc - Confirmed periods service
   * @param _appliedOpsSvc - Applied ops service for idempotency
   * @param _ignoredEventsSvc - User ignored events service
   */
  constructor(
    private readonly _timesheetSvc: TimesheetService,
    private readonly _userSvc: UserService,
    private readonly _cpSvc: ConfirmedPeriodsService,
    private readonly _appliedOpsSvc: AppliedOpsService,
    private readonly _ignoredEventsSvc: UserIgnoredEventsService
  ) {}

  /**
   * Get timesheet for the provided date range specified
   * by `query.startDate` and `query.endDate`. It will
   * also take `options` and ``cache` into account.
   *
   * @param query - Query
   * @param options - Options
   * @param cache - Cache
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Query(() => [TimesheetPeriodObject], {
    description: 'Get timesheet for startDate - endDate'
  })
  async timesheet(
    @Ctx() context: RequestContext,
    @Arg('query') query: TimesheetQuery,
    @Arg('options') options: TimesheetOptions,
    @Arg('cache', { nullable: true }) cache: boolean = false
  ) {
    try {
      return await this._timesheetSvc.getTimesheet({
        ...query,
        ...options,
        configuration: context.userConfiguration?.timesheet || {},
        cache
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
   * @param context - Request context
   * @param opId - Optional operation ID for idempotency
   * @param period - Period
   * @param options - Timesheet options (forecast, tzoffset etc)
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Mutation(() => BaseResult, {
    description:
      'Adds matched time entries for the specified period and an entry for the confirmed period'
  })
  async submitPeriod(
    @Ctx() context: RequestContext,
    @Arg('opId', { nullable: true }) opId: string,
    @Arg('period', () => TimesheetPeriodInput) period: TimesheetPeriodInput,
    @Arg('options') options: TimesheetOptions
  ): Promise<BaseResult> {
    try {
      // Check for duplicate operation
      if (opId) {
        const existing = await this._appliedOpsSvc.findAppliedOp(
          opId,
          context.userId
        )
        if (existing) {
          return {
            success: true,
            opId,
            duplicate: true,
            error: null
          }
        }
      }

      await this._timesheetSvc.submitPeriod({ ...options, period })

      // Mark operation as applied
      if (opId) {
        await this._appliedOpsSvc.markApplied(
          opId,
          context.userId,
          'submitPeriod'
        )
      }

      return {
        success: true,
        opId,
        duplicate: false,
        error: null
      }
    } catch (error) {
      return {
        success: false,
        opId,
        error
      }
    }
  }

  /**
   * Unsubmit period
   *
   * @param context - Request context
   * @param opId - Optional operation ID for idempotency
   * @param period - Period
   * @param options - Timesheet options (forecast, tzoffset etc)
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Mutation(() => BaseResult, {
    description:
      'Deletes time entries for the specified period and the entry for the confirmed period'
  })
  async unsubmitPeriod(
    @Ctx() context: RequestContext,
    @Arg('opId', { nullable: true }) opId: string,
    @Arg('period', () => TimesheetPeriodInput) period: TimesheetPeriodInput,
    @Arg('options') options: TimesheetOptions
  ): Promise<BaseResult> {
    try {
      // Check for duplicate operation
      if (opId) {
        const existing = await this._appliedOpsSvc.findAppliedOp(
          opId,
          context.userId
        )
        if (existing) {
          return {
            success: true,
            opId,
            duplicate: true,
            error: null
          }
        }
      }

      await this._timesheetSvc.unsubmitPeriod({ ...options, period })

      // Mark operation as applied
      if (opId) {
        await this._appliedOpsSvc.markApplied(
          opId,
          context.userId,
          'unsubmitPeriod'
        )
      }

      return {
        success: true,
        opId,
        duplicate: false,
        error: null
      }
    } catch (error) {
      return {
        success: false,
        opId,
        error
      }
    }
  }

  /**
   * Set event ignored state for a user's timesheet
   *
   * @param context - Request context
   * @param opId - Optional operation ID for idempotency
   * @param input - Input containing periodId, eventId, and ignored state
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Mutation(() => BaseResult, {
    description: 'Set an event as ignored or not ignored for the user'
  })
  async setTimesheetEventIgnored(
    @Ctx() context: RequestContext,
    @Arg('opId', { nullable: true }) opId: string,
    @Arg('input', () => TimesheetIgnoreEventInput) input: TimesheetIgnoreEventInput
  ): Promise<BaseResult> {
    try {
      // Check for duplicate operation
      if (opId) {
        const existing = await this._appliedOpsSvc.findAppliedOp(
          opId,
          context.userId
        )
        if (existing) {
          return {
            success: true,
            opId,
            duplicate: true,
            error: null
          }
        }
      }

      await this._ignoredEventsSvc.setEventIgnored(
        context.userId,
        input.periodId,
        input.eventId,
        input.ignored
      )

      // Mark operation as applied
      if (opId) {
        await this._appliedOpsSvc.markApplied(
          opId,
          context.userId,
          'setTimesheetEventIgnored'
        )
      }

      return {
        success: true,
        opId,
        duplicate: false,
        error: null
      }
    } catch (error) {
      return {
        success: false,
        opId,
        error
      }
    }
  }

  /**
   * Ignore multiple events at once (e.g., for "Ignore All" functionality)
   *
   * @param context - Request context
   * @param opId - Optional operation ID for idempotency
   * @param input - Input containing periodId and array of eventIds
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Mutation(() => BaseResult, {
    description: 'Ignore multiple events at once'
  })
  async ignoreAllTimesheetEvents(
    @Ctx() context: RequestContext,
    @Arg('opId', { nullable: true }) opId: string,
    @Arg('input', () => TimesheetIgnoreEventsInput) input: TimesheetIgnoreEventsInput
  ): Promise<BaseResult> {
    try {
      // Check for duplicate operation
      if (opId) {
        const existing = await this._appliedOpsSvc.findAppliedOp(
          opId,
          context.userId
        )
        if (existing) {
          return {
            success: true,
            opId,
            duplicate: true,
            error: null
          }
        }
      }

      await this._ignoredEventsSvc.setMultipleEventsIgnored(
        context.userId,
        input.periodId,
        input.eventIds
      )

      // Mark operation as applied
      if (opId) {
        await this._appliedOpsSvc.markApplied(
          opId,
          context.userId,
          'ignoreAllTimesheetEvents'
        )
      }

      return {
        success: true,
        opId,
        duplicate: false,
        error: null
      }
    } catch (error) {
      return {
        success: false,
        opId,
        error
      }
    }
  }

  /**
   * Clear all ignored events for a period
   *
   * @param context - Request context
   * @param opId - Optional operation ID for idempotency
   * @param periodId - Period ID to clear ignored events from
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Mutation(() => BaseResult, {
    description: 'Clear all ignored events for a period'
  })
  async clearTimesheetIgnoredEvents(
    @Ctx() context: RequestContext,
    @Arg('opId', { nullable: true }) opId: string,
    @Arg('periodId') periodId: string
  ): Promise<BaseResult> {
    try {
      // Check for duplicate operation
      if (opId) {
        const existing = await this._appliedOpsSvc.findAppliedOp(
          opId,
          context.userId
        )
        if (existing) {
          return {
            success: true,
            opId,
            duplicate: true,
            error: null
          }
        }
      }

      await this._ignoredEventsSvc.clearIgnoredEvents(
        context.userId,
        periodId
      )

      // Mark operation as applied
      if (opId) {
        await this._appliedOpsSvc.markApplied(
          opId,
          context.userId,
          'clearTimesheetIgnoredEvents'
        )
      }

      return {
        success: true,
        opId,
        duplicate: false,
        error: null
      }
    } catch (error) {
      return {
        success: false,
        opId,
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
