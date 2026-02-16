import test from 'ava'
import { ReportService } from './ReportService'
import { DateObject } from '../../../shared/utils/DateObject'

const createReportService = (overrides: {
  context?: any
  timeEntryService?: Record<string, any>
  forecastTimeEntryService?: Record<string, any>
  projectService?: Record<string, any>
  customerService?: Record<string, any>
  userService?: Record<string, any>
  confirmedPeriodService?: Record<string, any>
} = {}) => {
  const context = {
    userId: 'user-1',
    subscription: {
      id: 'sub-1'
    },
    ...overrides.context
  }

  const projectService = {
    getProjectsData: async () => ({ projects: [], customers: [] }),
    find: async () => [],
    ...overrides.projectService
  }

  const customerService = {
    getCustomers: async () => [],
    ...overrides.customerService
  }

  const userService = {
    getUsers: async () => [],
    ...overrides.userService
  }

  const timeEntryService = {
    find: async () => [],
    findPaginated: async () => [],
    count: async () => 0,
    ...overrides.timeEntryService
  }

  const forecastTimeEntryService = {
    find: async () => [],
    count: async () => 0,
    ...overrides.forecastTimeEntryService
  }

  const confirmedPeriodService = {
    find: async () => [],
    ...overrides.confirmedPeriodService
  }

  const reportService = new ReportService(
    context as any,
    projectService as any,
    customerService as any,
    userService as any,
    timeEntryService as any,
    forecastTimeEntryService as any,
    confirmedPeriodService as any
  )

  return {
    reportService,
    mocks: {
      projectService,
      customerService,
      userService,
      timeEntryService,
      forecastTimeEntryService,
      confirmedPeriodService
    }
  }
}

test.beforeEach(() => {
  ReportService.clearPreloadSnapshotL1()
})

test.afterEach.always(() => {
  ReportService.clearPreloadSnapshotL1()
})

test.serial('ReportService should cap extremely large limits', async (t) => {
  const { reportService } = createReportService()

  const cappedQuery = (reportService as any)._applySafetyLimits({
    limit: 200000
  })
  t.is(cappedQuery.limit, 100000)

  const validQuery = (reportService as any)._applySafetyLimits({ limit: 50000 })
  t.is(validQuery.limit, 50000)
})

test.serial('ReportService should not cap limits below MAX_LIMIT', async (t) => {
  const { reportService } = createReportService()

  const safeQuery = (reportService as any)._applySafetyLimits({ limit: 1000 })
  t.is(safeQuery.limit, 1000)

  const noLimitQuery = (reportService as any)._applySafetyLimits({})
  t.is(noLimitQuery.limit, undefined)
})

test.serial('ReportService should compute count and filter options with one shared scan', async (t) => {
  let findCalls = 0

  const entries = [
    { projectId: 'PZL ALPHA', userId: 'U1' },
    { projectId: 'PZL BETA', userId: 'U2' },
    { projectId: 'PZL ALPHA', userId: 'U2' }
  ]

  const { reportService } = createReportService({
    timeEntryService: {
      find: async () => {
        findCalls++
        await new Promise((resolve) => setTimeout(resolve, 10))
        return entries
      }
    },
    projectService: {
      find: async (query: any) => {
        const ids = query?.$or?.[0]?._id?.$in || []
        const tags = query?.$or?.[1]?.tag?.$in || []
        const requested = new Set([...ids, ...tags])
        return [
          {
            _id: 'PZL ALPHA',
            tag: 'PZL ALPHA',
            name: 'Alpha',
            parentKey: 'PZL PARENT',
            customerKey: 'PZL',
            partnerKey: 'CRY'
          },
          {
            _id: 'PZL BETA',
            tag: 'PZL BETA',
            name: 'Beta',
            parentKey: 'PZL PARENT',
            customerKey: 'PZL',
            partnerKey: 'CRY'
          },
          {
            _id: 'PZL PARENT',
            tag: 'PZL PARENT',
            name: 'Parent',
            parentKey: null,
            customerKey: 'PZL',
            partnerKey: null
          }
        ].filter((project) => requested.has(project._id) || requested.has(project.tag))
      }
    },
    customerService: {
      getCustomers: async () => [
        { key: 'PZL', name: 'Puzzlepart' },
        { key: 'CRY', name: 'Crayon' }
      ]
    },
    userService: {
      getUsers: async (query: any) => {
        const userIds = query?._id?.$in || []
        return [
          { id: 'U1', displayName: 'Alice' },
          { id: 'U2', displayName: 'Bob' }
        ].filter((user) => userIds.length === 0 || userIds.includes(user.id))
      }
    }
  })

  const [count, options] = await Promise.all([
    reportService.getReportCount(undefined, { year: 2026 }),
    reportService.getReportFilterOptions(undefined, { year: 2026 })
  ])

  t.is(count, 3)
  t.is(findCalls, 1)
  t.deepEqual(options.projectNames, ['Alpha', 'Beta'])
  t.deepEqual(options.parentProjectNames, ['Parent'])
  t.deepEqual(options.customerNames, ['Puzzlepart'])
  t.deepEqual(options.partnerNames, ['Crayon'])
  t.deepEqual(options.employeeNames, ['Alice', 'Bob'])
})

