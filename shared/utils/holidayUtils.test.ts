import test from 'ava'
import {
  calculateEasterSunday,
  findDuplicateHolidays,
  generateMovableHolidays,
  getHolidayHoursInPeriod,
  getWorkingDaysInPeriod,
  HolidayValidationError,
  isWeekend,
  parseHolidayDate,
  toISODateString,
  validateHolidayDate,
  validateHolidayName,
  validateHoursOff
} from './holidayUtils'
import { HolidayObject } from '../../server/graphql/resolvers/timesheet/types/HolidayObject'

// Validation Functions - validateHoursOff
test('validateHoursOff should accept valid hours', (t) => {
  t.is(validateHoursOff(0), true)
  t.is(validateHoursOff(4), true)
  t.is(validateHoursOff(8), true)
  t.is(validateHoursOff(2.5), true)
  t.is(validateHoursOff(0.25), true)
})

test('validateHoursOff should reject negative hours', (t) => {
  t.throws(() => validateHoursOff(-1), { instanceOf: HolidayValidationError })
  t.throws(() => validateHoursOff(-8), { message: /cannot be negative/ })
})

test('validateHoursOff should reject hours exceeding daily work hours', (t) => {
  t.throws(() => validateHoursOff(9), {
    message: /cannot exceed daily work hours/
  })
  t.throws(() => validateHoursOff(10, 8), {
    instanceOf: HolidayValidationError
  })
  t.is(validateHoursOff(10, 12), true) // Should work with custom daily hours
})

test('validateHoursOff should reject non-quarter-hour increments', (t) => {
  t.throws(() => validateHoursOff(4.3), { message: /quarter-hour increments/ })
  t.throws(() => validateHoursOff(7.123), {
    instanceOf: HolidayValidationError
  })
})

test('validateHoursOff should reject invalid types', (t) => {
  t.throws(() => validateHoursOff(NaN), { message: /must be a valid number/ })
  t.throws(() => validateHoursOff('8' as any), {
    instanceOf: HolidayValidationError
  })
})

// Validation Functions - validateHolidayDate
test('validateHolidayDate should accept valid ISO dates', (t) => {
  t.is(validateHolidayDate('2025-12-24'), true)
  t.is(validateHolidayDate('2025-01-01'), true)
})

test('validateHolidayDate should reject invalid formats', (t) => {
  t.throws(() => validateHolidayDate('24-12-2025'), { message: /ISO format/ })
  t.throws(() => validateHolidayDate('12/24/2025'), {
    instanceOf: HolidayValidationError
  })
  t.throws(() => validateHolidayDate('2025-13-01'), {
    message: /not a valid date/
  })
  t.throws(() => validateHolidayDate('2025-02-30'), {
    instanceOf: HolidayValidationError
  })
})

test('validateHolidayDate should reject empty or non-string values', (t) => {
  t.throws(() => validateHolidayDate(''), { message: /non-empty string/ })
  t.throws(() => validateHolidayDate(null as any), {
    instanceOf: HolidayValidationError
  })
})

// Validation Functions - validateHolidayName
test('validateHolidayName should accept valid names', (t) => {
  t.is(validateHolidayName('Christmas Day'), true)
  t.is(validateHolidayName('Julaften'), true)
})

test('validateHolidayName should reject empty or whitespace names', (t) => {
  t.throws(() => validateHolidayName(''), { message: /non-empty string/ })
  t.throws(() => validateHolidayName('   '), { message: /empty or whitespace/ })
})

test('validateHolidayName should reject names over 100 characters', (t) => {
  const longName = 'A'.repeat(101)
  t.throws(() => validateHolidayName(longName), {
    message: /100 characters or less/
  })
})

test('validateHolidayName should reject non-string values', (t) => {
  t.throws(() => validateHolidayName(null as any), {
    instanceOf: HolidayValidationError
  })
})

// Timezone Handling - parseHolidayDate
test('parseHolidayDate should parse ISO date strings correctly', (t) => {
  const result = parseHolidayDate('2025-12-24')
  t.is(result.format('YYYY-MM-DD'), '2025-12-24')
})

test('parseHolidayDate should parse Date objects at start of day', (t) => {
  const date = new Date('2025-12-24T15:30:00')
  const result = parseHolidayDate(date)
  t.is(result.hour(), 0)
  t.is(result.minute(), 0)
})

// Timezone Handling - toISODateString
test('toISODateString should convert Date to ISO string', (t) => {
  const date = new Date('2025-12-24T23:59:59')
  t.is(toISODateString(date), '2025-12-24')
})

test('toISODateString should preserve ISO string format', (t) => {
  t.is(toISODateString('2025-12-24'), '2025-12-24')
})

