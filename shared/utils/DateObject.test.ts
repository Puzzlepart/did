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