test.serial('ReportService snapshot handles sparse projectId/userId correctly', async (t) => {
  let findCalls = 0
  const entries = [
    { projectId: 'PZL ALPHA', userId: 'U1' },
    { projectId: 'PZL ALPHA' },
    { userId: 'U2' },
    {}
  ]

  const { reportService } = createReportService({
    timeEntryService: {
      find: async () => {
        findCalls++
        return entries
      }
    },
    projectService: {
      find: async () => [
        {
          _id: 'PZL ALPHA',
          tag: 'PZL ALPHA',
          name: 'Alpha',
          parentKey: null,
          customerKey: 'PZL',
          partnerKey: null
        }
      ]
    },
    customerService: {
      getCustomers: async () => [{ key: 'PZL', name: 'Puzzlepart' }]
    },
    userService: {
      getUsers: async (query: any) => {
        const userIds = query?._id?.$in || []
        return [
          { id: 'U1', displayName: 'Alice' },
          { id: 'U2', displayName: 'Bob' }
        ].filter((user) => userIds.includes(user.id))
      }
    }
  })

  const count = await reportService.getReportCount(undefined, { year: 2026 })
  const options = await reportService.getReportFilterOptions(undefined, {
    year: 2026
  })

  t.is(count, 4)
  t.is(findCalls, 1)
  t.deepEqual(options.projectNames, ['Alpha'])
  t.deepEqual(options.employeeNames, ['Alice', 'Bob'])
})

test.serial('ReportService forecast preload reuses one scan for count and filter options', async (t) => {
  let forecastFindCalls = 0

  const { reportService } = createReportService({
    forecastTimeEntryService: {
      find: async () => {
        forecastFindCalls++
        await new Promise((resolve) => setTimeout(resolve, 10))
        return [
          { projectId: 'PZL ALPHA', userId: 'U1' },
          { projectId: 'PZL ALPHA', userId: 'U1' }
        ]
      }
    },
    projectService: {
      find: async () => [
        {
          _id: 'PZL ALPHA',
          tag: 'PZL ALPHA',
          name: 'Alpha',
          parentKey: null,
          customerKey: 'PZL',
          partnerKey: null
        }
      ]
    },
    customerService: {
      getCustomers: async () => [{ key: 'PZL', name: 'Puzzlepart' }]
    },
    userService: {
      getUsers: async () => [{ id: 'U1', displayName: 'Alice' }]
    }
  })

  const [count, options] = await Promise.all([
    reportService.getForecastReportCount(),
    reportService.getReportFilterOptions(undefined, {}, true)
  ])

  t.is(count, 2)
  t.is(forecastFindCalls, 1)
  t.deepEqual(options.projectNames, ['Alpha'])
  t.deepEqual(options.employeeNames, ['Alice'])
})

test.serial('ReportService L1 cache hit bypasses L2 and DB compute', async (t) => {
  let findCalls = 0
  let cacheCalls = 0

  const { reportService } = createReportService({
    timeEntryService: {
      find: async () => {
        findCalls++
        return [{ projectId: 'PZL ALPHA', userId: 'U1' }]
      }
    }
  })

  ;(reportService as any)._preloadSnapshotCache = {
    usingCache: async (compute: () => Promise<any>) => {
      cacheCalls++
      return await compute()
    }
  }

  const first = await reportService.getReportCount(undefined, { year: 2026 })
  const second = await reportService.getReportCount(undefined, { year: 2026 })

  t.is(first, 1)
  t.is(second, 1)
  t.is(findCalls, 1)
  t.is(cacheCalls, 1)
})

