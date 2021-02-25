import { FilterQuery } from 'mongodb'
import { find, first, omit } from 'underscore'
import { ProjectService, UserService } from '.'
import { DateObject } from '../../../shared/utils/date.dateObject'
import { Context } from '../../graphql/context'
import { ReportsQuery, TimeEntry } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

type Report = TimeEntry[]

export class ReportsService extends MongoDocumentService<TimeEntry> {
  private _project: ProjectService
  private _user: UserService

  /**
   * Constructor for ReportsService
   *
   * @param {Context} context Context
   */
  constructor(context: Context) {
    super(context, 'time_entries', ReportsService.name)
    this._project = new ProjectService(context)
    this._user = new UserService(context)
  }

  /**
   * Get report
   *
   * @param {ReportsQuery} query Query
   * @param {boolean} sortAsc Sort ascending
   */
  public async getReport(query: ReportsQuery, sortAsc: boolean): Promise<Report> {
    try {
      const cacheKeys = ['getreport', query.preset, query?.userId, query?.projectId]
      const cacheValue = await this.cache.get<Report>(cacheKeys)
      if (cacheValue) return cacheValue
      const d = new DateObject()
      let q: FilterQuery<TimeEntry> = {}
      switch (query.preset) {
        case 'LAST_MONTH':
          {
            q.month = d.add('-1m').toObject().month - 1
            q.year = d.add('-1m').toObject().year
          }
          break
        case 'CURRENT_MONTH':
          {
            q.month = d.toObject().month
            q.year = d.toObject().year
          }
          break
        case 'LAST_YEAR':
          {
            q.year = d.toObject().year - 1
          }
          break
        case 'CURRENT_YEAR':
          {
            q.year = d.toObject().year
          }
          break
      }
      q = omit({ ...q, ...query }, 'preset')
      const [timeEntries, { projects, customers }, users] = await Promise.all([
        this.find(q),
        this._project.getProjectsData(),
        this._user.getUsers()
      ])
      const report: Report = timeEntries
        .sort(({ startDateTime: a }, { startDateTime: b }) => {
          return sortAsc
            ? new Date(a).getTime() - new Date(b).getTime()
            : new Date(b).getTime() - new Date(a).getTime()
        })
        .reduce(($, entry) => {
          const resource = find(users, (user) => user.id === entry.userId)
          if (!entry.projectId) return $
          const project = find(projects, ({ _id }) => {
            return _id === entry.projectId
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
      await this.cache.set(cacheKeys, report, 900)
      return report
    } catch (err) {
      throw err
    }
  }
}
