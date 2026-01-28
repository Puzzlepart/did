import 'reflect-metadata'
import { Arg, Authorized, Ctx, Int, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { PermissionScope } from '../../../../shared/config/security'
import { ReportService } from '../../../services'
import { IAuthOptions } from '../../authChecker'
import { RequestContext } from '../../requestContext'
// Import directly to avoid potential circular import through barrel index
import { TimesheetPeriodObject } from '../timesheet/types/TimesheetPeriodObject'
import {
  ConfirmedPeriodsQuery,
  ReportFilterOptions,
  ReportsQuery,
  ReportsQueryPreset,
  TimeEntry
} from './types'

/**
 * Resolver for `TimeEntry`.
 *
 * `ReportsService` are injected through
 * _dependendy injection_.
 *
 * @see https://typegraphql.com/docs/dependency-injection.html
 *
 * @category GraphQL Resolver
 */
@Service()
@Resolver(TimeEntry)
export class ReportsResolver {
  /**
   * Constructor for ReportsResolver
   *
   * @param _report - Report service
   */
  // eslint-disable-next-line unicorn/empty-brace-spaces
  constructor(private readonly _report: ReportService) {}

  /**
   * Get report
   *
   * @remarks Temporarily removed auth options. See discussion #969
   * and issue #967.
   *
   * @param preset - Query
   * @param query - Query
   * @param sortAsc - Sort ascending
   */
  @Query(() => [TimeEntry], {
    description: 'Get a preset report, or use custom filters.'
  })
  async report(
    @Arg('preset', { nullable: true }) preset?: ReportsQueryPreset,
    @Arg('query', { nullable: true }) query?: ReportsQuery,
    @Arg('sortAsc', { nullable: true }) sortAsc?: boolean,
    @Arg('allowLarge', { nullable: true }) allowLarge?: boolean
  ): Promise<TimeEntry[]> {
    return await this._report.getReport(preset, query, sortAsc, allowLarge)
  }

  /**
   * Get filter options for report preloading.
   */
  @Query(() => ReportFilterOptions, {
    description: 'Get filter options for report preloading.'
  })
  async reportFilterOptions(
    @Arg('preset', { nullable: true }) preset?: ReportsQueryPreset,
    @Arg('query', { nullable: true }) query?: ReportsQuery,
    @Arg('forecast', { nullable: true }) forecast?: boolean
  ): Promise<ReportFilterOptions> {
    return await this._report.getReportFilterOptions(preset, query, forecast)
  }

  /**
   * Count raw time entries matching the specified report filters.
   */
  @Query(() => Int, {
    description:
      'Count raw time entries matching a preset report or custom filters.'
  })
  async reportCount(
    @Arg('preset', { nullable: true }) preset?: ReportsQueryPreset,
    @Arg('query', { nullable: true }) query?: ReportsQuery
  ): Promise<number> {
    return await this._report.getReportCount(preset, query)
  }

  /**
   * Count forecasted time entries.
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.ACCESS_REPORTS })
  @Query(() => Int, {
    description: 'Count forecasted time entries.'
  })
  async forecastedReportCount(): Promise<number> {
    return await this._report.getForecastReportCount()
  }

  /**
   * Get confirmed periods matching the specified queries
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.ACCESS_REPORTS })
  @Query(() => [TimesheetPeriodObject], {
    description: 'Get confirmed periods matching the specified queries.'
  })
  async confirmedPeriods(
    @Arg('queries', () => [ConfirmedPeriodsQuery])
    queries: ConfirmedPeriodsQuery[]
  ): Promise<TimesheetPeriodObject[]> {
    return await this._report.getConfirmedPeriods(queries)
  }

  /**
   * Get forecast report
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.ACCESS_REPORTS })
  @Query(() => [TimeEntry], {
    description: 'Get forecast report using custom filters.'
  })
  async forecastedReport(): Promise<TimeEntry[]> {
    return await this._report.getForecastReport()
  }

  /**
   * Get report
   *
   * @param preset - Report preset
   * @param context - GraphQL context
   */
  @Authorized<IAuthOptions>({ requiresUserContext: true })
  @Query(() => [TimeEntry], {
    description: 'Get a user preset report.'
  })
  async userReport(
    @Arg('preset') preset?: ReportsQueryPreset,
    @Ctx() context?: RequestContext
  ) {
    return await this._report.getUserReport(preset, context.userId)
  }
}
