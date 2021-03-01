import { FilterQuery } from 'mongodb'
import { Inject, Service } from 'typedi'
import { find, first, omit } from 'underscore'
import { ProjectService, UserService } from '.'
import { DateObject } from '../../../shared/utils/date.dateObject'
import { Context } from '../../graphql/context'
import { ReportsQuery, TimeEntry } from '../../graphql/resolvers/types'
import { MongoDocumentService } from './@document'

type Report = TimeEntry[]

@Service({ global: false })
export class ReportsService extends MongoDocumentService<TimeEntry> {
  private _project: ProjectService
  private _user: UserService

  /**
   * Constructor for ReportsService
   *
   * @param context - Context
   */
  constructor(@Inject('CONTEXT') readonly context: Context) {
    super(context, 'time_entries')
    this._project = new ProjectService(context)
    this._user = new UserService(context)
  }

  /**
   * Get report
   *
   * @param query - Query
   * @param sortAsc - Sort ascending
   */
  public async getReport(
    query: ReportsQuery,
    sortAsc: boolean
  ): Promise<Report> {
    try {
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
          const customer = find(
            customers,
            (c) => c.key === first(entry.projectId.split(' '))
          )
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
      return report
    } catch (error) {
      throw error
    }
  }
}
