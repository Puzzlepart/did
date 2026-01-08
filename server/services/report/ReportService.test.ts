import test from 'ava'
import { ReportService } from './ReportService'

/**
 * Test for ReportService memory optimization
 * 
 * Note: These tests access private methods using `as any` type casting.
 * This is intentional to test critical safety limit logic that prevents memory exhaustion.
 * The safety limit behavior is complex and important enough to warrant direct testing
 * rather than only testing through the public getReport API, which would require
 * extensive mocking of database operations and make tests brittle.
 */
test('ReportService should cap extremely large limits', async (t) => {
  // Mock the required dependencies
  const mockContext = { userId: 'test-user' }
  const mockProjectService = { getProjectsData: async () => ({ projects: [], customers: [] }) }
  const mockCustomerService = { getCustomers: async () => [] }
  const mockUserService = { getUsers: async () => [] }
  const mockTimeEntryService = { 
    find: async () => [],
    findPaginated: async () => [],
    count: async () => 0
  }
  const mockConfirmedPeriodService = { find: async () => [] }
  const mockForecastTimeEntryService = { find: async () => [] }

  const reportService = new ReportService(
    mockContext as any,
    mockProjectService as any,
    mockCustomerService as any,
    mockUserService as any,
    mockTimeEntryService as any,
    mockForecastTimeEntryService as any,
    mockConfirmedPeriodService as any
  )

  // Test that extremely large limits are capped to MAX_LIMIT (100000)
  const cappedQuery = (reportService as any)._applySafetyLimits({ limit: 200000 })
  t.is(cappedQuery.limit, 100000, 'Extremely large limits should be capped to 100000')
  
  // Test that limits under MAX_LIMIT pass through unchanged
  const validQuery = (reportService as any)._applySafetyLimits({ limit: 50000 })
  t.is(validQuery.limit, 50000, 'Limits under MAX_LIMIT should pass through unchanged')
})

test('ReportService should not cap limits below MAX_LIMIT', async (t) => {
  const mockContext = { userId: 'test-user' }
  const mockProjectService = { getProjectsData: async () => ({ projects: [], customers: [] }) }
  const mockCustomerService = { getCustomers: async () => [] }
  const mockUserService = { getUsers: async () => [] }
  const mockTimeEntryService = { 
    find: async () => [],
    findPaginated: async () => [],
    count: async () => 0
  }
  const mockConfirmedPeriodService = { find: async () => [] }
  const mockForecastTimeEntryService = { find: async () => [] }

  const reportService = new ReportService(
    mockContext as any,
    mockProjectService as any,
    mockCustomerService as any,
    mockUserService as any,
    mockTimeEntryService as any,
    mockForecastTimeEntryService as any,
    mockConfirmedPeriodService as any
  )

  // Test that limits are not modified if they're reasonable
  const safeQuery = (reportService as any)._applySafetyLimits({ limit: 1000 })
  t.is(safeQuery.limit, 1000, 'Reasonable limits should not be modified')
  
  // Test that queries without limits keep no limit
  const noLimitQuery = (reportService as any)._applySafetyLimits({})
  t.is(noLimitQuery.limit, undefined, 'Queries without limits should remain unlimited')
})

test('ReportService getReportCount should count raw time entries', async (t) => {
  const mockContext = { userId: 'test-user' }
  const mockProjectService = { getProjectsData: async () => ({ projects: [], customers: [] }) }
  const mockCustomerService = { getCustomers: async () => [] }
  const mockUserService = { getUsers: async () => [] }
  let capturedQuery: any
  const mockTimeEntryService = { 
    count: async (query: any) => {
      capturedQuery = query
      return 123
    },
    find: async () => [],
    findPaginated: async () => [],
    distinct: async () => []
  }
  const mockConfirmedPeriodService = { find: async () => [] }
  const mockForecastTimeEntryService = { 
    find: async () => [],
    count: async () => 0
  }

  const reportService = new ReportService(
    mockContext as any,
    mockProjectService as any,
    mockCustomerService as any,
    mockUserService as any,
    mockTimeEntryService as any,
    mockForecastTimeEntryService as any,
    mockConfirmedPeriodService as any
  )

  const count = await reportService.getReportCount('CURRENT_YEAR', {})

  t.is(count, 123)
  t.truthy(capturedQuery?.year, 'Expected generated query to include year filter')
})
