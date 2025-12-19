import test from 'ava'
import DateUtils, { DurationStringFormat } from './date'

// Mock translation function
const mockTranslate = (key: string, options?: Record<string, any>) => {
  const translations: Record<string, string> = {
    'common.hoursShortFormat_singular': `${options?.hours}h`,
    'common.hoursShortFormat_plural': `${options?.hours}h`,
    'common.minutesShortFormat_singular': `${options?.minutes}min`,
    'common.minutesShortFormat_plural': `${options?.minutes}min`,
    'common.secondsShortFormat_singular': `${options?.seconds}s`,
    'common.secondsShortFormat_plural': `${options?.seconds}s`,
    'common.hoursLongFormat_singular': `${options?.hours} hour`,
    'common.hoursLongFormat_plural': `${options?.hours} hours`,
    'common.minutesLongFormat_singular': `${options?.minutes} minute`,
    'common.minutesLongFormat_plural': `${options?.minutes} minutes`,
    'common.secondsLongFormat_singular': `${options?.seconds} second`,
    'common.secondsLongFormat_plural': `${options?.seconds} seconds`
  }
  return translations[key] || key
}

test('getDurationHours calculates correct hours for 50-minute event', (t) => {
  const startDateTime = new Date('2025-12-12T15:10:00.000Z')
  const endDateTime = new Date('2025-12-12T16:00:00.000Z')
  const hours = DateUtils.getDurationHours(startDateTime, endDateTime)

  t.is(hours, 0.8333333333333334)
  // Verify that minutes calculation will be correct
  t.is(Math.round((hours % 1) * 60), 50)
})

test('getDurationString correctly formats 50-minute duration', (t) => {
  const hours = 0.8333333333333334 // 50 minutes
  const result = DateUtils.getDurationString(hours, mockTranslate as any, {
    format: DurationStringFormat.Short
  })

  t.is(result, '50min')
})

test('getDurationString correctly formats various minute durations', (t) => {
  // Test cases for events starting at :10, :20, :40, :50
  const testCases = [
    {
      hours: 0.8333333333333334,
      expected: '50min',
      description: '50 minutes (15:10-16:00)'
    },
    {
      hours: 0.6666666666666666,
      expected: '40min',
      description: '40 minutes (15:20-16:00)'
    },
    {
      hours: 0.3333333333333333,
      expected: '20min',
      description: '20 minutes (15:40-16:00)'
    },
    {
      hours: 0.16666666666666666,
      expected: '10min',
      description: '10 minutes (15:50-16:00)'
    },
    {
      hours: 1.8333333333333333,
      expected: '1h 50min',
      description: '1 hour 50 minutes'
    },
    {
      hours: 2.6666666666666665,
      expected: '2h 40min',
      description: '2 hours 40 minutes'
    },
    { hours: 0.75, expected: '45min', description: '45 minutes' },
    { hours: 1.5, expected: '1h 30min', description: '1 hour 30 minutes' },
    { hours: 0.25, expected: '15min', description: '15 minutes' }
  ]

  for (const testCase of testCases) {
    const result = DateUtils.getDurationString(
      testCase.hours,
      mockTranslate as any,
      {
        format: DurationStringFormat.Short
      }
    )
    t.is(result, testCase.expected, `Failed for ${testCase.description}`)
  }
})

test('getDurationString with seconds option handles fractional seconds', (t) => {
  const hours = 0.8347222222222222 // 50 minutes and 5 seconds
  const result = DateUtils.getDurationString(hours, mockTranslate as any, {
    format: DurationStringFormat.Short,
    seconds: true
  })

  t.is(result, '50min 5s')
})

test('getDurationString handles zero duration', (t) => {
  const hours = 0
  const result = DateUtils.getDurationString(hours, mockTranslate as any, {
    format: DurationStringFormat.Short
  })

  t.is(result, '0h')
})

test('getDurationString handles exact hour durations', (t) => {
  const hours = 2.0
  const result = DateUtils.getDurationString(hours, mockTranslate as any, {
    format: DurationStringFormat.Short
  })

  t.is(result, '2h')
})

test('getDurationString long format works correctly', (t) => {
  const hours = 1.8333333333333333 // 1 hour 50 minutes
  const result = DateUtils.getDurationString(hours, mockTranslate as any, {
    format: DurationStringFormat.Long
  })

  t.is(result, '1 hour 50 minutes')
})

test('getDurationHours calculates correct hours for various time ranges', (t) => {
  const testCases = [
    {
      start: '2025-12-12T15:10:00.000Z',
      end: '2025-12-12T16:00:00.000Z',
      expectedMinutes: 50
    },
    {
      start: '2025-12-12T15:20:00.000Z',
      end: '2025-12-12T16:00:00.000Z',
      expectedMinutes: 40
    },
    {
      start: '2025-12-12T15:40:00.000Z',
      end: '2025-12-12T16:00:00.000Z',
      expectedMinutes: 20
    },
    {
      start: '2025-12-12T15:50:00.000Z',
      end: '2025-12-12T16:00:00.000Z',
      expectedMinutes: 10
    }
  ]

  for (const testCase of testCases) {
    const hours = DateUtils.getDurationHours(
      new Date(testCase.start),
      new Date(testCase.end)
    )
    const minutes = Math.round((hours % 1) * 60)
    t.is(
      minutes,
      testCase.expectedMinutes,
      `Failed for ${testCase.start} to ${testCase.end}`
    )
  }
})
