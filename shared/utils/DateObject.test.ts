import test from 'ava'
import { DateObject } from './DateObject'
import DateUtils from './date'

test('DateObject.fromObject creates a valid date object from object', (t) => {
  const date = new DateObject().fromObject({ year: 2023, week: 11 })
  t.is(date.jsDate.getFullYear(), 2023)
  t.is(date.jsDate.getMonth(), 2)
})

// ISO Week Edge Cases Tests
test('DateObject.fromObject handles Week 1 2021 correctly (should not show as 2020)', (t) => {
  const date = new DateObject().fromObject({ year: 2021, week: 1 })
  const { isoWeek, isoYear } = DateUtils.getIsoWeekAndYear(date.jsDate)
  
  t.is(isoWeek, 1, 'Should be week 1')
  t.is(isoYear, 2021, 'Should be ISO year 2021, not 2020')
  
  // The Monday of week 1 2021 should be January 4, 2021
  t.is(date.jsDate.getDate(), 4)
  t.is(date.jsDate.getMonth(), 0) // January is month 0
  t.is(date.jsDate.getFullYear(), 2021)
})

test('DateObject.fromObject handles Week 1 2023 correctly (should not show as 2022)', (t) => {
  const date = new DateObject().fromObject({ year: 2023, week: 1 })
  const { isoWeek, isoYear } = DateUtils.getIsoWeekAndYear(date.jsDate)
  
  t.is(isoWeek, 1, 'Should be week 1')
  t.is(isoYear, 2023, 'Should be ISO year 2023, not 2022')
  
  // The Monday of week 1 2023 should be January 2, 2023
  t.is(date.jsDate.getDate(), 2)
  t.is(date.jsDate.getMonth(), 0) // January is month 0
  t.is(date.jsDate.getFullYear(), 2023)
})

test('DateObject.fromObject handles Week 52 spanning years correctly', (t) => {
  const date = new DateObject().fromObject({ year: 2021, week: 52 })
  const { isoWeek, isoYear } = DateUtils.getIsoWeekAndYear(date.jsDate)
  
  t.is(isoWeek, 52, 'Should be week 52')
  t.is(isoYear, 2021, 'Should be ISO year 2021')
  
  // Week 52 of 2021 starts on December 27, 2021
  t.is(date.jsDate.getDate(), 27)
  t.is(date.jsDate.getMonth(), 11) // December is month 11
  t.is(date.jsDate.getFullYear(), 2021)
})

test('DateObject.fromObject handles Week 1 2026 correctly (future edge case)', (t) => {
  const date = new DateObject().fromObject({ year: 2026, week: 1 })
  const { isoWeek, isoYear } = DateUtils.getIsoWeekAndYear(date.jsDate)
  
  t.is(isoWeek, 1, 'Should be week 1')
  t.is(isoYear, 2026, 'Should be ISO year 2026')
  
  // The Monday of week 1 2026 should be December 29, 2025 (week spans years)
  t.is(date.jsDate.getDate(), 29)
  t.is(date.jsDate.getMonth(), 11) // December is month 11
  t.is(date.jsDate.getFullYear(), 2025) // Calendar year is 2025 but ISO year is 2026
})

test('DateObject.fromObject with string inputs', (t) => {
  const date = new DateObject().fromObject({ year: '2023', week: '1' })
  const { isoWeek, isoYear } = DateUtils.getIsoWeekAndYear(date.jsDate)
  
  t.is(isoWeek, 1)
  t.is(isoYear, 2023)
})

// toObject() ISO week/year consistency tests
test('toObject returns ISO year matching ISO week at year boundaries', (t) => {
  // Week 1 of 2026 starts on December 29, 2025 (calendar year 2025, ISO year 2026)
  const date = new DateObject().fromObject({ year: 2026, week: 1 })
  const obj = date.toObject()

  t.is(obj.week, 1, 'Should be ISO week 1')
  t.is(obj.year, 2026, 'Should be ISO year 2026, not calendar year 2025')
})

test('toObject returns ISO year 2020 for Jan 1 2021 (week 53 of 2020)', (t) => {
  // January 1, 2021 is a Friday in ISO week 53 of 2020
  const date = new DateObject(new Date(2021, 0, 1))
  const obj = date.toObject()

  t.is(obj.week, 53, 'Should be ISO week 53')
  t.is(obj.year, 2020, 'Should be ISO year 2020, not calendar year 2021')
})

test('toObject returns ISO year 2021 for Jan 4 2021 (week 1 of 2021)', (t) => {
  // January 4, 2021 is the Monday of ISO week 1, 2021
  const date = new DateObject(new Date(2021, 0, 4))
  const obj = date.toObject()

  t.is(obj.week, 1, 'Should be ISO week 1')
  t.is(obj.year, 2021, 'Should be ISO year 2021')
})

test('toObject round-trips correctly through fromObject at year boundaries', (t) => {
  // This is the critical data flow: toObject() -> fromObject() must be consistent
  const original = new DateObject().fromObject({ year: 2026, week: 1 })
  const { week, year } = original.toObject()
  const reconstructed = new DateObject().fromObject({ week, year })

  t.is(
    reconstructed.jsDate.getTime(),
    original.jsDate.getTime(),
    'Round-trip through toObject/fromObject should produce the same date'
  )
})

test('toObject round-trips correctly for week 53 of 2020', (t) => {
  const original = new DateObject().fromObject({ year: 2020, week: 53 })
  const { week, year } = original.toObject()
  const reconstructed = new DateObject().fromObject({ week, year })

  t.is(week, 53)
  t.is(year, 2020)
  t.is(
    reconstructed.jsDate.getTime(),
    original.jsDate.getTime(),
    'Round-trip through toObject/fromObject should produce the same date'
  )
})
