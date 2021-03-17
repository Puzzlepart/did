/* eslint-disable unicorn/no-array-callback-reference */
import { Inject, Service } from 'typedi'
import { find, first, omit, pick } from 'underscore'
import { ProjectService, UserService } from '.'
import { DateObject } from '../../shared/utils/date.dateObject'
import { Context } from '../graphql/context'
import {
  ConfirmedPeriodsQuery,
  Customer,
  Project,
  ReportsQuery,
  ReportsQueryPreset,
  TimeEntry,
  User
} from '../graphql/resolvers/types'
import {
  ConfirmedPeriodsService,
  ForecastedTimeEntryService,
  TimeEntryService
} from './mongo'

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
   * @param context - Injected context through typedi
   * @param _projectSvc - Injected `ProjectService` through typedi
   * @param _userSvc - Injected `UserService` through typedi
   * @param _teSvc - Injected `TimeEntryService` through typedi
   * @param _fteSvc - Injected `ForecastedTimeEntryService` through typedi
   * @param _cperiodSvc - Injected `ConfirmedPeriodsService` through typedi
   */
  constructor(
    @Inject('CONTEXT') readonly context: Context,
    private readonly _projectSvc: ProjectService,
    private readonly _userSvc: UserService,
    private readonly _teSvc: TimeEntryService,
    private readonly _fteSvc: ForecastedTimeEntryService,
    private readonly _cperiodSvc: ConfirmedPeriodsService
  ) {}

  /**
   * Generate preset query
   *
   * @param preset - Query preset
   */
  private _generatePresetQuery(preset: ReportsQueryPreset) {
    const d = new DateObject()
    return {
      LAST_MONTH: {
        month: d.add('-1m').toObject().month - 1,
        year: d.add('-1m').toObject().year
      },
      CURRENT_MONTH: {
        month: d.toObject().month,
        year: d.toObject().year
      },
      LAST_YEAR: {
        year: d.toObject().year - 1
      },
      CURRENT_YEAR: {
        year: d.toObject().year
      }
    }[preset]
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
    return timeEntries
      .sort(({ startDateTime: a }, { startDateTime: b }) => {
        return sortAsc
          ? new Date(a).getTime() - new Date(b).getTime()
          : new Date(b).getTime() - new Date(a).getTime()
      })
      .reduce((timeEntries_, entry) => {
        if (!entry.projectId) return timeEntries_
        const resource = users
          ? find(users, (user) => user.id === entry.userId)
          : {}
        const project = find(projects, ({ _id }) => _id === entry.projectId)
        const customer = find(
          customers,
          (c) => c.key === first(entry.projectId.split(' '))
        )
        if (project && customer && resource) {
          return [
            ...timeEntries_,
            {
              ...omit(entry, '_id', 'userId', 'periodId', 'projectId', 'body'),
              project: pick(project, 'tag', 'name', 'description', 'icon'),
              customer: pick(customer, 'key', 'name', 'description', 'icon'),
              resource: pick(
                resource,
                'givenName',
                'surname',
                'mail',
                'displayName'
              )
            }
          ]
        }
        return timeEntries_
      }, [])
  }

  /**
   * Get confirmed periods
   *
   * @param queries - Queries
   */
  public async getConfirmedPeriods(queries: ConfirmedPeriodsQuery[]) {
    return await this._cperiodSvc.find({ $or: queries })
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
        this._teSvc.find(q),
        this._projectSvc.getProjectsData(),
        this._userSvc.getUsers()
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
   */
  public async getForecastReport(): Promise<Report> {
    try {
      const [timeEntries, { projects, customers }, users] = await Promise.all([
        this._fteSvc.find({
          startDateTime: {
            $gte: new Date()
          }
        }),
        this._projectSvc.getProjectsData(),
        this._userSvc.getUsers()
      ])
      const report = this._generateReport({
        timeEntries,
        projects,
        customers,
        users,
        sortAsc: true
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
    userId: string,
    sortAsc?: boolean
  ): Promise<Report> {
    try {
      const q = {
        userId,
        ...this._generatePresetQuery(preset)
      }
      const [timeEntries, { projects, customers }] = await Promise.all([
        this._teSvc.find(q),
        this._projectSvc.getProjectsData()
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