// Helper Functions - isWeekend
test('isWeekend should identify Saturdays', (t) => {
  t.is(isWeekend('2026-01-03'), true) // Saturday
})

test('isWeekend should identify Sundays', (t) => {
  t.is(isWeekend('2026-01-04'), true) // Sunday
})

test('isWeekend should identify weekdays as non-weekends', (t) => {
  t.is(isWeekend('2026-01-05'), false) // Monday
  t.is(isWeekend('2026-01-09'), false) // Friday
})

// Helper Functions - findDuplicateHolidays
test('findDuplicateHolidays should find duplicate dates', (t) => {
  const holidays = [
    { date: '2025-12-24' },
    { date: '2025-12-25' },
    { date: '2025-12-24' } // Duplicate
  ]
  const duplicates = findDuplicateHolidays(holidays)
  t.true(duplicates.includes('2025-12-24'))
  t.false(duplicates.includes('2025-12-25'))
})

test('findDuplicateHolidays should return empty array when no duplicates', (t) => {
  const holidays = [{ date: '2025-12-24' }, { date: '2025-12-25' }]
  t.deepEqual(findDuplicateHolidays(holidays), [])
})

test('findDuplicateHolidays should find multiple sets of duplicates', (t) => {
  const holidays = [
    { date: '2025-12-24' },
    { date: '2025-12-24' },
    { date: '2025-12-25' },
    { date: '2025-12-25' }
  ]
  const duplicates = findDuplicateHolidays(holidays)
  t.true(duplicates.includes('2025-12-24'))
  t.true(duplicates.includes('2025-12-25'))
})

// Helper Functions - getWorkingDaysInPeriod
test('getWorkingDaysInPeriod should count weekdays only', (t) => {
  // Week of Jan 5-9, 2026 (Mon-Fri) = 5 working days
  const count = getWorkingDaysInPeriod('2026-01-05', '2026-01-09')
  t.is(count, 5)
})

test('getWorkingDaysInPeriod should exclude weekends', (t) => {
  // Jan 3-5, 2026 (Sat-Mon) = 1 working day (Monday only)
  const count = getWorkingDaysInPeriod('2026-01-03', '2026-01-05')
  t.is(count, 1)
})

test('getWorkingDaysInPeriod should handle single day', (t) => {
  t.is(getWorkingDaysInPeriod('2026-01-05', '2026-01-05'), 1) // Monday
  t.is(getWorkingDaysInPeriod('2026-01-04', '2026-01-04'), 0) // Sunday
})

// Easter Calculations - calculateEasterSunday
test('calculateEasterSunday should calculate Easter Sunday correctly for known years', (t) => {
  // Known Easter dates
  t.deepEqual(calculateEasterSunday(2025), new Date(2025, 3, 20)) // April 20
  t.deepEqual(calculateEasterSunday(2026), new Date(2026, 3, 5)) // April 5
  t.deepEqual(calculateEasterSunday(2024), new Date(2024, 2, 31)) // March 31
})

// Easter Calculations - generateMovableHolidays
test('generateMovableHolidays should generate 7 Easter-related holidays', (t) => {
  const holidays = generateMovableHolidays(2025)
  t.is(holidays.length, 7)
})

test('generateMovableHolidays should include all Norwegian Easter holidays', (t) => {
  const holidays = generateMovableHolidays(2025)
  const names = holidays.map((h) => h.name)

  t.true(names.includes('Skjærtorsdag')) // Maundy Thursday
  t.true(names.includes('Langfredag')) // Good Friday
  t.true(names.includes('Første påskedag')) // Easter Sunday
  t.true(names.includes('Andre påskedag')) // Easter Monday
  t.true(names.includes('Kristi himmelfartsdag')) // Ascension Day
  t.true(names.includes('Første pinsedag')) // Pentecost
  t.true(names.includes('Andre pinsedag')) // Whit Monday
})

test('generateMovableHolidays should set all movable holidays as non-recurring', (t) => {
  const holidays = generateMovableHolidays(2025)
  holidays.forEach((h) => {
    t.is(h.recurring, false)
  })
})

test('generateMovableHolidays should calculate correct relative dates', (t) => {
  const holidays = generateMovableHolidays(2025)

  const maundyThursday = holidays.find((h) => h.name === 'Skjærtorsdag')
  t.deepEqual(maundyThursday?.date, new Date(2025, 3, 17)) // 3 days before Easter

  const ascension = holidays.find((h) => h.name === 'Kristi himmelfartsdag')
  t.deepEqual(ascension?.date, new Date(2025, 4, 29)) // 39 days after Easter
})

