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
test('ReportService should apply safety limits for large queries', async (t) => {
  // Mock the required dependencies
  const mockContext = { userId: 'test-user' }
  const mockProjectService = { getProjectsData: async () => ({ projects: [], customers: [] }) }
  const mockUserService = { getUsers: async () => [] }
  const mockTimeEntryService = { 
    find: async () => [],
    findPaginated: async () => [],
    streamFind: async () => {}
  }
  const mockConfirmedPeriodService = { find: async () => [] }
  const mockForecastTimeEntryService = { find: async () => [] }

  const reportService = new ReportService(
    mockContext as any,
    mockProjectService as any,
    mockUserService as any,
    mockTimeEntryService as any,
    mockForecastTimeEntryService as any,
    mockConfirmedPeriodService as any
  )

  // Test that CURRENT_YEAR preset is identified as a large query
  const isLargeQuery = (reportService as any)._isLargeQuery('CURRENT_YEAR')
  t.true(isLargeQuery, 'CURRENT_YEAR should be identified as a large query')

  // Test that safety limits are applied
  const safeQuery = (reportService as any)._applySafetyLimits({}, 'CURRENT_YEAR', true)
  t.is(safeQuery.limit, 5000, 'Default limit should be applied for large queries')

  // Test that extremely large limits are capped
  const cappedQuery = (reportService as any)._applySafetyLimits({ limit: 100000 }, 'CURRENT_YEAR', true)
  t.is(cappedQuery.limit, 50000, 'Extremely large limits should be capped')
})

test('ReportService should not apply limits for small queries', async (t) => {
  const mockContext = { userId: 'test-user' }
  const mockProjectService = { getProjectsData: async () => ({ projects: [], customers: [] }) }
  const mockUserService = { getUsers: async () => [] }
  const mockTimeEntryService = { 
    find: async () => [],
    findPaginated: async () => [],
    streamFind: async () => {}
  }
  const mockConfirmedPeriodService = { find: async () => [] }
  const mockForecastTimeEntryService = { find: async () => [] }

  const reportService = new ReportService(
    mockContext as any,
    mockProjectService as any,
    mockUserService as any,
    mockTimeEntryService as any,
    mockForecastTimeEntryService as any,
    mockConfirmedPeriodService as any
  )

  // Test that CURRENT_MONTH preset with month field is not identified as a large query
  const generatedQuery = { month: 12, year: 2025 } // Simulating generated query from CURRENT_MONTH preset
  const isLargeQuery = (reportService as any)._isLargeQuery('CURRENT_MONTH', generatedQuery)
  t.false(isLargeQuery, 'CURRENT_MONTH with month field should not be identified as a large query')

  // Test that no safety limits are applied for small queries
  const safeQuery = (reportService as any)._applySafetyLimits({}, 'CURRENT_MONTH', false)
  t.is(safeQuery.limit, undefined, 'No limit should be applied for small queries')
})

test('ReportService getReportCount should count raw time entries', async (t) => {
  const mockContext = { userId: 'test-user' }
  const mockProjectService = { getProjectsData: async () => ({ projects: [], customers: [] }) }
  const mockUserService = { getUsers: async () => [] }
  let capturedQuery: any
  const mockTimeEntryService = { 
    count: async (query: any) => {
      capturedQuery = query
      return 123
    },
    find: async () => [],
    findPaginated: async () => [],
    streamFind: async () => {}
  }
  const mockConfirmedPeriodService = { find: async () => [] }
  const mockForecastTimeEntryService = { 
    find: async () => [],
    count: async () => 0
  }

  const reportService = new ReportService(
    mockContext as any,
    mockProjectService as any,
    mockUserService as any,
    mockTimeEntryService as any,
    mockForecastTimeEntryService as any,
    mockConfirmedPeriodService as any
  )

  const count = await reportService.getReportCount('CURRENT_YEAR', {})

  t.is(count, 123)
  t.truthy(capturedQuery?.year, 'Expected generated query to include year filter')
})
