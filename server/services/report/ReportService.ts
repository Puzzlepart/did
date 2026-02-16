/* eslint-disable unicorn/no-array-callback-reference */
import crypto from 'crypto'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { ProjectService } from '../mongo/project/ProjectService'
import { CustomerService } from '../mongo/customer'
import { UserService } from '../mongo/user'
import { CacheScope, CacheService } from '../cache'
import { TABLE_NAME } from '../sqlite/constants'
import { DateObject } from '../../../shared/utils/DateObject'
import { RequestContext } from '../../graphql/requestContext'
import {
  ConfirmedPeriodsQuery,
  ReportsQuery,
  ReportsQueryPreset,
  TimeEntry
} from '../../graphql/resolvers/types'
import { ReportFilterOptions } from '../../graphql/resolvers/reports/types'
import { ConfirmedPeriodsService } from '../mongo/confirmed_periods'
import { ForecastedTimeEntryService } from '../mongo/forecasted_time_entry'
import { TimeEntryService } from '../mongo/time_entry'
import { Report, IGenerateReportParameters } from './types'
const debug = require('debug')('services/report/ReportService')

type PreloadSnapshot = {
  count: number
  projectIds: string[]
  userIds: string[]
}

type PreloadPresetCounts = Partial<Record<ReportsQueryPreset, number>>

type PreloadKeyInput = {
  preset?: ReportsQueryPreset
  query: ReportsQuery
  forecast: boolean
  subscriptionId: string
}

type L1PreloadSnapshotCacheEntry = {
  snapshot: PreloadSnapshot
  subscriptionId: string
  expiresAt: number
}

type L1PreloadPresetCountsCacheEntry = {
  counts: PreloadPresetCounts
  subscriptionId: string
  expiresAt: number
}