test.serial('ReportService L2 cache hit bypasses DB compute', async (t) => {
  let findCalls = 0

  const { reportService } = createReportService({
    timeEntryService: {
      find: async () => {
        findCalls++
        return [{ projectId: 'PZL ALPHA', userId: 'U1' }]
      }
    }
  })

  ;(reportService as any)._preloadSnapshotCache = {
    usingCache: async () => ({
      count: 77,
      projectIds: ['PZL ALPHA'],
      userIds: ['U1']
    })
  }

  const count = await reportService.getReportCount(undefined, { year: 2026 })

  t.is(count, 77)
  t.is(findCalls, 0)
})

test.serial('ReportService recomputes when L1 snapshot expires', async (t) => {
  let findCalls = 0
  let cacheCalls = 0

  const { reportService } = createReportService({
    timeEntryService: {
      find: async () => {
        findCalls++
        return [{ projectId: 'PZL ALPHA', userId: 'U1' }]
      }
    }
  })

  ;(reportService as any)._preloadSnapshotCache = {
    usingCache: async (compute: () => Promise<any>) => {
      cacheCalls++
      return await compute()
    }
  }

  await reportService.getReportCount(undefined, { year: 2026 })

  const l1Cache = (ReportService as any)._preloadSnapshotL1Cache as Map<
    string,
    { expiresAt: number }
  >
  for (const entry of l1Cache.values()) {
    entry.expiresAt = Date.now() - 1
  }

  await reportService.getReportCount(undefined, { year: 2026 })

  t.is(findCalls, 2)
  t.is(cacheCalls, 2)
})

test.serial('ReportService uses SQLite preset count fast path for unfiltered preset counts', async (t) => {
  const now = new DateObject().toObject()
  const previousMonth = new DateObject().add('-1month').toObject()
  const extraCurrentYearMonth = (now.month % 12) + 1
  let sqliteCalls = 0

  const { reportService } = createReportService({
    context: {
      userId: 'user-1',
      subscription: {
        id: 'sub-sql-counts'
      },
      db: {
        databaseName: 'tenant'
      },
      mcl: {
        _all: async (sql: string) => {
          if (sql.includes("CAST(json_extract(document_json, '$.year')")) {
            sqliteCalls++
            return [
              { year: now.year, month: now.month, entryCount: 5 },
              {
                year: previousMonth.year,
                month: previousMonth.month,
                entryCount: 3
              },
              {
                year: now.year,
                month: extraCurrentYearMonth,
                entryCount: 2
              },
              { year: now.year - 1, month: 8, entryCount: 7 }
            ]
          }
          return []
        }
      }
    }
  })

  ;(reportService as any)._preloadSnapshotCache = {
    usingCache: async (compute: () => Promise<any>) => {
      return await compute()
    }
  }
  ;(reportService as any)._getOrComputePreloadSnapshot = async () => {
    return {
      count: -1,
      projectIds: [],
      userIds: []
    }
  }

  const lastMonthCount = await reportService.getReportCount('LAST_MONTH', {})
  const currentMonthCount = await reportService.getReportCount('CURRENT_MONTH', {})
  const currentYearCount = await reportService.getReportCount('CURRENT_YEAR', {})
  const lastYearCount = await reportService.getReportCount('LAST_YEAR', {})

  const expectedCurrentYear =
    5 + 2 + (previousMonth.year === now.year ? 3 : 0)
  const expectedLastYear = 7 + (previousMonth.year === now.year - 1 ? 3 : 0)

  t.is(lastMonthCount, 3)
  t.is(currentMonthCount, 5)
  t.is(currentYearCount, expectedCurrentYear)
  t.is(lastYearCount, expectedLastYear)
  t.is(sqliteCalls, 1)
})

