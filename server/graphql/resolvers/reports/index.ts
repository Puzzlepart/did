/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { ReportsService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { Context } from '../../context'
import { ReportsQuery, TimeEntry } from './types'

/**
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
   * Get time entries
   *
   * @param query - Query
   * @param currentUser - Current user
   * @param sortAsc - Sort ascending
   * @param ctx - GraphQL context
   */
  @Authorized<IAuthOptions>()
  @Query(() => [TimeEntry], {
    description: 'Get time entries matching the provided query'
  })
  async timeentries(
    @Arg('query') query: ReportsQuery,
    @Arg('currentUser', { nullable: true }) currentUser: boolean,
    @Arg('sortAsc', { nullable: true }) sortAsc: boolean,
    @Ctx() context: Context
  ) {
    if (currentUser) query.userId = context.userId
    return await this._reports.getReport(query, sortAsc)
  }
}

export * from './types'
