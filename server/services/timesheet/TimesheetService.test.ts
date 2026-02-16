import test from 'ava'
import { ReportService } from '../report'
import { TimesheetService } from './TimesheetService'

const createTimesheetService = () => {
  const context = {
    userId: 'user-1',
    provider: 'azuread-openidconnect',
    subscription: {
      id: 'sub-1'
    }
  }

  const msgraphService = {
    getEvents: async () => []
  }

  const googleCalendarService = {
    getEvents: async () => []
  }

  const projectService = {
    getProjects: async () => [],
    getProjectsData: async () => ({
      projects: [],
      customers: []
    })
  }

  const timeEntryService = {
    insertMultiple: async () => null,
    collection: {
      deleteMany: async () => null
    },
    find: async () => []
  }

  const forecastTimeEntryService = {
    insertMultiple: async () => null,
    collection: {
      deleteMany: async () => null
    },
    find: async () => []
  }

  const confirmedPeriodsService = {
    insert: async () => null,
    collection: {
      findOne: async () => null,
      deleteOne: async () => null
    }
  }

  const forecastPeriodsService = {
    insert: async () => null,
    collection: {
      findOne: async () => null,
      deleteOne: async () => null
    }
  }

  const userService = {
    getUserConfiguration: async () => ({})
  }

  const holidaysService = {
    find: async () => [],
    buildSubscriptionHolidayMap: () => new Map(),
    mergePeriodHolidays: () => []
  }

  const ignoredEventsService = {
    getIgnoredEventIds: async () => []
  }

  const timesheetService = new TimesheetService(
    context as any,
    msgraphService as any,
    googleCalendarService as any,
    projectService as any,
    timeEntryService as any,
    forecastTimeEntryService as any,
    confirmedPeriodsService as any,
    forecastPeriodsService as any,
    userService as any,
    holidaysService as any,
    ignoredEventsService as any
  )

  return {
    timesheetService,
    context
  }
}

test.serial('TimesheetService submitPeriod invalidates report preload cache', async (t) => {
  const { timesheetService, context } = createTimesheetService()
  const invalidationCalls: any[] = []
  const originalInvalidate = ReportService.invalidatePreloadSnapshotCache

  ;(ReportService as any).invalidatePreloadSnapshotCache = async (
    nextContext: any
  ) => {
    invalidationCalls.push(nextContext)
  }

  try {
    await timesheetService.submitPeriod({
      tzOffset: 0,
      period: {
        id: '1_1_2026',
        startDate: '2026-01-01',
        endDate: '2026-01-07',
        matchedEvents: [],
        forecastedHours: 0
      } as any
    })
  } finally {
    ;(ReportService as any).invalidatePreloadSnapshotCache = originalInvalidate
  }

  t.is(invalidationCalls.length, 1)
  t.is(invalidationCalls[0], context)
})

test.serial('TimesheetService unsubmitPeriod invalidates report preload cache', async (t) => {
  const { timesheetService, context } = createTimesheetService()
  const invalidationCalls: any[] = []
  const originalInvalidate = ReportService.invalidatePreloadSnapshotCache

  ;(ReportService as any).invalidatePreloadSnapshotCache = async (
    nextContext: any
  ) => {
    invalidationCalls.push(nextContext)
  }

  try {
    await timesheetService.unsubmitPeriod({
      period: {
        id: '1_1_2026'
      } as any
    })
  } finally {
    ;(ReportService as any).invalidatePreloadSnapshotCache = originalInvalidate
  }

  t.is(invalidationCalls.length, 1)
  t.is(invalidationCalls[0], context)
})