test.serial('ReportService uses SQLite preset fast path for preset preload', async (t) => {
  let findCalls = 0
  let sqliteCalls = 0
  const lastMonth = new DateObject().add('-1month').toObject()

  const { reportService } = createReportService({
    context: {
      userId: 'user-1',
      subscription: {
        id: 'sub-sql'
      },
      db: {
        databaseName: 'tenant'
      },
      mcl: {
        _all: async (sql: string) => {
          sqliteCalls++
          if (sql.includes('GROUP BY year, month, projectId, userId')) {
            return [
              { year: lastMonth.year, month: lastMonth.month, projectId: 'PZL ALPHA', userId: 'U1', entryCount: 7 },
              { year: lastMonth.year, month: lastMonth.month, projectId: 'PZL BETA', userId: 'U2', entryCount: 4 }
            ]
          }
          if (sql.includes('COUNT(*) AS entryCount')) {
            return [
              { projectId: 'PZL ALPHA', userId: 'U1', entryCount: 7 },
              { projectId: 'PZL BETA', userId: 'U2', entryCount: 4 }
            ]
          }
          return []
        }
      }
    },
    timeEntryService: {
      find: async () => {
        findCalls++
        return []
      }
    },
    projectService: {
      find: async () => [
        {
          _id: 'PZL ALPHA',
          tag: 'PZL ALPHA',
          name: 'Alpha',
          parentKey: null,
          customerKey: 'PZL',
          partnerKey: null
        },
        {
          _id: 'PZL BETA',
          tag: 'PZL BETA',
          name: 'Beta',
          parentKey: null,
          customerKey: 'PZL',
          partnerKey: null
        }
      ]
    },
    customerService: {
      getCustomers: async () => [{ key: 'PZL', name: 'Puzzlepart' }]
    },
    userService: {
      getUsers: async () => [
        { id: 'U1', displayName: 'Alice' },
        { id: 'U2', displayName: 'Bob' }
      ]
    }
  })

  ;(reportService as any)._shouldWarmPresetSnapshots = () => false
  ;(reportService as any)._shouldUsePresetCountFastPath = () => false
  ;(reportService as any)._preloadSnapshotCache = {
    usingCache: async (compute: () => Promise<any>) => {
      return await compute()
    }
  }

  const count = await reportService.getReportCount('LAST_MONTH', {})
  const options = await reportService.getReportFilterOptions('LAST_MONTH', {})

  t.is(count, 11)
  t.is(findCalls, 0)
  // 2 SQL calls: per-preset snapshot (count) + combined preset snapshot (filter options)
  t.is(sqliteCalls, 2)
  t.deepEqual(options.projectNames, ['Alpha', 'Beta'])
  t.deepEqual(options.employeeNames, ['Alice', 'Bob'])
})

test.serial('ReportService schedules preset warmup for unfiltered preset preloads', async (t) => {
  const { reportService } = createReportService({
    timeEntryService: {
      find: async () => [{ projectId: 'PZL ALPHA', userId: 'U1' }]
    }
  })

  const warmupCalls: string[] = []
  ;(reportService as any)._schedulePresetSnapshotWarmup = (
    subscriptionId: string
  ) => {
    warmupCalls.push(subscriptionId)
  }
  ;(reportService as any)._preloadSnapshotCache = {
    usingCache: async (compute: () => Promise<any>) => {
      return await compute()
    }
  }

  await reportService.getReportCount('LAST_MONTH', {})
  await Promise.resolve()

  t.deepEqual(warmupCalls, ['sub-1'])
})

test.serial('ReportService preset snapshot fast path serves count and filter options from one SQL call', async (t) => {
  const now = new DateObject().toObject()
  const previousMonth = new DateObject().add('-1month').toObject()
  let sqliteCalls = 0

  const { reportService } = createReportService({
    context: {
      userId: 'user-1',
      subscription: {
        id: 'sub-preset-snap'
      },
      db: {
        databaseName: 'tenant'
      },
      mcl: {
        _all: async (sql: string) => {
          if (sql.includes('GROUP BY year, month, projectId, userId')) {
            sqliteCalls++
            return [
              { year: now.year, month: now.month, projectId: 'PZL ALPHA', userId: 'U1', entryCount: 3 },
              { year: now.year, month: now.month, projectId: 'PZL BETA', userId: 'U2', entryCount: 2 },
              { year: previousMonth.year, month: previousMonth.month, projectId: 'PZL ALPHA', userId: 'U1', entryCount: 4 },
              { year: now.year - 1, month: 6, projectId: 'PZL GAMMA', userId: 'U3', entryCount: 10 }
            ]
          }
          return []
        }
      }
    },
    projectService: {
      find: async () => [
        { _id: 'PZL ALPHA', tag: 'PZL ALPHA', name: 'Alpha', parentKey: null, customerKey: 'PZL', partnerKey: null },
        { _id: 'PZL BETA', tag: 'PZL BETA', name: 'Beta', parentKey: null, customerKey: 'PZL', partnerKey: null }
      ]
    },
    customerService: {
      getCustomers: async () => [{ key: 'PZL', name: 'Puzzlepart' }]
    },
    userService: {
      getUsers: async () => [
        { id: 'U1', displayName: 'Alice' },
        { id: 'U2', displayName: 'Bob' }
      ]
    }
  })

  ;(reportService as any)._preloadSnapshotCache = {
    usingCache: async (compute: () => Promise<any>) => {
      return await compute()
    }
  }

  const count = await reportService.getReportCount('CURRENT_MONTH', {})
  const options = await reportService.getReportFilterOptions('CURRENT_MONTH', {})

  t.is(count, 5)
  t.is(sqliteCalls, 1, 'Only one SQL call for both count and filter options')
  t.deepEqual(options.projectNames, ['Alpha', 'Beta'])
  t.deepEqual(options.employeeNames, ['Alice', 'Bob'])
})

