import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { find, first } from 'underscore'
import { Context } from '../context'
import { TimeEntriesQuery, TimeEntry } from './timeentry.types'

@Resolver(TimeEntry)
export class TimeEntryResolver {
  /**
   * Get time entries
   *
   * @param {boolean} currentUser Current user
   * @param {boolean} sortAsc Sort ascending
   * @param {boolean} forecast Forecast
   * @param {TimeEntriesQuery} query Query
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Query(() => [TimeEntry], { description: 'Get time entries matching the provided query' })
  async timeentries(
    @Arg('currentUser', { nullable: true }) currentUser: boolean,
    @Arg('sortAsc', { nullable: true }) sortAsc: boolean,
    @Arg('forecast', { nullable: true }) forecast: boolean,
    @Arg('query') query: TimeEntriesQuery,
    @Ctx() ctx: Context
  ) {
    if (currentUser) query.resourceId = ctx.user.id
    const [users, projects, customers, timeentries] = await Promise.all([
      ctx.services.azstorage.getUsers(),
      ctx.services.azstorage.getProjects(),
      ctx.services.azstorage.getCustomers(),
      ctx.services.azstorage.getTimeEntries(query, { sortAsc, forecast })
    ])
    return timeentries.reduce((arr, entry) => {
      const resource = find(users, (user) => user.id === entry.resourceId)
      if (!entry.projectId) return arr
      const project = find(projects, (p) => p.id === entry.projectId)
      const customer = find(customers, (c) => c.key === first(entry.projectId.split(' ')))
      if (!project || !customer) return arr
      arr.push({
        ...entry,
        project,
        customer,
        resource
      })
      return arr
    }, [])
  }
}
