import { HolidayObject } from '../../server/graphql/resolvers/timesheet/types/HolidayObject'
import { $dayjs } from './date'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

// Extend dayjs with comparison plugins
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

/**
 * TIMEZONE HANDLING STRATEGY:
 *
 * Holidays are date-based events (not time-based), so we need to be careful with timezones.
 * This implementation follows these principles:
 *
 * 1. **Storage**: Holidays are stored as ISO date strings (YYYY-MM-DD) without time components
 * 2. **Parsing**: Always parse dates at start of day (00:00) in the company's timezone
 * 3. **Comparison**: Compare dates using day-level precision ('day'), not time precision
 * 4. **Display**: Format dates without time for display
 *
 * This prevents timezone shift bugs where:
 * - A holiday on 2025-12-24 in Oslo timezone (UTC+1)
 * - Gets parsed as 2025-12-23T23:00Z in UTC
 * - And is displayed as Dec 23 in a UTC-defaulting system
 *
 * By using ISO date strings and day-level comparisons, we ensure holidays
 * are consistent regardless of the server/client timezone.
 */

/**
 * Safely parses a holiday date ensuring day-level precision.
 * This prevents timezone-related date shifts.
 *
 * @param dateInput - Date as string (YYYY-MM-DD) or Date object
 * @returns Dayjs object at start of day
 */
export function parseHolidayDate(dateInput: string | Date) {
  // If it's already a string in YYYY-MM-DD format, use it directly
  if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    return $dayjs(dateInput)
  }

  // If it's a Date object, format it to YYYY-MM-DD to avoid timezone issues
  if (dateInput instanceof Date) {
    return $dayjs(dateInput).startOf('day')
  }

  // Fallback for other formats
  return $dayjs(dateInput).startOf('day')
}

/**
 * Converts a Date or string to ISO date format (YYYY-MM-DD).
 * This is the canonical format for storing holidays.
 *
 * @param dateInput - Date as string or Date object
 * @returns ISO date string (YYYY-MM-DD)
 */
export function toISODateString(dateInput: string | Date): string {
  return parseHolidayDate(dateInput).format('YYYY-MM-DD')
}

/**
 * Validation error for holiday configuration
 */
export class HolidayValidationError extends Error {
  constructor(
    message: string,
    public readonly field: string,
    public readonly value: any
  ) {
    super(message)
    this.name = 'HolidayValidationError'
  }
}

/**
 * Validates that hoursOff is within acceptable range and precision.
 *
 * @param hoursOff - Hours off value to validate
 * @param dailyWorkHours - Maximum daily work hours (default 8)
 * @returns True if valid
 * @throws HolidayValidationError if invalid
 */
export function validateHoursOff(
  hoursOff: number,
  dailyWorkHours: number = 8
): boolean {
  if (typeof hoursOff !== 'number' || isNaN(hoursOff)) {
    throw new HolidayValidationError(
      'Hours off must be a valid number',
      'hoursOff',
      hoursOff
    )
  }

  if (hoursOff < 0) {
    throw new HolidayValidationError(
      'Hours off cannot be negative',
      'hoursOff',
      hoursOff
    )
  }

  if (hoursOff > dailyWorkHours) {
    throw new HolidayValidationError(
      `Hours off cannot exceed daily work hours (${dailyWorkHours})`,
      'hoursOff',
      hoursOff
    )
  }

  // Check for quarter-hour precision (0.25 increments)
  const remainder = (hoursOff * 4) % 1
  if (remainder !== 0) {
    throw new HolidayValidationError(
      'Hours off must be in quarter-hour increments (0.25)',
      'hoursOff',
      hoursOff
    )
  }

  return true
}

/**
 * Validates a holiday date string.
 *
 * @param dateStr - Date string to validate (should be YYYY-MM-DD)
 * @returns True if valid
 * @throws HolidayValidationError if invalid
 */
