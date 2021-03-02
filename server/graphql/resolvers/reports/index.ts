/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import {Arg, Authorized, Ctx, Query, Resolver} from 'type-graphql'
import {Service} from 'typedi'
import {ReportsService} from '../../../services/mongo'
import {IAuthOptions} from '../../authChecker'
import {Context} from '../../context'
import {ReportsQuery, ReportsQueryPreset, TimeEntry} from './types'

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
   * @param _reports - Reports service
   */
  constructor(private readonly _reports: ReportsService) {}

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
    @Arg('preset', {nullable: true}) preset?: ReportsQueryPreset,
    @Arg('query', {nullable: true}) query?: ReportsQuery,
    @Arg('sortAsc', {nullable: true}) sortAsc?: boolean
  ) {
    return await this._reports.getReport(preset, query, sortAsc)
  }

  /**
   * Get report
   *
   * @param query - Query
   * @param ctx - GraphQL context
   */
  @Authorized<IAuthOptions>({userContext: true})
  @Query(() => [TimeEntry], {
    description: 'Get a user preset report.'
  })
  async userReport(
    @Arg('preset') preset?: ReportsQueryPreset,
    @Ctx() context?: Context
  ) {
    return await this._reports.getUserReport(preset, context.userId)
  }
}

export * from './types'
