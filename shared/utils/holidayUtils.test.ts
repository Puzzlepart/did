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

describe('holidayUtils', () => {
  describe('Validation Functions', () => {
    describe('validateHoursOff', () => {
      it('should accept valid hours', () => {
        expect(validateHoursOff(0)).toBe(true)
        expect(validateHoursOff(4)).toBe(true)
        expect(validateHoursOff(8)).toBe(true)
        expect(validateHoursOff(2.5)).toBe(true)
        expect(validateHoursOff(0.25)).toBe(true)
      })

      it('should reject negative hours', () => {
        expect(() => validateHoursOff(-1)).toThrow(HolidayValidationError)
        expect(() => validateHoursOff(-8)).toThrow('Hours off cannot be negative')
      })

      it('should reject hours exceeding daily work hours', () => {
        expect(() => validateHoursOff(9)).toThrow('Hours off cannot exceed daily work hours')
        expect(() => validateHoursOff(10, 8)).toThrow(HolidayValidationError)
        expect(validateHoursOff(10, 12)).toBe(true) // Should work with custom daily hours
      })

      it('should reject non-quarter-hour increments', () => {
        expect(() => validateHoursOff(4.3)).toThrow('quarter-hour increments')
        expect(() => validateHoursOff(7.123)).toThrow(HolidayValidationError)
      })

      it('should reject invalid types', () => {
        expect(() => validateHoursOff(NaN)).toThrow('must be a valid number')
        expect(() => validateHoursOff('8' as any)).toThrow(HolidayValidationError)
      })
    })

    describe('validateHolidayDate', () => {
      it('should accept valid ISO dates', () => {
        expect(validateHolidayDate('2025-12-24')).toBe(true)
        expect(validateHolidayDate('2025-01-01')).toBe(true)
      })

      it('should reject invalid formats', () => {
        expect(() => validateHolidayDate('24-12-2025')).toThrow('ISO format')
        expect(() => validateHolidayDate('12/24/2025')).toThrow(HolidayValidationError)
        expect(() => validateHolidayDate('2025-13-01')).toThrow('not a valid date')
        expect(() => validateHolidayDate('2025-02-30')).toThrow(HolidayValidationError)
      })

      it('should reject empty or non-string values', () => {
        expect(() => validateHolidayDate('')).toThrow('non-empty string')
        expect(() => validateHolidayDate(null as any)).toThrow(HolidayValidationError)
      })

      it('should warn about Feb 29', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
        validateHolidayDate('2024-02-29') // Leap year
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Feb 29'))
        consoleSpy.mockRestore()
      })
    })

    describe('validateHolidayName', () => {
      it('should accept valid names', () => {
        expect(validateHolidayName('Christmas Day')).toBe(true)
        expect(validateHolidayName('Julaften')).toBe(true)
      })

      it('should reject empty or whitespace names', () => {
        expect(() => validateHolidayName('')).toThrow('non-empty string')
        expect(() => validateHolidayName('   ')).toThrow('empty or whitespace')
      })

      it('should reject names over 100 characters', () => {
        const longName = 'A'.repeat(101)
        expect(() => validateHolidayName(longName)).toThrow('100 characters or less')
      })

      it('should reject non-string values', () => {
        expect(() => validateHolidayName(null as any)).toThrow(HolidayValidationError)
      })
    })
  })

  describe('Timezone Handling', () => {
    describe('parseHolidayDate', () => {
      it('should parse ISO date strings correctly', () => {
        const result = parseHolidayDate('2025-12-24')
        expect(result.format('YYYY-MM-DD')).toBe('2025-12-24')
      })

      it('should parse Date objects at start of day', () => {
        const date = new Date('2025-12-24T15:30:00')
        const result = parseHolidayDate(date)
        expect(result.hour()).toBe(0)
        expect(result.minute()).toBe(0)
      })
    })

    describe('toISODateString', () => {
      it('should convert Date to ISO string', () => {
        const date = new Date('2025-12-24T23:59:59')
        expect(toISODateString(date)).toBe('2025-12-24')
      })

      it('should preserve ISO string format', () => {
        expect(toISODateString('2025-12-24')).toBe('2025-12-24')
      })
    })
  })

  describe('Helper Functions', () => {
    describe('isWeekend', () => {
      it('should identify Saturdays', () => {
        expect(isWeekend('2026-01-03')).toBe(true) // Saturday
      })

      it('should identify Sundays', () => {
        expect(isWeekend('2026-01-04')).toBe(true) // Sunday
      })

      it('should identify weekdays as non-weekends', () => {
        expect(isWeekend('2026-01-05')).toBe(false) // Monday
        expect(isWeekend('2026-01-09')).toBe(false) // Friday
      })
    })

    describe('findDuplicateHolidays', () => {
      it('should find duplicate dates', () => {
        const holidays = [
          { date: '2025-12-24' },
          { date: '2025-12-25' },
          { date: '2025-12-24' } // Duplicate
        ]
        const duplicates = findDuplicateHolidays(holidays)
        expect(duplicates).toContain('2025-12-24')
        expect(duplicates).not.toContain('2025-12-25')
      })

      it('should return empty array when no duplicates', () => {
        const holidays = [{ date: '2025-12-24' }, { date: '2025-12-25' }]
        expect(findDuplicateHolidays(holidays)).toEqual([])
      })

      it('should find multiple sets of duplicates', () => {
        const holidays = [
          { date: '2025-12-24' },
          { date: '2025-12-24' },
          { date: '2025-12-25' },
          { date: '2025-12-25' }
        ]
        const duplicates = findDuplicateHolidays(holidays)
        expect(duplicates).toContain('2025-12-24')
        expect(duplicates).toContain('2025-12-25')
      })
    })

    describe('getWorkingDaysInPeriod', () => {
      it('should count weekdays only', () => {
        // Week of Jan 5-9, 2026 (Mon-Fri) = 5 working days
        const count = getWorkingDaysInPeriod('2026-01-05', '2026-01-09')
        expect(count).toBe(5)
      })

      it('should exclude weekends', () => {
        // Jan 3-5, 2026 (Sat-Mon) = 1 working day (Monday only)
        const count = getWorkingDaysInPeriod('2026-01-03', '2026-01-05')
        expect(count).toBe(1)
      })

      it('should handle single day', () => {
        expect(getWorkingDaysInPeriod('2026-01-05', '2026-01-05')).toBe(1) // Monday
        expect(getWorkingDaysInPeriod('2026-01-04', '2026-01-04')).toBe(0) // Sunday
      })
    })
  })

  describe('Easter Calculations', () => {
    describe('calculateEasterSunday', () => {
      it('should calculate Easter Sunday correctly for known years', () => {
        // Known Easter dates
        expect(calculateEasterSunday(2025)).toEqual(new Date(2025, 3, 20)) // April 20
        expect(calculateEasterSunday(2026)).toEqual(new Date(2026, 3, 5)) // April 5
        expect(calculateEasterSunday(2024)).toEqual(new Date(2024, 2, 31)) // March 31
      })
    })

    describe('generateMovableHolidays', () => {
      it('should generate 7 Easter-related holidays', () => {
        const holidays = generateMovableHolidays(2025)
        expect(holidays).toHaveLength(7)
      })

      it('should include all Norwegian Easter holidays', () => {
        const holidays = generateMovableHolidays(2025)
        const names = holidays.map((h) => h.name)

        expect(names).toContain('Skjærtorsdag') // Maundy Thursday
        expect(names).toContain('Langfredag') // Good Friday
        expect(names).toContain('Første påskedag') // Easter Sunday
        expect(names).toContain('Andre påskedag') // Easter Monday
        expect(names).toContain('Kristi himmelfartsdag') // Ascension Day
        expect(names).toContain('Første pinsedag') // Pentecost
        expect(names).toContain('Andre pinsedag') // Whit Monday
      })

      it('should set all movable holidays as non-recurring', () => {
        const holidays = generateMovableHolidays(2025)
        holidays.forEach((h) => {
          expect(h.recurring).toBe(false)
        })
      })

      it('should calculate correct relative dates', () => {
        const holidays = generateMovableHolidays(2025)
        const easter = new Date(2025, 3, 20) // April 20, 2025

        const maundyThursday = holidays.find((h) => h.name === 'Skjærtorsdag')
        expect(maundyThursday?.date).toEqual(new Date(2025, 3, 17)) // 3 days before Easter

        const ascension = holidays.find((h) => h.name === 'Kristi himmelfartsdag')
        expect(ascension?.date).toEqual(new Date(2025, 4, 29)) // 39 days after Easter
      })
    })
  })

  describe('Holiday Hours Calculations', () => {
    describe('getHolidayHoursInPeriod', () => {
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

      it('should return 0 for periods with no holidays', () => {
        const result = getHolidayHoursInPeriod('2025-12-22', '2025-12-23', [])
        expect(result).toBe(0)
      })

      it('should calculate hours for holidays within period', () => {
        const holidays = [
          createHoliday('2025-12-24', 8),
          createHoliday('2025-12-25', 8),
          createHoliday('2025-12-26', 8)
        ]

        const result = getHolidayHoursInPeriod('2025-12-22', '2025-12-28', holidays)
        expect(result).toBe(24) // 3 holidays × 8 hours
      })

      it('should handle half-day holidays', () => {
        const holidays = [createHoliday('2025-12-31', 4)] // New Year's Eve half day

        const result = getHolidayHoursInPeriod('2025-12-30', '2025-12-31', holidays)
        expect(result).toBe(4)
      })

      it('should exclude holidays outside period', () => {
        const holidays = [
          createHoliday('2025-12-24', 8),
          createHoliday('2026-01-01', 8) // Outside period
        ]

        const result = getHolidayHoursInPeriod('2025-12-22', '2025-12-28', holidays)
        expect(result).toBe(8) // Only Dec 24
      })

      it('should handle recurring holidays across years', () => {
        const holidays = [createHoliday('2025-12-25', 8, true)] // Christmas, recurring

        // Query period spanning 2 years
        const result = getHolidayHoursInPeriod('2025-12-20', '2026-12-30', holidays)
        expect(result).toBe(16) // Christmas 2025 + Christmas 2026
      })

      it('should handle non-recurring holidays', () => {
        const holidays = [createHoliday('2025-12-25', 8, false)]

        // Query same period across 2 years - should only count once
        const result = getHolidayHoursInPeriod('2025-12-20', '2026-12-30', holidays)
        expect(result).toBe(8) // Only Christmas 2025
      })

      it('should skip Feb 29 in non-leap years', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
        const holidays = [createHoliday('2024-02-29', 8, true)] // Leap year date

        // Query non-leap year
        const result = getHolidayHoursInPeriod('2025-02-28', '2025-03-01', holidays, 40)
        expect(result).toBe(0) // Skipped
        expect(consoleSpy).toHaveBeenCalled()
        consoleSpy.mockRestore()
      })

      it('should log error when holiday hours exceed work week', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
        const holidays = [
          createHoliday('2025-12-24', 8),
          createHoliday('2025-12-25', 8),
          createHoliday('2025-12-26', 8),
          createHoliday('2025-12-27', 8),
          createHoliday('2025-12-28', 8)
        ]

        const result = getHolidayHoursInPeriod('2025-12-22', '2025-12-28', holidays, 40)
        expect(result).toBe(40) // 5 × 8 hours
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('exceed'))
        consoleSpy.mockRestore()
      })

      it('should handle invalid holiday dates gracefully', () => {
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
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
        expect(result).toBe(0) // Invalid holiday skipped
        expect(consoleSpy).toHaveBeenCalled()
        consoleSpy.mockRestore()
      })

      it('should handle cross-year periods correctly', () => {
        const holidays = [createHoliday('2025-12-25', 8, true)]

        // Period from late December to early January (crosses year boundary)
        const result = getHolidayHoursInPeriod('2025-12-20', '2026-01-05', holidays)
        expect(result).toBe(8) // Only Christmas 2025 (2026 is outside period)
      })

      it('should handle period boundaries inclusively', () => {
        const holidays = [createHoliday('2025-12-24', 8)]

        // Holiday on exact start date
        expect(getHolidayHoursInPeriod('2025-12-24', '2025-12-25', holidays)).toBe(8)

        // Holiday on exact end date
        expect(getHolidayHoursInPeriod('2025-12-23', '2025-12-24', holidays)).toBe(8)

        // Holiday is the only day in period
        expect(getHolidayHoursInPeriod('2025-12-24', '2025-12-24', holidays)).toBe(8)
      })

      it('should handle multiple holidays on different dates correctly', () => {
        const holidays = [
          createHoliday('2025-12-24', 8),
          createHoliday('2025-12-25', 8),
          createHoliday('2025-12-26', 8),
          createHoliday('2025-12-31', 4) // Half day
        ]

        const result = getHolidayHoursInPeriod('2025-12-22', '2025-12-31', holidays)
        expect(result).toBe(28) // 3 full days (24h) + 1 half day (4h)
      })

      it('should return 0 and log error for invalid date range', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
        const holidays = [createHoliday('2025-12-25', 8)]

        // End date before start date
        const result = getHolidayHoursInPeriod('2025-12-28', '2025-12-22', holidays)
        expect(result).toBe(0)
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('before start date'))
        consoleSpy.mockRestore()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty holiday arrays', () => {
      expect(getHolidayHoursInPeriod('2025-12-22', '2025-12-28', [])).toBe(0)
      expect(findDuplicateHolidays([])).toEqual([])
    })

    it('should handle null/undefined inputs gracefully', () => {
      expect(getHolidayHoursInPeriod('2025-12-22', '2025-12-28', null as any)).toBe(0)
    })

    it('should handle date range errors', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      getHolidayHoursInPeriod('invalid', '2025-12-28', [])
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })
})