export function validateHolidayDate(dateStr: string): boolean {
  if (!dateStr || typeof dateStr !== 'string') {
    throw new HolidayValidationError(
      'Holiday date must be a non-empty string',
      'date',
      dateStr
    )
  }

  // Check ISO date format (YYYY-MM-DD)
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/
  if (!isoDatePattern.test(dateStr)) {
    throw new HolidayValidationError(
      'Holiday date must be in ISO format (YYYY-MM-DD)',
      'date',
      dateStr
    )
  }

  // Validate that it's a real date and doesn't wrap (e.g., month 13 becomes month 1 of next year)
  const date = $dayjs(dateStr, 'YYYY-MM-DD', true) // strict parsing
  if (!date.isValid() || date.format('YYYY-MM-DD') !== dateStr) {
    throw new HolidayValidationError(
      'Holiday date is not a valid date',
      'date',
      dateStr
    )
  }

  // Check for leap year Feb 29
  if (date.month() === 1 && date.date() === 29) {
    console.warn(
      `Warning: Holiday on Feb 29 (${dateStr}). Recurring holidays on this date will be skipped in non-leap years.`
    )
  }

  return true
}

/**
 * Validates a holiday name.
 *
 * @param name - Holiday name to validate
 * @returns True if valid
 * @throws HolidayValidationError if invalid
 */
export function validateHolidayName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    throw new HolidayValidationError(
      'Holiday name must be a non-empty string',
      'name',
      name
    )
  }

  if (name.trim().length === 0) {
    throw new HolidayValidationError(
      'Holiday name cannot be empty or whitespace',
      'name',
      name
    )
  }

  if (name.length > 100) {
    throw new HolidayValidationError(
      'Holiday name must be 100 characters or less',
      'name',
      name
    )
  }

  return true
}

/**
 * Checks if a date falls on a weekend (Saturday or Sunday).
 *
 * @param dateStr - Date string in ISO format (YYYY-MM-DD)
 * @returns True if the date is a weekend
 */
export function isWeekend(dateStr: string): boolean {
  const date = $dayjs(dateStr)
  const dayOfWeek = date.day()
  return dayOfWeek === 0 || dayOfWeek === 6 // Sunday = 0, Saturday = 6
}

/**
 * Checks for duplicate holidays on the same date.
 *
 * @param holidays - Array of holidays to check
 * @returns Array of duplicate dates (empty if none)
 */
export function findDuplicateHolidays(
  holidays: Array<{ date: string }>
): string[] {
  const dateMap = new Map<string, number>()
  const duplicates: string[] = []

  for (const holiday of holidays) {
    const count = dateMap.get(holiday.date) || 0
    dateMap.set(holiday.date, count + 1)

    if (count === 1) {
      // First time we found a duplicate
      duplicates.push(holiday.date)
    }
  }

  return duplicates
}

/**
 * Calculates Easter Sunday for a given year using the Anonymous Gregorian algorithm.
 *
 * @param year - Year to calculate Easter for
 * @returns Date of Easter Sunday
 */
export function calculateEasterSunday(year: number): Date {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1

  return new Date(year, month - 1, day)
}

/**
 * Generates movable holidays (Easter-related) for a given year.
 *
 * @param year - Year to generate holidays for
 * @returns Array of holiday configurations for movable holidays
 */
