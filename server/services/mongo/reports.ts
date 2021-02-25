import { Db as MongoDatabase, FilterQuery } from 'mongodb'
import { find, first, omit } from 'underscore'
import { ProjectService, UserService } from '.'
import { DateObject } from '../../../shared/utils/date.dateObject'
import { ReportsQuery, TimeEntry } from '../../graphql/resolvers/types'
import { CacheScope, CacheService } from '../cache'
import { MongoDocumentService } from './@document'

type Report = TimeEntry[]

export class ReportsService extends MongoDocumentService<TimeEntry> {
  private _project: ProjectService
  private _user: UserService

  /**
   * Constructor for ReportsService
   *
   * @param {MongoDatabase} db Mongo database
   * @param {CacheService} _cache Cache service
   */
  constructor(db: MongoDatabase, private _cache: CacheService) {
    super(db, 'time_entries')
    this._project = new ProjectService(db, _cache)
    this._user = new UserService(db)
    this._cache.prefix = ReportsService.name
    this._cache.scope = CacheScope.SUBSCRIPTION
  }

  /**
   * Get report
   *
   * @param {ReportsQuery} query Query
   * @param {boolean} sortAsc Sort ascending
   */
  public async getReport(query: ReportsQuery, sortAsc: boolean): Promise<Report> {
    try {
      let cacheKey = `getreports/${query.preset}`
      if (query?.userId) cacheKey += `/${query.userId}`
      if (query?.projectId) cacheKey += `/${query.projectId}`
      const cacheValue = await this._cache.get<Report>(cacheKey)
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
      await this._cache.set(cacheKey, report, 900)
      return report
    } catch (err) {
      throw err
    }
  }
}