/**
 * Report service
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
export class ReportService {
  private static readonly PRELOAD_CACHE_PREFIX = 'report_preload'
  private static readonly PRELOAD_CACHE_VERSION = 1
  private static readonly PRESET_COUNT_CACHE_VERSION = 1
  private static readonly PRELOAD_CACHE_HASH_ALGORITHM = 'sha256'
  private static readonly PRELOAD_CACHE_WARM_PRESETS: ReportsQueryPreset[] = [
    'LAST_MONTH',
    'CURRENT_MONTH',
    'LAST_YEAR',
    'CURRENT_YEAR'
  ]
  private static readonly _preloadSnapshotL1Cache = new Map<
    string,
    L1PreloadSnapshotCacheEntry
  >()
  private static readonly _preloadPresetCountsL1Cache = new Map<
    string,
    L1PreloadPresetCountsCacheEntry
  >()
  private static readonly _preloadSnapshotWarmups = new Map<string, Promise<void>>()
  private static readonly _preloadSnapshotInFlight = new Map<
    string,
    Promise<PreloadSnapshot>
  >()
  private static readonly _preloadPresetCountsInFlight = new Map<
    string,
    Promise<PreloadPresetCounts>
  >()
  private readonly _preloadSnapshotCache: CacheService

  private static _parsePositiveIntegerEnv(
    value: string | undefined,
    defaultValue: number
  ): number {
    const parsed = Number.parseInt(value || '', 10)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : defaultValue
  }

  private static _getPreloadL1TtlSeconds(): number {
    return this._parsePositiveIntegerEnv(
      process.env.REPORT_PRELOAD_L1_TTL_SECONDS,
      15
    )
  }

  private static _getPreloadL1MaxEntries(): number {
    return this._parsePositiveIntegerEnv(
      process.env.REPORT_PRELOAD_L1_MAX_ENTRIES,
      500
    )
  }

  private static _getPreloadL2TtlSeconds(): number {
    return this._parsePositiveIntegerEnv(
      process.env.REPORT_PRELOAD_L2_TTL_SECONDS,
      120
    )
  }

  private static _getPreloadSnapshotFromL1(
    cacheKey: string
  ): PreloadSnapshot | null {
    const entry = this._preloadSnapshotL1Cache.get(cacheKey)
    if (!entry) return null

    if (entry.expiresAt <= Date.now()) {
      this._preloadSnapshotL1Cache.delete(cacheKey)
      return null
    }

    // Refresh recency for LRU semantics.
    this._preloadSnapshotL1Cache.delete(cacheKey)
    this._preloadSnapshotL1Cache.set(cacheKey, entry)
    return entry.snapshot
  }

  private static _setPreloadSnapshotInL1(
    cacheKey: string,
    subscriptionId: string,
    snapshot: PreloadSnapshot
  ): void {
    const ttlMilliseconds = this._getPreloadL1TtlSeconds() * 1000
    this._preloadSnapshotL1Cache.delete(cacheKey)
    this._preloadSnapshotL1Cache.set(cacheKey, {
      snapshot,
      subscriptionId,
      expiresAt: Date.now() + ttlMilliseconds
    })

    const maxEntries = this._getPreloadL1MaxEntries()
    while (this._preloadSnapshotL1Cache.size > maxEntries) {
      const oldestKey = this._preloadSnapshotL1Cache.keys().next().value
      if (!oldestKey) break
      this._preloadSnapshotL1Cache.delete(oldestKey)
    }
  }

  private static _getPreloadPresetCountsFromL1(
    subscriptionId: string
  ): PreloadPresetCounts | null {
    const entry = this._preloadPresetCountsL1Cache.get(subscriptionId)
    if (!entry) return null

    if (entry.expiresAt <= Date.now()) {
      this._preloadPresetCountsL1Cache.delete(subscriptionId)
      return null
    }

    return entry.counts
  }

  private static _setPreloadPresetCountsInL1(
    subscriptionId: string,
    counts: PreloadPresetCounts
  ): void {
    const ttlMilliseconds = this._getPreloadL1TtlSeconds() * 1000
    this._preloadPresetCountsL1Cache.set(subscriptionId, {
      counts,
      subscriptionId,
      expiresAt: Date.now() + ttlMilliseconds
    })
  }

  public static invalidatePreloadSnapshotL1ForSubscription(
    subscriptionId?: string
  ): void {
    if (!subscriptionId) return

    for (const [key, entry] of this._preloadSnapshotL1Cache.entries()) {
      if (entry.subscriptionId === subscriptionId) {
        this._preloadSnapshotL1Cache.delete(key)
      }
    }
    this._preloadPresetCountsL1Cache.delete(subscriptionId)
  }

  public static clearPreloadSnapshotL1(): void {
    this._preloadSnapshotL1Cache.clear()
    this._preloadPresetCountsL1Cache.clear()
  }

  public static async invalidatePreloadSnapshotCache(
    context: RequestContext
  ): Promise<void> {
    const subscriptionId = context?.subscription?.id
    if (!subscriptionId) return

    this.invalidatePreloadSnapshotL1ForSubscription(subscriptionId)
    this._preloadSnapshotWarmups.delete(subscriptionId)
    this._preloadSnapshotInFlight.clear()
    this._preloadPresetCountsInFlight.delete(subscriptionId)

    const cache = new CacheService(
      context,
      ReportService.PRELOAD_CACHE_PREFIX,
      CacheScope.SUBSCRIPTION
    )
    await cache.clear()
  }

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
    const cacheScope = context?.subscription?.id
      ? CacheScope.SUBSCRIPTION
      : CacheScope.GLOBAL
    this._preloadSnapshotCache = new CacheService(
      context,
      ReportService.PRELOAD_CACHE_PREFIX,
      cacheScope
    )
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

  private _normalizeCacheValue(value: any): any {
    if (value instanceof Date) {
      return value.toISOString()
    }
    if (Array.isArray(value)) {
      const normalizedArray = value.map((entry) => this._normalizeCacheValue(entry))
      const allPrimitive = normalizedArray.every((entry) => {
        return (
          entry === null ||
          ['string', 'number', 'boolean'].includes(typeof entry)
        )
      })
      if (!allPrimitive) return normalizedArray
      return [...normalizedArray].sort((a, b) =>
        `${typeof a}:${String(a)}`.localeCompare(`${typeof b}:${String(b)}`)
      )
    }
    if (!value || typeof value !== 'object') {
      return value
    }

    return Object.keys(value)
      .sort()
      .reduce<Record<string, any>>((normalized, key) => {
        const entryValue = value[key]
        if (entryValue === undefined) return normalized
        normalized[key] = this._normalizeCacheValue(entryValue)
        return normalized
      }, {})
  }

  private _buildPreloadSnapshotCacheKey(input: PreloadKeyInput): string {
    const normalizedInput = this._normalizeCacheValue({
      version: ReportService.PRELOAD_CACHE_VERSION,
      subscriptionId: input.subscriptionId,
      forecast: input.forecast,
      preset: input.preset || null,
      query: input.query || {}
    })
    const serializedInput = JSON.stringify(normalizedInput)
    return crypto
      .createHash(ReportService.PRELOAD_CACHE_HASH_ALGORITHM)
      .update(serializedInput)
      .digest('hex')
  }

  private _isSqliteShimClient(): boolean {
    return typeof (this.context?.mcl as any)?._all === 'function'
  }

  private _getSqliteJsonPath(field: string): string | null {
    switch (field) {
      case 'projectId':
      case 'userId':
      case 'week':
      case 'month':
      case 'year': {
        return `$.${field}`
      }
      case 'startDateTime':
      case 'endDateTime': {
        return `$.${field}.value`
      }
      default: {
        return null
      }
    }
  }

  private _normalizeSqliteQueryValue(value: any): any {
    return value instanceof Date ? value.toISOString() : value
  }

  private _buildSqliteWhereFromBaseQuery(baseQuery: Record<string, any>) {
    const clauses: string[] = []
    const parameters: any[] = []

    for (const [field, rawCondition] of Object.entries(baseQuery || {})) {
      const jsonPath = this._getSqliteJsonPath(field)
      if (!jsonPath) return null
      const fieldSql = `json_extract(document_json, '${jsonPath}')`
      const condition = rawCondition as any

      if (
        condition &&
        typeof condition === 'object' &&
        !Array.isArray(condition)
      ) {
        const operatorKeys = Object.keys(condition)
        for (const operator of operatorKeys) {
          const value = condition[operator]
          switch (operator) {
            case '$eq': {
              clauses.push(`${fieldSql} = ?`)
              parameters.push(this._normalizeSqliteQueryValue(value))
              break
            }
            case '$in': {
              if (!Array.isArray(value)) return null
              if (value.length === 0) {
                clauses.push('1 = 0')
                break
              }
              const placeholders = value.map(() => '?').join(', ')
              clauses.push(`${fieldSql} IN (${placeholders})`)
              parameters.push(
                ...value.map((entry) => this._normalizeSqliteQueryValue(entry))
              )
              break
            }
            case '$gte': {
              clauses.push(`${fieldSql} >= ?`)
              parameters.push(this._normalizeSqliteQueryValue(value))
              break
            }
            case '$lte': {
              clauses.push(`${fieldSql} <= ?`)
              parameters.push(this._normalizeSqliteQueryValue(value))
              break
            }
            default: {
              return null
            }
          }
        }
        continue
      }

      clauses.push(`${fieldSql} = ?`)
      parameters.push(this._normalizeSqliteQueryValue(condition))
    }

    return {
      whereSql: clauses.length > 0 ? ` AND ${clauses.join(' AND ')}` : '',
      parameters
    }
  }

  private async _computeSqlitePreloadSnapshot(
    baseQuery: Record<string, any>,
    collectionName: string
  ): Promise<PreloadSnapshot | null> {
    if (!this._isSqliteShimClient()) return null

    const scope = this._buildSqliteWhereFromBaseQuery(baseQuery)
    if (!scope) return null

    const databaseName = (this.context?.db as any)?.databaseName
    if (!databaseName) return null

    const client = this.context.mcl as any
    const scopeParameters = [databaseName, collectionName, ...scope.parameters]
    const whereSql = `WHERE database_name = ? AND collection_name = ?${scope.whereSql}`
    const groupedRows = (await client._all(
      `SELECT
         json_extract(document_json, '$.projectId') AS projectId,
         json_extract(document_json, '$.userId') AS userId,
         COUNT(*) AS entryCount
       FROM ${TABLE_NAME}
       ${whereSql}
       GROUP BY projectId, userId`,
      scopeParameters
    )) as Array<{
      projectId: string | null
      userId: string | null
      entryCount: number
    }>

    const projectIdSet = new Set<string>()
    const userIdSet = new Set<string>()
    let count = 0

    for (const row of groupedRows) {
      count += Number(row.entryCount || 0)
      if (row.projectId) projectIdSet.add(row.projectId)
      if (row.userId) userIdSet.add(row.userId)
    }

    return {
      count,
      projectIds: Array.from(projectIdSet).sort(),
      userIds: Array.from(userIdSet).sort()
    }
  }

  private _shouldUsePresetCountFastPath(
    preset?: ReportsQueryPreset,
    query: ReportsQuery = {},
    forecast?: boolean
  ): boolean {
    return Boolean(
      preset &&
        !forecast &&
        _.isEmpty(query) &&
        ReportService.PRELOAD_CACHE_WARM_PRESETS.includes(preset)
    )
  }

  private async _computeSqlitePresetCounts(
    collectionName: string
  ): Promise<PreloadPresetCounts | null> {
    if (!this._isSqliteShimClient()) return null

    const databaseName = (this.context?.db as any)?.databaseName
    if (!databaseName) return null

    const client = this.context.mcl as any
    const rows = (await client._all(
      `SELECT
         CAST(json_extract(document_json, '$.year') AS INTEGER) AS year,
         CAST(json_extract(document_json, '$.month') AS INTEGER) AS month,
         COUNT(*) AS entryCount
       FROM ${TABLE_NAME}
       WHERE database_name = ? AND collection_name = ?
       GROUP BY year, month`,
      [databaseName, collectionName]
    )) as Array<{
      year: number | null
      month: number | null
      entryCount: number
    }>

    const yearTotals = new Map<number, number>()
    const monthTotals = new Map<string, number>()

    for (const row of rows) {
      const count = Number(row.entryCount || 0)
      const year = Number(row.year)
      const month = Number(row.month)
      if (!Number.isFinite(year) || count <= 0) continue

      yearTotals.set(year, (yearTotals.get(year) || 0) + count)
      if (Number.isFinite(month)) {
        const monthKey = `${year}:${month}`
        monthTotals.set(monthKey, (monthTotals.get(monthKey) || 0) + count)
      }
    }

    const currentDate = new DateObject().toObject()
    const previousMonthDate = new DateObject().add('-1month').toObject()

    return {
      LAST_MONTH:
        monthTotals.get(`${previousMonthDate.year}:${previousMonthDate.month}`) ||
        0,
      CURRENT_MONTH:
        monthTotals.get(`${currentDate.year}:${currentDate.month}`) || 0,
      LAST_YEAR: yearTotals.get(currentDate.year - 1) || 0,
      CURRENT_YEAR: yearTotals.get(currentDate.year) || 0
    }
  }

  private async _getOrComputeSqlitePresetCounts(
    subscriptionId: string
  ): Promise<PreloadPresetCounts | null> {
    if (!this._isSqliteShimClient()) return null

    const l1Counts = ReportService._getPreloadPresetCountsFromL1(subscriptionId)
    if (l1Counts) {
      debug('[preloadPresetCount]', 'L1 cache hit', { subscriptionId })
      return l1Counts
    }

    const inFlightCounts =
      ReportService._preloadPresetCountsInFlight.get(subscriptionId)
    if (inFlightCounts) {
      debug('[preloadPresetCount]', 'Using in-flight preset count promise', {
        subscriptionId
      })
      return await inFlightCounts
    }

    const countPromise = (async () => {
      const key = `preset_counts_v${ReportService.PRESET_COUNT_CACHE_VERSION}`
      let cacheMiss = false
      const l2Start = Date.now()

      const counts = await this._preloadSnapshotCache.usingCache(
        async () => {
          cacheMiss = true
          return await this._computeSqlitePresetCounts('time_entries')
        },
        {
          key,
          expiry: ReportService._getPreloadL2TtlSeconds()
        }
      )

      if (!counts) return null

      debug(
        '[preloadPresetCount]',
        cacheMiss ? 'L2 cache miss' : 'L2 cache hit',
        {
          subscriptionId,
          l2LookupMs: Date.now() - l2Start
        }
      )

      ReportService._setPreloadPresetCountsInL1(subscriptionId, counts)
      return counts
    })()

    ReportService._preloadPresetCountsInFlight.set(subscriptionId, countPromise)
    try {
      return await countPromise
    } finally {
      ReportService._preloadPresetCountsInFlight.delete(subscriptionId)
    }
  }

  private _shouldWarmPresetSnapshots(
    preset?: ReportsQueryPreset,
    query: ReportsQuery = {},
    forecast?: boolean
  ): boolean {
    return Boolean(
      preset &&
        !forecast &&
        _.isEmpty(query) &&
        ReportService.PRELOAD_CACHE_WARM_PRESETS.includes(preset)
    )
  }

  private _schedulePresetSnapshotWarmup(subscriptionId: string): void {
    if (ReportService._preloadSnapshotWarmups.has(subscriptionId)) {
      return
    }

    const warmupPromise = (async () => {
      debug('[preloadSnapshot]', 'Starting preset warmup', { subscriptionId })
      for (const preset of ReportService.PRELOAD_CACHE_WARM_PRESETS) {
        try {
          await this._getOrComputePreloadSnapshot({
            preset,
            query: {},
            forecast: false,
            warmup: true
          })
        } catch (error) {
          debug('[preloadSnapshot]', 'Preset warmup failed', {
            subscriptionId,
            preset,
            error: error?.message
          })
        }
      }
      debug('[preloadSnapshot]', 'Finished preset warmup', { subscriptionId })
    })().finally(() => {
      ReportService._preloadSnapshotWarmups.delete(subscriptionId)
    })

    ReportService._preloadSnapshotWarmups.set(subscriptionId, warmupPromise)
  }

  private async _buildPreloadBaseQuery(
    query: ReportsQuery = {},
    preset?: ReportsQueryPreset,
    forecast?: boolean
  ) {
    const queryStart = Date.now()
    const baseQuery = forecast
      ? {
          ...(await this._generateQueryWithFilters(query)),
          startDateTime: {
            $gte: new Date()
          }
        }
      : await this._generateQueryWithFilters(query, preset)

    debug('[preloadSnapshot]', 'Generated base query', {
      preset,
      forecast: Boolean(forecast),
      queryGenerationMs: Date.now() - queryStart,
      queryKeys: Object.keys(baseQuery || {})
    })

    return baseQuery
  }

  private async _computePreloadSnapshot(
    baseQuery: Record<string, any>,
    forecast: boolean
  ): Promise<PreloadSnapshot> {
    const computeStart = Date.now()
    const service = forecast ? this._forecastTimeEntrySvc : this._timeEntrySvc
    const timeEntries = await service.find(baseQuery)
    const projectIdSet = new Set<string>()
    const userIdSet = new Set<string>()

    for (const entry of timeEntries) {
      if (entry?.projectId) projectIdSet.add(entry.projectId)
      if (entry?.userId) userIdSet.add(entry.userId)
    }

    const snapshot = {
      count: timeEntries.length,
      projectIds: Array.from(projectIdSet).sort(),
      userIds: Array.from(userIdSet).sort()
    }

    debug('[preloadSnapshot]', 'Computed snapshot', {
      forecast,
      count: snapshot.count,
      distinctProjectIds: snapshot.projectIds.length,
      distinctUserIds: snapshot.userIds.length,
      computeMs: Date.now() - computeStart
    })

    return snapshot
  }

  private async _getOrComputePreloadSnapshot({
    preset,
    query = {},
    forecast = false,
    warmup = false
  }: {
    preset?: ReportsQueryPreset
    query?: ReportsQuery
    forecast?: boolean
    warmup?: boolean
  }): Promise<PreloadSnapshot> {
    const subscriptionId = this.context?.subscription?.id || 'global'
    const cacheKey = this._buildPreloadSnapshotCacheKey({
      preset,
      query,
      forecast: Boolean(forecast),
      subscriptionId
    })

    const inFlightSnapshot = ReportService._preloadSnapshotInFlight.get(cacheKey)
    if (inFlightSnapshot) {
      debug('[preloadSnapshot]', 'Using in-flight snapshot promise', {
        cacheKey,
        forecast: Boolean(forecast)
      })
      return await inFlightSnapshot
    }

    const snapshotPromise = (async () => {
      const snapshotFromL1 = ReportService._getPreloadSnapshotFromL1(cacheKey)
      if (snapshotFromL1) {
        debug('[preloadSnapshot]', 'L1 cache hit', {
          cacheKey,
          forecast: Boolean(forecast),
          count: snapshotFromL1.count
        })
        return snapshotFromL1
      }

      const l2Start = Date.now()
      let cacheMiss = false
      const snapshotFromL2OrCompute = await this._preloadSnapshotCache.usingCache(
        async () => {
          cacheMiss = true
          const baseQuery = await this._buildPreloadBaseQuery(
            query,
            preset,
            forecast
          )
          const canUseSqlitePresetFastPath = Boolean(
            preset && !forecast && _.isEmpty(query)
          )
          if (canUseSqlitePresetFastPath) {
            const fastPathStart = Date.now()
            const sqliteSnapshot = await this._computeSqlitePreloadSnapshot(
              baseQuery as any,
              'time_entries'
            )
            if (sqliteSnapshot) {
              debug('[preloadSnapshot]', 'Using SQLite preset fast path', {
                preset,
                fastPathMs: Date.now() - fastPathStart,
                count: sqliteSnapshot.count
              })
              return sqliteSnapshot
            }
          }

          return await this._computePreloadSnapshot(baseQuery as any, forecast)
        },
        {
          key: cacheKey,
          expiry: ReportService._getPreloadL2TtlSeconds()
        }
      )

      debug('[preloadSnapshot]', cacheMiss ? 'L2 cache miss' : 'L2 cache hit', {
        cacheKey,
        forecast: Boolean(forecast),
        count: snapshotFromL2OrCompute.count,
        l2LookupMs: Date.now() - l2Start
      })

      ReportService._setPreloadSnapshotInL1(
        cacheKey,
        subscriptionId,
        snapshotFromL2OrCompute
      )

      return snapshotFromL2OrCompute
    })()

    ReportService._preloadSnapshotInFlight.set(cacheKey, snapshotPromise)
    try {
      const snapshot = await snapshotPromise
      if (this._shouldWarmPresetSnapshots(preset, query, forecast) && !warmup) {
        // Warm remaining preset snapshots asynchronously to improve tab switching.
        void Promise.resolve().then(() => {
          this._schedulePresetSnapshotWarmup(subscriptionId)
        })
      }
      return snapshot
    } finally {
      ReportService._preloadSnapshotInFlight.delete(cacheKey)
    }
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
    // Create Maps for O(1) lookup instead of O(n) with _.find
    const customerMap = new Map(customers.map((c) => [c.key, c]))
    const projectMap = new Map(projects.map((p) => [p._id, p]))
    const userMap = new Map(users?.map((u) => [u.id, u]) || [])

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
        const resource = users ? userMap.get(entry.userId) : {}
        const project = projectMap.get(entry.projectId)
        const customerKey = _.first(entry.projectId.split(' '))
        const customer = customerMap.get(customerKey)
        const partner = project?.partnerKey
          ? customerMap.get(project.partnerKey)
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
      const safeQuery = allowLarge
        ? { ...query }
        : this._applySafetyLimits(query)

      debug('[getReport]', 'Using pagination approach', {
        limit: safeQuery.limit,
        skip: safeQuery.skip,
        queryKeys: Object.keys(query_)
      })

      const [timeEntries, projectsData, users] = await Promise.all([
        safeQuery.limit
          ? this._timeEntrySvc.findPaginated(query_, {
              limit: safeQuery.limit,
              skip: safeQuery.skip,
              sort: sortAsc ? { startDateTime: 1 } : { startDateTime: -1 }
            })
          : this._timeEntrySvc.find(query_),
        this._projectSvc.getProjectsData(),
        this._userSvc.getUsers({ hiddenFromReports: false })
      ])

      debug(
        '[getReport]',
        `Retrieved ${timeEntries.length} time entries for processing`
      )

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
    const subscriptionId = this.context?.subscription?.id || 'global'
    const usePresetCountFastPath = this._shouldUsePresetCountFastPath(
      preset,
      query,
      false
    )

    if (usePresetCountFastPath && preset) {
      const presetCounts = await this._getOrComputeSqlitePresetCounts(
        subscriptionId
      )
      const presetCount = presetCounts?.[preset]

      if (typeof presetCount === 'number') {
        // Compute the full snapshot in the background so filter options
        // can reuse it when loaded right after count.
        void this._getOrComputePreloadSnapshot({
          preset,
          query,
          forecast: false,
          warmup: true
        }).catch(() => null)

        debug('[getReportCount]', 'Using preset count fast path', {
          preset,
          count: presetCount
        })
        return presetCount
      }
    }

    const snapshot = await this._getOrComputePreloadSnapshot({
      preset,
      query,
      forecast: false
    })
    debug('[getReportCount]', 'Using preload snapshot count', {
      preset,
      count: snapshot.count
    })
    return snapshot.count
  }

  /**
   * Get filter options for report preloading.
   */
  public async getReportFilterOptions(
    preset?: ReportsQueryPreset,
    query: ReportsQuery = {},
    forecast?: boolean
  ): Promise<ReportFilterOptions> {
    const enrichmentStart = Date.now()
    const snapshot = await this._getOrComputePreloadSnapshot({
      preset,
      query,
      forecast: Boolean(forecast)
    })
    const projectIds = snapshot.projectIds
    const userIds = snapshot.userIds

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
              $or: [{ _id: { $in: projectIds } }, { tag: { $in: projectIds } }]
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
            (acc, project) => [...acc, project.customerKey, project.partnerKey],
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
      new Set(parentProjects.map((project) => project.name).filter(Boolean))
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

    debug('[getReportFilterOptions]', 'Enriched filter options from snapshot', {
      preset,
      forecast: Boolean(forecast),
      matchedCount: snapshot.count,
      projectIds: projectIds.length,
      userIds: userIds.length,
      enrichmentMs: Date.now() - enrichmentStart
    })

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
    const snapshot = await this._getOrComputePreloadSnapshot({
      query: {},
      forecast: true
    })
    debug('[getForecastReportCount]', 'Using preload snapshot count', {
      count: snapshot.count
    })
    return snapshot.count
  }

  /**
   * Maximum allowed limit for any single query.
   * Set to 100,000 to balance memory usage with report completeness.
   */
  private readonly MAX_LIMIT = 100_000

  /**
   * Apply safety limits to prevent memory exhaustion on large queries
   */
  private _applySafetyLimits(query: ReportsQuery): ReportsQuery {
    const safeQuery = { ...query }

    // Cap extremely large limits
    if (safeQuery.limit && safeQuery.limit > this.MAX_LIMIT) {
      debug(
        '[_applySafetyLimits]',
        `Capping limit from ${safeQuery.limit} to ${this.MAX_LIMIT}`
      )
      safeQuery.limit = this.MAX_LIMIT
    }

    return safeQuery
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
            startDateTime: {
              $gte: new Date(queryWithoutPagination.startDateTime)
            },
            endDateTime: { $lte: new Date(queryWithoutPagination.endDateTime) },
            week: { $eq: queryWithoutPagination.week },
            month: { $eq: queryWithoutPagination.month },
            year: { $eq: queryWithoutPagination.year }
          },
          [
            ...Object.keys(queryWithoutPagination),
            !_.isEmpty(queryWithoutPagination?.userIds) && 'userId'
          ]
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
        ? (Array.isArray(baseProjectId)
          ? baseProjectId
          : [baseProjectId])
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
      hasProjectFilters
        ? this._customerSvc.getCustomers()
        : Promise.resolve([]),
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
