/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { IAuthOptions } from '../../authChecker'
import { Context } from '../../context'
import { TimeEntriesQuery, TimeEntry } from './types'

@Service()
@Resolver(TimeEntry)
export class TimeEntryResolver {
  /**
   * Constructor for TimeEntryResolver
   */
  constructor() {}

  /**
   * Get time entries
   *
   * @param {boolean} currentUser Current user
   * @param {boolean} sortAsc Sort ascending
   * @param {boolean} forecast Forecast
   * @param {TimeEntriesQuery} query Query
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>()
  @Query(() => [TimeEntry], { description: 'Get time entries matching the provided query' })
  async timeentries(
    @Arg('currentUser', { nullable: true }) currentUser: boolean,
    @Arg('sortAsc', { nullable: true }) sortAsc: boolean,
    @Arg('forecast', { nullable: true }) forecast: boolean,
    @Arg('query') query: TimeEntriesQuery,
    @Ctx() ctx: Context
  ) {
    return await Promise.resolve([])
  }
}

export * from './types'