// Holiday Hours Calculations - getHolidayHoursInPeriod
const createHoliday = (
  date: string,
  hoursOff: number = 8,
  recurring: boolean = true
): HolidayObject => ({
  _id: 'test',
  date: new Date(date),
  name: 'Test Holiday',
  hoursOff,
  recurring
})

test('getHolidayHoursInPeriod should return 0 for periods with no holidays', (t) => {
  const result = getHolidayHoursInPeriod('2025-12-22', '2025-12-23', [])
  t.is(result, 0)
})

test('getHolidayHoursInPeriod should calculate hours for holidays within period', (t) => {
  const holidays = [
    createHoliday('2025-12-24', 8),
    createHoliday('2025-12-25', 8),
    createHoliday('2025-12-26', 8)
  ]

  const result = getHolidayHoursInPeriod('2025-12-22', '2025-12-28', holidays)
  t.is(result, 24) // 3 holidays × 8 hours
})

test('getHolidayHoursInPeriod should handle half-day holidays', (t) => {
  const holidays = [createHoliday('2025-12-31', 4)] // New Year's Eve half day

  const result = getHolidayHoursInPeriod('2025-12-30', '2025-12-31', holidays)
  t.is(result, 4)
})

test('getHolidayHoursInPeriod should exclude holidays outside period', (t) => {
  const holidays = [
    createHoliday('2025-12-24', 8),
    createHoliday('2026-01-01', 8) // Outside period
  ]

  const result = getHolidayHoursInPeriod('2025-12-22', '2025-12-28', holidays)
  t.is(result, 8) // Only Dec 24
})

test('getHolidayHoursInPeriod should handle recurring holidays across years', (t) => {
  const holidays = [createHoliday('2025-12-25', 8, true)] // Christmas, recurring

  // Query period spanning 2 years
  const result = getHolidayHoursInPeriod('2025-12-20', '2026-12-30', holidays)
  t.is(result, 16) // Christmas 2025 + Christmas 2026
})

test('getHolidayHoursInPeriod should handle non-recurring holidays', (t) => {
  const holidays = [createHoliday('2025-12-25', 8, false)]

  // Query same period across 2 years - should only count once
  const result = getHolidayHoursInPeriod('2025-12-20', '2026-12-30', holidays)
  t.is(result, 8) // Only Christmas 2025
})

test('getHolidayHoursInPeriod should handle invalid holiday dates gracefully', (t) => {
  const holidays = [
    {
      _id: 'invalid',
      date: new Date('invalid'),
      name: 'Invalid Holiday',
      hoursOff: 8,
      recurring: true
    }
  ] as HolidayObject[]

  const result = getHolidayHoursInPeriod('2025-12-22', '2025-12-28', holidays)
  t.is(result, 0) // Invalid holiday skipped
})

test('getHolidayHoursInPeriod should handle cross-year periods correctly', (t) => {
  const holidays = [createHoliday('2025-12-25', 8, true)]

  // Period from late December to early January (crosses year boundary)
  const result = getHolidayHoursInPeriod('2025-12-20', '2026-01-05', holidays)
  t.is(result, 8) // Only Christmas 2025 (2026 is outside period)
})

test('getHolidayHoursInPeriod should handle period boundaries inclusively', (t) => {
  const holidays = [createHoliday('2025-12-24', 8)]

  // Holiday on exact start date
  t.is(getHolidayHoursInPeriod('2025-12-24', '2025-12-25', holidays), 8)

  // Holiday on exact end date
  t.is(getHolidayHoursInPeriod('2025-12-23', '2025-12-24', holidays), 8)

  // Holiday is the only day in period
  t.is(getHolidayHoursInPeriod('2025-12-24', '2025-12-24', holidays), 8)
})

test('getHolidayHoursInPeriod should handle multiple holidays on different dates correctly', (t) => {
  const holidays = [
    createHoliday('2025-12-24', 8),
    createHoliday('2025-12-25', 8),
    createHoliday('2025-12-26', 8),
    createHoliday('2025-12-31', 4) // Half day
  ]

  const result = getHolidayHoursInPeriod('2025-12-22', '2025-12-31', holidays)
  t.is(result, 28) // 3 full days (24h) + 1 half day (4h)
})

// Edge Cases
test('getHolidayHoursInPeriod should handle empty holiday arrays', (t) => {
  t.is(getHolidayHoursInPeriod('2025-12-22', '2025-12-28', []), 0)
})

test('findDuplicateHolidays should handle empty holiday arrays', (t) => {
  t.deepEqual(findDuplicateHolidays([]), [])
})

test('getHolidayHoursInPeriod should handle null/undefined inputs gracefully', (t) => {
  t.is(getHolidayHoursInPeriod('2025-12-22', '2025-12-28', null as any), 0)
})