export function generateMovableHolidays(
  year: number
): Array<Omit<HolidayObject, '_id' | 'periodId'>> {
  const easter = $dayjs(calculateEasterSunday(year))

  return [
    {
      date: easter.subtract(3, 'day').toDate(), // Maundy Thursday
      name: 'Skjærtorsdag',
      hoursOff: 8,
      recurring: false,
      notes: 'Moves with Easter'
    },
    {
      date: easter.subtract(2, 'day').toDate(), // Good Friday
      name: 'Langfredag',
      hoursOff: 8,
      recurring: false,
      notes: 'Moves with Easter'
    },
    {
      date: easter.toDate(), // Easter Sunday
      name: 'Første påskedag',
      hoursOff: 8,
      recurring: false,
      notes: 'Moves with Easter'
    },
    {
      date: easter.add(1, 'day').toDate(), // Easter Monday
      name: 'Andre påskedag',
      hoursOff: 8,
      recurring: false,
      notes: 'Moves with Easter'
    },
    {
      date: easter.add(39, 'day').toDate(), // Ascension Day (39 days after Easter)
      name: 'Kristi himmelfartsdag',
      hoursOff: 8,
      recurring: false,
      notes: 'Moves with Easter'
    },
    {
      date: easter.add(49, 'day').toDate(), // Pentecost Sunday (49 days after Easter)
      name: 'Første pinsedag',
      hoursOff: 8,
      recurring: false,
      notes: 'Moves with Easter'
    },
    {
      date: easter.add(50, 'day').toDate(), // Pentecost Monday
      name: 'Andre pinsedag',
      hoursOff: 8,
      recurring: false,
      notes: 'Moves with Easter'
    }
  ]
}

/**
 * Calculates the total hours off due to holidays within a given date range.
 * Now with enhanced error handling and logging for edge cases.
 *
 * @param startDate - Start date of the period (YYYY-MM-DD)
 * @param endDate - End date of the period (YYYY-MM-DD)
 * @param holidays - Array of holiday configurations
 * @param workWeekHours - Optional work week hours for validation
 * @returns Total hours off due to holidays in the period
 */
export function getHolidayHoursInPeriod(
  startDate: string,
  endDate: string,
  holidays: HolidayObject[],
  workWeekHours?: number
): number {
  if (!holidays || holidays.length === 0) {
    return 0
  }

  try {
    const start = $dayjs(startDate)
    const end = $dayjs(endDate)

    if (!start.isValid() || !end.isValid()) {
      console.error(
        `Invalid date range in getHolidayHoursInPeriod: ${startDate} - ${endDate}`
      )
      return 0
    }

    if (end.isBefore(start)) {
      console.error(
        `End date ${endDate} is before start date ${startDate} in getHolidayHoursInPeriod`
      )
      return 0
    }

    let totalHoursOff = 0

    for (const holiday of holidays) {
      try {
        const holidayDate = $dayjs(holiday.date)
        if (!holidayDate.isValid()) {
          console.warn(
            `Invalid holiday date: ${holiday.date} for ${holiday.name}`
          )
          continue
        }

        // Default to 8 hours if not specified
        const hoursOff = holiday.hoursOff ?? 8

        // Validate hours off
        try {
          validateHoursOff(hoursOff)
        } catch (err) {
          console.warn(
            `Invalid hoursOff (${hoursOff}) for holiday ${holiday.name}: ${
              err instanceof Error ? err.message : String(err)
            }`
          )
          continue
        }

        // For recurring holidays, check if the holiday falls in any year within the period
        if (holiday.recurring ?? true) {
          const startYear = start.year()
          const endYear = end.year()

          // Handle periods that span multiple years
          for (let year = startYear; year <= endYear; year++) {
            let holidayThisYear = $dayjs(holiday.date).year(year)

            // Handle Feb 29 in non-leap years
            if (
              holidayThisYear.month() === 1 &&
              holidayThisYear.date() === 29 &&
              !$dayjs(new Date(year, 1, 1)).isLeapYear()
            ) {
              console.warn(
                `Skipping ${holiday.name} in ${year} (not a leap year)`
              )
              continue
            }

            if (
              holidayThisYear.isSameOrAfter(start, 'day') &&
              holidayThisYear.isSameOrBefore(end, 'day')
            ) {
              totalHoursOff += hoursOff
            }
          }
        } else {
          // For non-recurring holidays, check the exact date
          if (
            holidayDate.isSameOrAfter(start, 'day') &&
            holidayDate.isSameOrBefore(end, 'day')
          ) {
            totalHoursOff += hoursOff
          }
        }
      } catch (err) {
        console.error(
          `Error processing holiday ${holiday.name}:`,
          err instanceof Error ? err.message : String(err)
        )
        // Continue processing other holidays
      }
    }

    // Validate total hours doesn't exceed period work hours
    if (workWeekHours && totalHoursOff > workWeekHours) {
      console.error(
        `Holiday hours (${totalHoursOff}) exceed work week hours (${workWeekHours}) for period ${startDate} to ${endDate}. ` +
          `Check for misconfigured holidays or duplicates.`
      )
    }

    return totalHoursOff
  } catch (err) {
    console.error(
      `Error in getHolidayHoursInPeriod for period ${startDate} - ${endDate}:`,
      err instanceof Error ? err.message : String(err)
    )
    return 0
  }
}

