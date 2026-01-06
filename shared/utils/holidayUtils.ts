import { $dayjs } from './date'

/**
 * Represents a holiday configuration
 */
export interface Holiday {
  date: string
  name: string
  hoursOff: number
  recurring?: boolean
  notes?: string
}

/**
 * Calculates the total hours off due to holidays within a given date range.
 *
 * @param startDate - Start date of the period (YYYY-MM-DD)
 * @param endDate - End date of the period (YYYY-MM-DD)
 * @param holidays - Array of holiday configurations
 * @returns Total hours off due to holidays in the period
 */
export function getHolidayHoursInPeriod(
  startDate: string,
  endDate: string,
  holidays: Holiday[]
): number {
  if (!holidays || holidays.length === 0) {
    return 0
  }

  const start = $dayjs(startDate)
  const end = $dayjs(endDate)
  const currentYear = start.year()

  let totalHoursOff = 0

  for (const holiday of holidays) {
    const holidayDate = $dayjs(holiday.date)

    // For recurring holidays, check if the holiday falls in the current year's period
    if (holiday.recurring) {
      const holidayThisYear = $dayjs(holiday.date).year(currentYear)

      if (
        holidayThisYear.isSameOrAfter(start, 'day') &&
        holidayThisYear.isSameOrBefore(end, 'day')
      ) {
        totalHoursOff += holiday.hoursOff
      }
    } else {
      // For non-recurring holidays, check the exact date
      if (
        holidayDate.isSameOrAfter(start, 'day') &&
        holidayDate.isSameOrBefore(end, 'day')
      ) {
        totalHoursOff += holiday.hoursOff
      }
    }
  }

  return totalHoursOff
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
  holidays: Holiday[]
): number {
  const holidayHours = getHolidayHoursInPeriod(startDate, endDate, holidays)
  return Math.max(0, workWeekHours - holidayHours)
}

/**
 * Gets the number of working days in a week (Monday-Friday).
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
 */
export const NORWAY_HOLIDAYS: Holiday[] = [
  {
    date: '2025-01-01',
    name: 'Første nyttårsdag',
    hoursOff: 8,
    recurring: true
  },
  {
    date: '2025-04-17',
    name: 'Skjærtorsdag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: '2025-04-18',
    name: 'Langfredag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: '2025-04-20',
    name: 'Første påskedag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: '2025-04-21',
    name: 'Andre påskedag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: '2025-05-01',
    name: 'Arbeidernes dag',
    hoursOff: 8,
    recurring: true
  },
  {
    date: '2025-05-17',
    name: 'Grunnlovsdag',
    hoursOff: 8,
    recurring: true
  },
  {
    date: '2025-05-29',
    name: 'Kristi himmelfartsdag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: '2025-06-08',
    name: 'Første pinsedag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: '2025-06-09',
    name: 'Andre pinsedag',
    hoursOff: 8,
    recurring: false,
    notes: 'Moves with Easter'
  },
  {
    date: '2025-12-24',
    name: 'Julaften',
    hoursOff: 8,
    recurring: true,
    notes: 'Company can customize hours'
  },
  {
    date: '2025-12-25',
    name: 'Første juledag',
    hoursOff: 8,
    recurring: true
  },
  {
    date: '2025-12-26',
    name: 'Andre juledag',
    hoursOff: 8,
    recurring: true
  },
  {
    date: '2025-12-31',
    name: 'Nyttårsaften',
    hoursOff: 4,
    recurring: true,
    notes: 'Often half day - company can customize'
  }
]
