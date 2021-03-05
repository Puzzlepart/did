/* eslint-disable unicorn/no-array-callback-reference */
import { FilterQuery } from 'mongodb'
import { Inject, Service } from 'typedi'
import { find, first, omit } from 'underscore'
import { ProjectService, UserService } from '.'
import { DateObject } from '../../shared/utils/date.dateObject'
import { Context } from '../graphql/context'
import {
  Customer,
  Project,
  ReportsQuery,
  ReportsQueryPreset,
  TimeEntry,
  User
} from '../graphql/resolvers/types'
import { ForecastedTimeEntryService, TimeEntryService } from './mongo'

type Report = TimeEntry[]

interface IGenerateReportParameters {
  timeEntries: TimeEntry[]
  sortAsc: boolean
  users?: User[]
  projects: Project[]
  customers: Customer[]
}

@Service({ global: false })
export class ReportService {
  /**
   * Constructor for ReportsService
   *
   * @param context - Context
   */
  constructor(
    @Inject('CONTEXT') readonly context: Context,
    private readonly _project: ProjectService,
    private readonly _user: UserService,
    private readonly _timeEntry: TimeEntryService,
    private readonly _forecastedTimeEntry: ForecastedTimeEntryService
  ) {}

  /**
   * Generate preset query
   *
   * @param preset - Query preset
   */
  private _generatePresetQuery(preset: ReportsQueryPreset) {
    const d = new DateObject()
    const q: FilterQuery<TimeEntry> = {}
    switch (preset) {
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
    return q
  }

  /**
   * Generate report
   *
   * @param param0 - Parameters
   */
  private _generateReport({
    timeEntries,
    sortAsc,
    users,
    projects,
    customers
  }: IGenerateReportParameters) {
    return (
      timeEntries
        .sort(({ startDateTime: a }, { startDateTime: b }) => {
          return sortAsc
            ? new Date(a).getTime() - new Date(b).getTime()
            : new Date(b).getTime() - new Date(a).getTime()
        })
        // eslint-disable-next-line unicorn/no-array-reduce
        .reduce(($, entry) => {
          if (!entry.projectId) return $
          const resource = users
            ? find(users, (user) => user.id === entry.userId)
            : {}
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
    )
  }

  /**
   * Get report
   *
   * @param preset - Query preset
   * @param query - Custom query
   * @param sortAsc - Sort ascending
   */
  public async getReport(
    preset?: ReportsQueryPreset,
    query: ReportsQuery = {},
    sortAsc?: boolean
  ): Promise<Report> {
    try {
      let q = this._generatePresetQuery(preset)
      q = omit({ ...q, ...query }, 'preset')
      const [timeEntries, { projects, customers }, users] = await Promise.all([
        this._timeEntry.find(q),
        this._project.getProjectsData(),
        this._user.getUsers()
      ])
      const report = this._generateReport({
        timeEntries,
        projects,
        customers,
        users,
        sortAsc
      })
      return report
    } catch (error) {
      throw error
    }
  }

  /**
   * Get forecast report
   *
   * @param query - Custom query
   * @param sortAsc - Sort ascending
   */
  public async getForecastReport(
    query: ReportsQuery = {},
    sortAsc?: boolean
  ): Promise<Report> {
    try {
      const [timeEntries, { projects, customers }, users] = await Promise.all([
        this._forecastedTimeEntry.find(query),
        this._project.getProjectsData(),
        this._user.getUsers()
      ])
      const report = this._generateReport({
        timeEntries,
        projects,
        customers,
        users,
        sortAsc
      })
      return report
    } catch (error) {
      throw error
    }
  }

  /**
   * Get user report using presets
   *
   * @param preset - Query preset
   * @param userId - User ID
   * @param sortAsc - Sort ascending
   */
  public async getUserReport(
    preset: ReportsQueryPreset,
    _userId: string,
    sortAsc?: boolean
  ): Promise<Report> {
    try {
      const q = {
        _userId,
        ...this._generatePresetQuery(preset)
      }
      const [timeEntries, { projects, customers }] = await Promise.all([
        this._timeEntry.find(q),
        this._project.getProjectsData()
      ])
      const report = this._generateReport({
        timeEntries,
        projects,
        customers,
        sortAsc
      })
      return report
    } catch (error) {
      throw error
    }
  }
}
