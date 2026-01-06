import test from 'ava'
import { HolidayObject } from '../../server/graphql/resolvers/timesheet/types/HolidayObject'
import {
  getHolidayHoursInPeriod,
  getExpectedHoursForPeriod,
  getWorkingDaysInPeriod
} from './holidayUtils'

const testHolidays: Partial<HolidayObject>[] = [
  {
    date: new Date('2025-12-24'),
    name: 'Christmas Eve',
    hoursOff: 8,
    recurring: true
  },
  {
    date: new Date('2025-12-25'),
    name: 'Christmas Day',
    hoursOff: 8,
    recurring: true
  },
  {
    date: new Date('2025-12-26'),
    name: 'Boxing Day',
    hoursOff: 8,
    recurring: true
  }
]

test('getHolidayHoursInPeriod calculates correct hours for week 52 2025', (t) => {
  const holidayHours = getHolidayHoursInPeriod(
    '2025-12-22',
    '2025-12-28',
    testHolidays
  )
  // 3 holidays × 8 hours = 24 hours
  t.is(holidayHours, 24)
})

test('getHolidayHoursInPeriod returns 0 when no holidays in period', (t) => {
  const holidayHours = getHolidayHoursInPeriod(
    '2025-12-15',
    '2025-12-21',
    testHolidays
  )
  t.is(holidayHours, 0)
})

test('getExpectedHoursForPeriod calculates correct hours for week 52 2025', (t) => {
  const expectedHours = getExpectedHoursForPeriod(
    40, // standard work week
    '2025-12-22',
    '2025-12-28',
    testHolidays
  )
  // 40 hours - 24 holiday hours = 16 expected hours
  t.is(expectedHours, 16)
})

test('getExpectedHoursForPeriod returns work week hours when no holidays', (t) => {
  const expectedHours = getExpectedHoursForPeriod(
    40,
    '2025-12-15',
    '2025-12-21',
    testHolidays
  )
  t.is(expectedHours, 40)
})

test('getExpectedHoursForPeriod does not return negative hours', (t) => {
  const manyHolidays: Partial<HolidayObject>[] = [
    {
      date: new Date('2025-12-22'),
      name: 'Day 1',
      hoursOff: 8,
      recurring: false
    },
    {
      date: new Date('2025-12-23'),
      name: 'Day 2',
      hoursOff: 8,
      recurring: false
    },
    {
      date: new Date('2025-12-24'),
      name: 'Day 3',
      hoursOff: 8,
      recurring: false
    },
    {
      date: new Date('2025-12-25'),
      name: 'Day 4',
      hoursOff: 8,
      recurring: false
    },
    {
      date: new Date('2025-12-26'),
      name: 'Day 5',
      hoursOff: 8,
      recurring: false
    },
    {
      date: new Date('2025-12-27'),
      name: 'Day 6',
      hoursOff: 8,
      recurring: false
    }
  ]
  const expectedHours = getExpectedHoursForPeriod(
    40,
    '2025-12-22',
    '2025-12-28',
    manyHolidays as HolidayObject[]
  )
  // Should not be negative even with 48 hours off
  t.is(expectedHours, 0)
})

test('getWorkingDaysInPeriod counts only weekdays', (t) => {
  // Week 52 2025: Mon 22 - Sun 28 Dec
  const workingDays = getWorkingDaysInPeriod('2025-12-22', '2025-12-28')
  // Mon-Fri = 5 working days
  t.is(workingDays, 5)
})

test('getWorkingDaysInPeriod excludes weekends', (t) => {
  // Single week with only weekend
  const workingDays = getWorkingDaysInPeriod('2025-12-27', '2025-12-28')
  // Sat-Sun = 0 working days
  t.is(workingDays, 0)
})

test('recurring holidays work correctly for different years', (t) => {
  const recurringHoliday: Partial<HolidayObject>[] = [
    {
      date: new Date('2024-12-25'),
      name: 'Christmas',
      hoursOff: 8,
      recurring: true
    }
  ]

  // Check 2025 - should find the holiday recurring on Dec 25, 2025
  const hours2025 = getHolidayHoursInPeriod(
    '2025-12-20',
    '2025-12-31',
    recurringHoliday as HolidayObject[]
  )
  t.is(hours2025, 8)

  // Check 2026 - should find the holiday recurring on Dec 25, 2026
  const hours2026 = getHolidayHoursInPeriod(
    '2026-12-20',
    '2026-12-31',
    recurringHoliday as HolidayObject[]
  )
  t.is(hours2026, 8)
})

test('partial day holidays work correctly', (t) => {
  const partialHolidays: Partial<HolidayObject>[] = [
    {
      date: new Date('2025-12-31'),
      name: "New Year's Eve",
      hoursOff: 4, // half day
      recurring: true
    }
  ]

  const holidayHours = getHolidayHoursInPeriod(
    '2025-12-29',
    '2026-01-04',
    partialHolidays as HolidayObject[]
  )
  t.is(holidayHours, 4)
})

test('cross-year period with recurring holidays', (t) => {
  const newYearHolidays: Partial<HolidayObject>[] = [
    {
      date: new Date('2024-12-31'),
      name: "New Year's Eve",
      hoursOff: 4,
      recurring: true
    },
    {
      date: new Date('2024-01-01'),
      name: "New Year's Day",
      hoursOff: 8,
      recurring: true
    }
  ]

  // Period spans from 2025 to 2026
  const holidayHours = getHolidayHoursInPeriod(
    '2025-12-29',
    '2026-01-04',
    newYearHolidays as HolidayObject[]
  )
  // Should find both Dec 31, 2025 (4h) and Jan 1, 2026 (8h) = 12h
  t.is(holidayHours, 12)
})
