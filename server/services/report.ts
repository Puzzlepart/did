/* eslint-disable unicorn/empty-brace-spaces */
/* eslint-disable unicorn/no-array-callback-reference */
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { ProjectService, UserService } from '.'
import { DateObject } from '../../shared/utils/DateObject'
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

/**
 * Report service
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
export class ReportService {
  /**
   * Constructor for ReportsService
   *
   * @param context - Injected context through `typedi`
   * @param _projectSvc - Injected `ProjectService` through `typedi`
   * @param _userSvc - Injected `UserService` through `typedi`
   * @param _timeEntrySvc - Injected `TimeEntryService` through `typedi`
   * @param _forecastTimeEntrySvc - Injected `ForecastedTimeEntryService` through `typedi`
   * @param _confirmedPeriodSvc - Injected `ConfirmedPeriodsService` through `typedi`
   */
  constructor(
    @Inject('CONTEXT') readonly context: Context,
    private readonly _projectSvc: ProjectService,
    private readonly _userSvc: UserService,
    private readonly _timeEntrySvc: TimeEntryService,
    private readonly _forecastTimeEntrySvc: ForecastedTimeEntryService,
    private readonly _confirmedPeriodSvc: ConfirmedPeriodsService
  ) {}

  /**
   * Generate preset query.
   *
   * @param preset - Query preset
   */
  private _generatePresetQuery(preset: ReportsQueryPreset) {
    const date = new DateObject().toObject()
    return (
      {
        LAST_MONTH: {
          month:
            date.month === 1
              ? 12
              : new DateObject().add('-1m').toObject().month - 1,
          year: date.month === 1 ? date.year - 1 : date.year
        },
        CURRENT_MONTH: {
          month: date.month,
          year: date.year
        },
        LAST_YEAR: {
          year: date.year - 1
        },
        CURRENT_YEAR: {
          year: date.year
        }
      }[preset] || {}
    )
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
          ? _.find(users, (user) => user.id === entry.userId)
          : {}
        const project = _.find(projects, ({ _id }) => _id === entry.projectId)
        const customer = _.find(
          customers,
          (c) => c.key === _.first(entry.projectId.split(' '))
        )
        if (project && customer && resource) {
          return [
            ...timeEntries_,
            {
              ..._.omit(
                entry,
                '_id',
                'userId',
                'periodId',
                'projectId',
                'body'
              ),
              project: _.pick(project, 'tag', 'name', 'description', 'icon'),
              customer: _.pick(customer, 'key', 'name', 'description', 'icon'),
              resource
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
    return await this._confirmedPeriodSvc.find({ $or: queries })
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
      const query_ = _.omit(
        {
          ...this._generatePresetQuery(preset),
          ...query
        },
        'preset'
      )
      const [timeEntries, projectsData, users] = await Promise.all([
        this._timeEntrySvc.find(query_),
        this._projectSvc.getProjectsData(),
        this._userSvc.getUsers({ hiddenFromReports: false })
      ])
      const report = this._generateReport({
        ...projectsData,
        timeEntries,
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
      const [timeEntries, projectsData, users] = await Promise.all([
        this._forecastTimeEntrySvc.find({
          startDateTime: {
            $gte: new Date()
          }
        }),
        this._projectSvc.getProjectsData(),
        this._userSvc.getUsers({ hiddenFromReports: false })
      ])
      const report = this._generateReport({
        ...projectsData,
        timeEntries,
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
        this._timeEntrySvc.find(q),
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
