/* eslint-disable unicorn/no-array-callback-reference */
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { ProjectService } from '../mongo/project/ProjectService'
import { CustomerService } from '../mongo/customer'
import { UserService } from '../mongo/user'
import { DateObject } from '../../../shared/utils/DateObject'
import { RequestContext } from '../../graphql/requestContext'
import {
  ConfirmedPeriodsQuery,
  ReportsQuery,
  ReportsQueryPreset,
  TimeEntry
} from '../../graphql/resolvers/types'
import { ReportFilterOptions } from '../../graphql/resolvers/reports/types'
import {
  ConfirmedPeriodsService
} from '../mongo/confirmed_periods'
import { ForecastedTimeEntryService } from '../mongo/forecasted_time_entry'
import { TimeEntryService } from '../mongo/time_entry'
import { Report, IGenerateReportParameters } from './types'
const debug = require('debug')('services/report/ReportService')

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
    @Inject('CONTEXT') readonly context: RequestContext,
    private readonly _projectSvc: ProjectService,
    private readonly _customerSvc: CustomerService,
    private readonly _userSvc: UserService,
    private readonly _timeEntrySvc: TimeEntryService,
    private readonly _forecastTimeEntrySvc: ForecastedTimeEntryService,
    private readonly _confirmedPeriodSvc: ConfirmedPeriodsService
  ) {
    // Empty constructor on purpose. It will be like
    // this until we need to inject something.
  }

  /**
   * Helper to extract standard customer fields for reports
   * 
   * @param customer - Customer object to pick fields from
   */
  private _pickCustomerFields(customer: any) {
    return customer
      ? _.pick(customer, 'key', 'name', 'description', 'icon')
      : null
  }

  /**
   * Generates report by sorting time entries by date, and then
   * mapping each time entry to a report entry, which is an object
   * containing the time entry, the project, the customer, and the
   * resource.
   *
   * @param param0 - Parameters
   */
  private _generateReport({
    timeEntries,
    sortAsc,
    users,
    projects,
    customers
  }: IGenerateReportParameters): TimeEntry[] {
    return timeEntries
      .sort(({ startDateTime: a }, { startDateTime: b }) => {
        return sortAsc
          ? new Date(a).getTime() - new Date(b).getTime()
          : new Date(b).getTime() - new Date(a).getTime()
      })
      .reduce((entries, entry) => {
        if (!entry.projectId) {
          return entries
        }
        const resource = users
          ? _.find(users, (user) => user.id === entry.userId)
          : {}
        const project = _.find(projects, ({ _id }) => _id === entry.projectId)
        const customer = _.find(
          customers,
          (c) => c.key === _.first(entry.projectId.split(' '))
        )
        const partner = project?.partnerKey
          ? _.find(customers, (c) => c.key === project.partnerKey)
          : null
        if (!project || !customer || !resource) {
          return entries
        }
        const mergedEntry = {
          ..._.omit(entry, '_id', 'userId', 'periodId', 'projectId', 'body'),
          project: _.pick(
            project,
            'tag',
            'name',
            'description',
            'icon',
            'parent',
            'labels'
          ),
          customer: this._pickCustomerFields(customer),
          partner: this._pickCustomerFields(partner),
          resource
        }
        return [...entries, mergedEntry]
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
    sortAsc?: boolean,
    allowLarge?: boolean
  ): Promise<Report> {
    try {
      const query_ = await this._generateQueryWithFilters(query, preset)
      debug('[getReport]', 'Generating report with query:', query_, {
        userId: this.context.userId
      })

      // Apply safety limits for large queries
      const isLargeQuery = allowLarge ? false : this._isLargeQuery(preset, query_)
      const safeQuery = allowLarge
        ? { ...query }
        : this._applySafetyLimits(query, preset, isLargeQuery)
      
      debug('[getReport]', 'Query analysis:', {
        preset,
        originalQuery: query,
        safeQuery,
        isLargeQuery,
        hasLimit: !!safeQuery.limit,
        willUseStreaming: isLargeQuery && !safeQuery.limit
      })
      
      if (isLargeQuery && !safeQuery.limit) {
        debug('[getReport]', 'Using streaming approach for large query')
        return await this._getReportWithStreaming(query_, sortAsc)
      }

      // Use traditional approach for smaller queries or when pagination is specified
      debug('[getReport]', 'Using pagination approach', {
        limit: safeQuery.limit,
        skip: safeQuery.skip,
        queryKeys: Object.keys(query_)
      })
      
      const [timeEntries, projectsData, users] = await Promise.all([
        safeQuery.limit ? 
          this._timeEntrySvc.findPaginated(query_, { 
            limit: safeQuery.limit, 
            skip: safeQuery.skip,
            sort: sortAsc ? { startDateTime: 1 } : { startDateTime: -1 }
          }) :
          this._timeEntrySvc.find(query_),
        this._projectSvc.getProjectsData(),
        this._userSvc.getUsers({ hiddenFromReports: false })
      ])
      
      debug('[getReport]', `Retrieved ${timeEntries.length} time entries for processing`)
      
      const report = this._generateReport({
        ...projectsData,
        timeEntries,
        users,
        sortAsc
      })
      
      debug('[getReport]', `Generated report with ${report.length} entries`)
      
      return report
    } catch (error) {
      debug('[getReport]', 'Error generating report:', error)
      throw error
    }
  }

  /**
   * Count raw time entries that match the given preset and query.
   *
   * @param preset - Query preset
   * @param query - Custom query
   */
  public async getReportCount(
    preset?: ReportsQueryPreset,
    query: ReportsQuery = {}
  ): Promise<number> {
    const query_ = await this._generateQueryWithFilters(query, preset)
    debug('[getReportCount]', 'Counting raw time entries with query:', query_)
    return await this._timeEntrySvc.count(query_)
  }

  /**
   * Get filter options for report preloading.
   */
  public async getReportFilterOptions(
    preset?: ReportsQueryPreset,
    query: ReportsQuery = {},
    forecast?: boolean
  ): Promise<ReportFilterOptions> {
    const baseQuery = forecast
      ? {
          ...(await this._generateQueryWithFilters(query)),
          startDateTime: {
            $gte: new Date()
          }
        }
      : await this._generateQueryWithFilters(query, preset)

    const [projectIds, userIds] = await Promise.all([
      (forecast ? this._forecastTimeEntrySvc : this._timeEntrySvc).distinct(
        'projectId',
        baseQuery
      ),
      (forecast ? this._forecastTimeEntrySvc : this._timeEntrySvc).distinct(
        'userId',
        baseQuery
      )
    ])

    if (projectIds.length === 0 && userIds.length === 0) {
      return {
        projectNames: [],
        parentProjectNames: [],
        customerNames: [],
        partnerNames: [],
        employeeNames: []
      }
    }

    const [projects, users] = await Promise.all([
      projectIds.length > 0
        ? (this._projectSvc.find(
            {
              $or: [
                { _id: { $in: projectIds } },
                { tag: { $in: projectIds } }
              ]
            },
            { name: 1, tag: 1, parentKey: 1, customerKey: 1, partnerKey: 1 }
          ) as Promise<any[]>)
        : Promise.resolve([]),
      userIds.length > 0
        ? this._userSvc.getUsers({
            _id: { $in: userIds },
            hiddenFromReports: false
          } as any)
        : Promise.resolve([])
    ])

    const parentKeys = Array.from(
      new Set(projects.map((project) => project.parentKey).filter(Boolean))
    )

    const parentProjects =
      parentKeys.length > 0
        ? await this._projectSvc.find(
            {
              $or: [{ _id: { $in: parentKeys } }, { tag: { $in: parentKeys } }]
            },
            { name: 1, tag: 1 }
          )
        : []

    const customersToFetch = Array.from(
      new Set(
        projects
          .reduce<string[]>(
            (acc, project) => [
              ...acc,
              project.customerKey,
              project.partnerKey
            ],
            []
          )
          .filter(Boolean)
      )
    )

    const customers =
      customersToFetch.length > 0
        ? await this._customerSvc.getCustomers({
            key: { $in: customersToFetch }
          })
        : []

    const customerNameByKey = new Map(
      customers.map((customer) => [customer.key, customer.name])
    )

    const projectNames = Array.from(
      new Set(projects.map((project) => project.name).filter(Boolean))
    ).sort()

    const parentProjectNames = Array.from(
      new Set(
        parentProjects.map((project) => project.name).filter(Boolean)
      )
    ).sort()

    const customerNames = Array.from(
      new Set(
        projects
          .map((project) => customerNameByKey.get(project.customerKey))
          .filter(Boolean)
      )
    ).sort()

    const partnerNames = Array.from(
      new Set(
        projects
          .map((project) => customerNameByKey.get(project.partnerKey))
          .filter(Boolean)
      )
    ).sort()

    const employeeNames = Array.from(
      new Set(users.map((user) => user.displayName).filter(Boolean))
    ).sort()

    return {
      projectNames,
      parentProjectNames,
      customerNames,
      partnerNames,
      employeeNames
    }
  }

  /**
   * Count forecasted time entries.
   */
  public async getForecastReportCount(): Promise<number> {
    const query = {
      startDateTime: {
        $gte: new Date()
      }
    }
    debug('[getForecastReportCount]', 'Counting forecasted time entries with query:', query)
    return await this._forecastTimeEntrySvc.count(query as any)
  }

  /**
   * Default limit for large queries without explicit pagination.
   * Set to 5,000 as a reasonable balance between performance and data completeness
   * for typical monthly/yearly reports with hundreds of time entries.
   */
  private readonly DEFAULT_LARGE_QUERY_LIMIT = 5000

  /**
   * Maximum allowed limit for any single query.
   * Set to 50,000 based on memory constraints and observed performance limits.
   * Queries exceeding this use streaming/batching approaches instead.
   */
  private readonly MAX_LIMIT = 50_000

  /**
   * Apply safety limits to prevent memory exhaustion on large queries
   */
  private _applySafetyLimits(
    query: ReportsQuery,
    preset?: ReportsQueryPreset,
    isLargeQuery?: boolean
  ): ReportsQuery {
    const safeQuery = { ...query }
    
    // Apply default limits for large queries if no limit is specified
    if (!safeQuery.limit && isLargeQuery) {
      safeQuery.limit = this.DEFAULT_LARGE_QUERY_LIMIT
      
      debug('[_applySafetyLimits]', `Applied default limit of ${this.DEFAULT_LARGE_QUERY_LIMIT} for large query`, {
        preset,
        originalLimit: query.limit
      })
    }
    
    // Cap extremely large limits
    if (safeQuery.limit && safeQuery.limit > this.MAX_LIMIT) {
      debug('[_applySafetyLimits]', `Capping limit from ${safeQuery.limit} to ${this.MAX_LIMIT}`)
      safeQuery.limit = this.MAX_LIMIT
    }
    
    return safeQuery
  }

  /**
   * Maximum number of entries to keep in memory during streaming operations.
   * Set to 10,000 to balance memory usage with report completeness.
   * When this limit is reached, data collection stops and a warning is logged.
   * 
   * Note: This is not true streaming - all data is loaded into memory before returning.
   * True streaming would require architectural changes to support progressive data delivery.
   */
  private readonly MAX_MEMORY_ENTRIES = 10_000

  /**
   * Memory-efficient report generation using streaming for large datasets.
   * 
   * Note: Despite the name, this method does not stream results to the client.
   * It uses MongoDB cursor streaming internally but accumulates all results in memory
   * before returning. This still helps with database memory usage but may cause
   * memory issues with truly large datasets (>10k entries).
   */
  private async _getReportWithStreaming(
    query: any,
    sortAsc?: boolean
  ): Promise<Report> {
    const [projectsData, users] = await Promise.all([
      this._projectSvc.getProjectsData(),
      this._userSvc.getUsers({ hiddenFromReports: false })
    ])

    const reportEntries: TimeEntry[] = []
    const BATCH_SIZE = 1000

    await this._timeEntrySvc.streamFind(
      query,
      (timeEntriesBatch) => {
        const processedBatch = this._generateReport({
          ...projectsData,
          timeEntries: timeEntriesBatch,
          users,
          sortAsc
        })
        
        // If we're approaching memory limit, stop processing and log warning
        if (reportEntries.length + processedBatch.length > this.MAX_MEMORY_ENTRIES) {
          debug(
            '[_getReportWithStreaming]',
            `⚠️  Memory limit reached: ${reportEntries.length} entries loaded, limit is ${this.MAX_MEMORY_ENTRIES}. ` +
            'Data will be truncated. Consider using pagination or requesting a smaller date range.'
          )
          // Take only what fits within the limit
          const remainingSpace = this.MAX_MEMORY_ENTRIES - reportEntries.length
          if (remainingSpace > 0) {
            reportEntries.push(...processedBatch.slice(0, remainingSpace))
          }
          return
        }
        
        reportEntries.push(...processedBatch)
      },
      {
        batchSize: BATCH_SIZE,
        sort: sortAsc ? { startDateTime: 1 } : { startDateTime: -1 }
      }
    )

    debug(
      '[_getReportWithStreaming]',
      `Completed streaming: loaded ${reportEntries.length} entries (max: ${this.MAX_MEMORY_ENTRIES})`
    )

    // Sort the final result if needed
    if (sortAsc !== undefined) {
      reportEntries.sort(({ startDateTime: a }, { startDateTime: b }) => {
        return sortAsc
          ? new Date(a).getTime() - new Date(b).getTime()
          : new Date(b).getTime() - new Date(a).getTime()
      })
    }

    return reportEntries
  }

  /**
   * Determine if a query is likely to return a large dataset that requires streaming
   */
  private _isLargeQuery(preset?: ReportsQueryPreset, query?: any): boolean {
    // Current year and last year queries are typically large
    if (preset === 'CURRENT_YEAR' || preset === 'LAST_YEAR') {
      return true
    }
    
    // Queries without time constraints are potentially large
    if (!query?.month && !query?.week && !query?.startDateTime && !query?.endDateTime) {
      return true
    }
    
    return false
  }

  /**
   * Get forecast report. Get all time entries that start after the current date
   * using the `ForecastedTimeEntryService`, fetching projects data using the
   * `ProjectService`, and fetching users using the `UserService`. Then generates
   * the report using `_generateReport`.
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
      const query = {
        userId,
        ...this._generatePresetQuery(preset)
      }
      debug('[getUserReport]', 'Generating report with query:', query)
      const [timeEntries, { projects, customers }] = await Promise.all([
        this._timeEntrySvc.find(query),
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

  /**
   * Generates a query object from the provided query, and preset.
   *
   * Supported query fields are:
   * * `projectId`
   * * `userIds`
   * * `startDateTime`
   * * `endDateTime`
   * * `week`
   * * `month`
   * * `year`
   * * `limit` (for pagination)
   * * `skip` (for pagination)
   *
   * Supported presets are handled by `_generatePresetQuery`.
   *
   * @param query Query object
   * @param preset Query preset
   */
  private _generateQuery(query: ReportsQuery = {}, preset: ReportsQueryPreset) {
    const presetQuery = this._generatePresetQuery(preset)
    // Exclude pagination parameters from MongoDB query
    const queryWithoutPagination = _.omit(query, 'limit', 'skip')
    return _.omit(
      {
        ...presetQuery,
        ..._.pick(
          {
            projectId: {
              $eq: queryWithoutPagination.projectId
            },
            userId: {
              $in: queryWithoutPagination.userIds
            },
            startDateTime: { $gte: new Date(queryWithoutPagination.startDateTime) },
            endDateTime: { $lte: new Date(queryWithoutPagination.endDateTime) },
            week: { $eq: queryWithoutPagination.week },
            month: { $eq: queryWithoutPagination.month },
            year: { $eq: queryWithoutPagination.year }
          },
          [...Object.keys(queryWithoutPagination), !_.isEmpty(queryWithoutPagination?.userIds) && 'userId']
        )
      },
      'preset'
    )
  }

  private async _generateQueryWithFilters(
    query: ReportsQuery = {},
    preset?: ReportsQueryPreset
  ) {
    const baseQuery = this._generateQuery(query, preset)
    const { projectIds, userIds } = await this._resolveFilterIds(query)

    if (projectIds !== undefined) {
      const baseProjectId =
        baseQuery.projectId?.$eq ??
        (_.isArray(baseQuery.projectId?.$in) ? baseQuery.projectId.$in : null)
      const baseProjectIds = baseProjectId
        ? (Array.isArray(baseProjectId) ? baseProjectId : [baseProjectId])
        : null
      const effectiveProjectIds = baseProjectIds
        ? _.intersection(baseProjectIds, projectIds)
        : projectIds
      baseQuery.projectId = { $in: effectiveProjectIds }
    }

    if (userIds !== undefined) {
      const baseUserIds = baseQuery.userId?.$in ?? null
      const effectiveUserIds = baseUserIds
        ? _.intersection(baseUserIds, userIds)
        : userIds
      baseQuery.userId = { $in: effectiveUserIds }
    }

    return baseQuery
  }

  private async _resolveFilterIds(query: ReportsQuery) {
    const projectNames = query.projectNames ?? []
    const parentProjectNames = query.parentProjectNames ?? []
    const customerNames = query.customerNames ?? []
    const partnerNames = query.partnerNames ?? []
    const employeeNames = query.employeeNames ?? []

    const hasProjectFilters =
      projectNames.length > 0 ||
      parentProjectNames.length > 0 ||
      customerNames.length > 0 ||
      partnerNames.length > 0

    const hasUserFilters = employeeNames.length > 0 || query.userIds?.length > 0

    if (!hasProjectFilters && !hasUserFilters) {
      return {}
    }

    const [projects, customers, users] = await Promise.all([
      hasProjectFilters
        ? (this._projectSvc.find(
            {},
            { name: 1, tag: 1, parentKey: 1, customerKey: 1, partnerKey: 1 }
          ) as Promise<any[]>)
        : Promise.resolve([]),
      hasProjectFilters ? this._customerSvc.getCustomers() : Promise.resolve([]),
      hasUserFilters
        ? this._userSvc.getUsers({ hiddenFromReports: false })
        : Promise.resolve([])
    ])

    let projectIds: string[] | null = null

    if (hasProjectFilters) {
      const customerKeysByName = new Map(
        customers.map((customer) => [customer.name, customer.key])
      )

      const projectFilterSets: string[][] = []

      if (projectNames.length > 0) {
        const projectTags = projects
          .filter((project) => projectNames.includes(project.name))
          .map((project) => project.tag)
        projectFilterSets.push(projectTags)
      }

      if (parentProjectNames.length > 0) {
        const parentTags = projects
          .filter((project) => parentProjectNames.includes(project.name))
          .map((project) => project.tag)
        const parentTagSet = new Set(parentTags)
        const childProjectTags = projects
          .filter((project) => parentTagSet.has(project.parentKey))
          .map((project) => project.tag)
        projectFilterSets.push(childProjectTags)
      }

      if (customerNames.length > 0) {
        const customerKeys = customerNames
          .map((name) => customerKeysByName.get(name))
          .filter(Boolean)
        const customerKeySet = new Set(customerKeys)
        const customerProjectTags = projects
          .filter((project) => customerKeySet.has(project.customerKey))
          .map((project) => project.tag)
        projectFilterSets.push(customerProjectTags)
      }

      if (partnerNames.length > 0) {
        const partnerKeys = partnerNames
          .map((name) => customerKeysByName.get(name))
          .filter(Boolean)
        const partnerKeySet = new Set(partnerKeys)
        const partnerProjectTags = projects
          .filter((project) => partnerKeySet.has(project.partnerKey))
          .map((project) => project.tag)
        projectFilterSets.push(partnerProjectTags)
      }

      if (projectFilterSets.length > 0) {
        projectIds = projectFilterSets.reduce((acc, set) => {
          if (!acc) return set
          return _.intersection(acc, set)
        }, null)
      }
    }

    let userIds: string[] | null = null

    if (hasUserFilters) {
      const providedUserIds = query.userIds ?? []
      const employeeIds =
        employeeNames.length > 0
          ? users
              .filter((user) => employeeNames.includes(user.displayName))
              .map((user) => user.id)
          : []
      if (employeeNames.length > 0 && providedUserIds.length > 0) {
        userIds = _.intersection(providedUserIds, employeeIds)
      } else if (employeeNames.length > 0) {
        userIds = employeeIds
      } else {
        userIds = providedUserIds
      }
    }

    const resolved: { projectIds?: string[]; userIds?: string[] } = {}
    if (projectIds !== null) {
      resolved.projectIds = projectIds
    }
    if (userIds !== null) {
      resolved.userIds = userIds
    }
    return resolved
  }

  /**
   * Generate preset query from the provided preset.
   *
   * Supported presets are:
   * * `LAST_MONTH`
   * * `CURRENT_MONTH`
   * * `LAST_YEAR`
   * * `CURRENT_YEAR`
   *
   * @param preset - Query preset
   */
  private _generatePresetQuery(preset: ReportsQueryPreset) {
    const date = new DateObject().toObject()

    debug('[_generatePresetQuery]', 'Generating query from preset:', preset)
    const query =
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
    debug(
      '[_generatePresetQuery]',
      'Generated query ',
      query,
      'from preset:',
      preset
    )
    return query
  }
}
