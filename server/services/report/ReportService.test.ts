import test from 'ava'
import { ReportService } from './ReportService'

/**
 * Test for ReportService memory optimization
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
  const safeQuery = (reportService as any)._applySafetyLimits({}, 'CURRENT_YEAR')
  t.is(safeQuery.limit, 5000, 'Default limit should be applied for large queries')

  // Test that extremely large limits are capped
  const cappedQuery = (reportService as any)._applySafetyLimits({ limit: 100000 }, 'CURRENT_YEAR')
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

  // Test that CURRENT_MONTH preset is not identified as a large query
  const isLargeQuery = (reportService as any)._isLargeQuery('CURRENT_MONTH')
  t.false(isLargeQuery, 'CURRENT_MONTH should not be identified as a large query')

  // Test that no safety limits are applied for small queries
  const safeQuery = (reportService as any)._applySafetyLimits({}, 'CURRENT_MONTH')
  t.is(safeQuery.limit, undefined, 'No limit should be applied for small queries')
})