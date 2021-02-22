/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { find, first } from 'underscore'
import { MongoService } from 'services/mongo'
import { IAuthOptions } from '../../authChecker'
import { Context } from '../../context'
import { TimeEntriesQuery, TimeEntry } from './types'

@Service()
@Resolver(TimeEntry)
export class ReportsResolver {
  /**
   * Constructor for ReportsResolver
   *
   * @param {MongoService} _mongo Mongo service
   */
  constructor(private readonly _mongo: MongoService) {}

  /**
   * Get time entries
   *
   * @param {TimeEntriesQuery} query Query
   * @param {boolean} currentUser Current user
   * @param {boolean} sortAsc Sort ascending
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>()
  @Query(() => [TimeEntry], { description: 'Get time entries matching the provided query' })
  async timeentries(
    @Arg('query') query: TimeEntriesQuery,
    @Arg('currentUser', { nullable: true }) currentUser: boolean,
    @Arg('sortAsc', { nullable: true }) sortAsc: boolean,
    @Ctx() ctx: Context
  ) {
    if (currentUser) query.userId = ctx.userId
    const [timeEntries, { projects, customers }, users] = await Promise.all([
      this._mongo.reports.getTimeEntries(query, sortAsc),
      this._mongo.project.getProjectsData(),
      this._mongo.user.getUsers()
    ])
    return timeEntries.reduce(($, entry) => {
      const resource = find(users, (user) => user.id === entry.userId)
      if (!entry.projectId) return $
      const project = find(projects, ({ customerKey, key }) => {
        return [customerKey, key].join(' ') === entry.projectId
      })
      const customer = find(customers, (c) => c.key === first(entry.projectId.split(' ')))
      if (project && customer && resource) {
        $.push({
          ...entry,
          project,
          customer,
          resource
        })
      }
      return $
    }, [])
  }
}

export * from './types'