/**
 * Calculates expected work hours for a period, accounting for holidays.
 *
 * @param workWeekHours - Standard work week hours (e.g., 40)
 * @param startDate - Start date of the period (YYYY-MM-DD)
 * @param endDate - End date of the period (YYYY-MM-DD)
 * @param holidays - Array of holiday configurations
 * @returns Expected work hours for the period after subtracting holidays
 */
export function getExpectedHoursForPeriod(
  workWeekHours: number,
  startDate: string,
  endDate: string,
  holidays: HolidayObject[]
): number {
  const holidayHours = getHolidayHoursInPeriod(startDate, endDate, holidays)
  return Math.max(0, workWeekHours - holidayHours)
}

/**
 * Gets the number of working days (Monday-Friday) in a period.
 *
 * @param startDate - Start date of the period (YYYY-MM-DD)
 * @param endDate - End date of the period (YYYY-MM-DD)
 * @returns Number of working days (Mon-Fri) in the period
 */
export function getWorkingDaysInPeriod(
  startDate: string,
  endDate: string
): number {
  const start = $dayjs(startDate)
  const end = $dayjs(endDate)

  let workingDays = 0
  let current = start

  while (current.isSameOrBefore(end, 'day')) {
    const dayOfWeek = current.day()
    // 0 = Sunday, 6 = Saturday, so 1-5 are working days
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      workingDays++
    }
    current = current.add(1, 'day')
  }

  return workingDays
}

/**
 * Norway national holidays preset.
 * These are the standard Norwegian national holidays (red days).
 * Note: These are partial objects for import - they will get default values
 * (hoursOff=8, recurring=true) when stored in the database.
 */
export const NORWAY_HOLIDAYS: Array<
  Pick<HolidayObject, 'date' | 'name' | 'hoursOff' | 'recurring' | 'notes'>
> = [
  {
    date: new Date('2025-01-01'),
    name: 'Første nyttårsdag',
    hoursOff: 8,
    recurring: true
  },
  {
    date: new Date('2025-04-17'),
    name: 'Skjærtorsdag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: new Date('2025-04-18'),
    name: 'Langfredag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: new Date('2025-04-20'),
    name: 'Første påskedag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: new Date('2025-04-21'),
    name: 'Andre påskedag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: new Date('2025-05-01'),
    name: 'Arbeidernes dag',
    hoursOff: 8,
    recurring: true
  },
  {
    date: new Date('2025-05-17'),
    name: 'Grunnlovsdag',
    hoursOff: 8,
    recurring: true
  },
  {
    date: new Date('2025-05-29'),
    name: 'Kristi himmelfartsdag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: new Date('2025-06-08'),
    name: 'Første pinsedag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: new Date('2025-06-09'),
    name: 'Andre pinsedag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: new Date('2025-12-24'),
    name: 'Julaften',
    hoursOff: 8,
    recurring: true,
    notes: 'Company can customize hours'
  },
  {
    date: new Date('2025-12-25'),
    name: 'Første juledag',
    hoursOff: 8,
    recurring: true
  },
  {
    date: new Date('2025-12-26'),
    name: 'Andre juledag',
    hoursOff: 8,
    recurring: true
  },
  {
    date: new Date('2025-12-31'),
    name: 'Nyttårsaften',
    hoursOff: 4,
    recurring: true,
    notes: 'Often half day - company can customize'
  }
]
