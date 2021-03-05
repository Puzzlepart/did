/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { ReportService } from '../../../services'
import { IAuthOptions } from '../../authChecker'
import { Context } from '../../context'
import { ReportsQuery, ReportsQueryPreset, TimeEntry } from './types'

/**
 * Resolver for `TimeEntry`.
 *
 * `ReportsService` are injected through
 * _dependendy injection_.
 *
 * @see https://typegraphql.com/docs/dependency-injection.html
 *
 * @category Resolver
 */
@Service()
@Resolver(TimeEntry)
export class ReportsResolver {
  /**
   * Constructor for ReportsResolver
   *
   * @param _report - Report service
   */
  constructor(private readonly _report: ReportService) {}

  /**
   * Get report
   *
   * @param preset - Query
   * @param query - Query
   * @param sortAsc - Sort ascending
   * @param ctx - GraphQL context
   */
  @Authorized<IAuthOptions>()
  @Query(() => [TimeEntry], {
    description: 'Get a preset report, or use custom filters.'
  })
  async report(
    @Arg('preset', { nullable: true }) preset?: ReportsQueryPreset,
    @Arg('query', { nullable: true }) query?: ReportsQuery,
    @Arg('sortAsc', { nullable: true }) sortAsc?: boolean
  ) {
    return await this._report.getReport(preset, query, sortAsc)
  }

  /**
   * Get forecast report
   *
   * @param query - Query
   */
  @Authorized<IAuthOptions>()
  @Query(() => [TimeEntry], {
    description: 'Get forecast report using custom filters.'
  })
  async forecastedReport(
    @Arg('query', { nullable: true }) query?: ReportsQuery
  ) {
    return await this._report.getForecastReport(query)
  }

  /**
   * Get report
   *
   * @param query - Query
   * @param ctx - GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [TimeEntry], {
    description: 'Get a user preset report.'
  })
  async userReport(
    @Arg('preset') preset?: ReportsQueryPreset,
    @Ctx() context?: Context
  ) {
    return await this._report.getUserReport(preset, context.userId)
  }
}

export * from './types'