test.serial('ReportService preset snapshot fast path computes all four presets at once', async (t) => {
  const now = new DateObject().toObject()
  const previousMonth = new DateObject().add('-1month').toObject()
  let sqliteCalls = 0

  const { reportService } = createReportService({
    context: {
      userId: 'user-1',
      subscription: {
        id: 'sub-all-presets'
      },
      db: {
        databaseName: 'tenant'
      },
      mcl: {
        _all: async (sql: string) => {
          if (sql.includes('GROUP BY year, month, projectId, userId')) {
            sqliteCalls++
            return [
              { year: now.year, month: now.month, projectId: 'P1', userId: 'U1', entryCount: 5 },
              { year: previousMonth.year, month: previousMonth.month, projectId: 'P2', userId: 'U2', entryCount: 3 },
              { year: now.year - 1, month: 8, projectId: 'P3', userId: 'U3', entryCount: 7 }
            ]
          }
          return []
        }
      }
    }
  })

  ;(reportService as any)._preloadSnapshotCache = {
    usingCache: async (compute: () => Promise<any>) => {
      return await compute()
    }
  }

  const currentMonthCount = await reportService.getReportCount('CURRENT_MONTH', {})
  const lastMonthCount = await reportService.getReportCount('LAST_MONTH', {})
  const currentYearCount = await reportService.getReportCount('CURRENT_YEAR', {})
  const lastYearCount = await reportService.getReportCount('LAST_YEAR', {})

  const expectedCurrentYear = 5 + (previousMonth.year === now.year ? 3 : 0)
  const expectedLastYear = 7 + (previousMonth.year === now.year - 1 ? 3 : 0)

  t.is(currentMonthCount, 5)
  t.is(lastMonthCount, 3)
  t.is(currentYearCount, expectedCurrentYear)
  t.is(lastYearCount, expectedLastYear)
  t.is(sqliteCalls, 1, 'Single SQL call serves all four preset counts')
})

test.serial('ReportService preset snapshot cross-populates individual snapshot L1 cache', async (t) => {
  const now = new DateObject().toObject()
  let snapshotComputeCalls = 0

  const { reportService } = createReportService({
    context: {
      userId: 'user-1',
      subscription: {
        id: 'sub-cross-pop'
      },
      db: {
        databaseName: 'tenant'
      },
      mcl: {
        _all: async (sql: string) => {
          if (sql.includes('GROUP BY year, month, projectId, userId')) {
            return [
              { year: now.year, month: now.month, projectId: 'P1', userId: 'U1', entryCount: 2 }
            ]
          }
          return []
        }
      }
    },
    timeEntryService: {
      find: async () => {
        snapshotComputeCalls++
        return [{ projectId: 'P1', userId: 'U1' }]
      }
    }
  })

  ;(reportService as any)._preloadSnapshotCache = {
    usingCache: async (compute: () => Promise<any>) => {
      return await compute()
    }
  }

  // First call: getReportCount via preset snapshot fast path
  // This should cross-populate individual snapshot L1 cache.
  await reportService.getReportCount('CURRENT_MONTH', {})

  // Second call: getReportFilterOptions should use the
  // cross-populated L1 cache (via preset snapshot fast path L1 hit).
  // No additional snapshot compute should be needed.
  await reportService.getReportFilterOptions('CURRENT_MONTH', {})

  t.is(snapshotComputeCalls, 0, 'No JS deserialize/scan needed thanks to cross-population')
})

test.serial('ReportService preset snapshot falls back to count-only path when SQLite unavailable', async (t) => {
  let findCalls = 0

  const { reportService } = createReportService({
    timeEntryService: {
      find: async () => {
        findCalls++
        return [{ projectId: 'P1', userId: 'U1' }]
      }
    }
  })

  ;(reportService as any)._preloadSnapshotCache = {
    usingCache: async (compute: () => Promise<any>) => {
      return await compute()
    }
  }

  const count = await reportService.getReportCount('CURRENT_MONTH', {})

  // Without SQLite shim, falls through to general snapshot compute
  t.is(count, 1)
  t.is(findCalls, 1)
})
