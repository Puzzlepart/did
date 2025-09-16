import test from 'ava'
import DateUtils from './date'

// Test the core ISO week and year calculation
test('getIsoWeekAndYear calculates correct ISO week and year for various dates', (t) => {
  // Test Week 1 2021 - should be ISO year 2021, not 2020
  const jan4_2021 = new Date(2021, 0, 4) // Monday, January 4, 2021
  const week1_2021 = DateUtils.getIsoWeekAndYear(jan4_2021)
  t.is(week1_2021.isoWeek, 1, 'January 4, 2021 should be week 1')
  t.is(week1_2021.isoYear, 2021, 'January 4, 2021 should be ISO year 2021')
  
  // Test Week 1 2023 - should be ISO year 2023, not 2022  
  const jan2_2023 = new Date(2023, 0, 2) // Monday, January 2, 2023
  const week1_2023 = DateUtils.getIsoWeekAndYear(jan2_2023)
  t.is(week1_2023.isoWeek, 1, 'January 2, 2023 should be week 1')
  t.is(week1_2023.isoYear, 2023, 'January 2, 2023 should be ISO year 2023')
  
  // Test Week 1 2026 - edge case where week 1 starts in previous calendar year
  const dec29_2025 = new Date(2025, 11, 29) // Monday, December 29, 2025
  const week1_2026 = DateUtils.getIsoWeekAndYear(dec29_2025)
  t.is(week1_2026.isoWeek, 1, 'December 29, 2025 should be week 1 of ISO year 2026')
  t.is(week1_2026.isoYear, 2026, 'December 29, 2025 should be ISO year 2026')
})

test('getIsoWeekAndYear handles year-end edge cases correctly', (t) => {
  // Test December 31, 2020 - should be Week 53 of 2020
  const dec31_2020 = new Date(2020, 11, 31) // Thursday, December 31, 2020
  const result_2020 = DateUtils.getIsoWeekAndYear(dec31_2020)
  t.is(result_2020.isoWeek, 53, 'December 31, 2020 should be week 53')
  t.is(result_2020.isoYear, 2020, 'December 31, 2020 should be ISO year 2020')
  
  // Test January 1, 2021 - should be Week 53 of 2020 (not Week 1 of 2021)
  const jan1_2021 = new Date(2021, 0, 1) // Friday, January 1, 2021
  const result_jan1_2021 = DateUtils.getIsoWeekAndYear(jan1_2021)
  t.is(result_jan1_2021.isoWeek, 53, 'January 1, 2021 should be week 53 of 2020')
  t.is(result_jan1_2021.isoYear, 2020, 'January 1, 2021 should be ISO year 2020')
  
  // Test January 3, 2021 - should be Week 53 of 2020
  const jan3_2021 = new Date(2021, 0, 3) // Sunday, January 3, 2021
  const result_jan3_2021 = DateUtils.getIsoWeekAndYear(jan3_2021)
  t.is(result_jan3_2021.isoWeek, 53, 'January 3, 2021 should be week 53 of 2020')
  t.is(result_jan3_2021.isoYear, 2020, 'January 3, 2021 should be ISO year 2020')
})

test('getIsoWeekStartDate returns correct Monday for various ISO weeks', (t) => {
  // Test Week 1 2021
  const week1_2021_start = DateUtils.getIsoWeekStartDate(1, 2021)
  t.is(week1_2021_start.jsDate.getFullYear(), 2021)
  t.is(week1_2021_start.jsDate.getMonth(), 0) // January
  t.is(week1_2021_start.jsDate.getDate(), 4)
  t.is(week1_2021_start.jsDate.getDay(), 1, 'Should be Monday')
  
  // Test Week 1 2023
  const week1_2023_start = DateUtils.getIsoWeekStartDate(1, 2023)
  t.is(week1_2023_start.jsDate.getFullYear(), 2023)
  t.is(week1_2023_start.jsDate.getMonth(), 0) // January
  t.is(week1_2023_start.jsDate.getDate(), 2)
  t.is(week1_2023_start.jsDate.getDay(), 1, 'Should be Monday')
  
  // Test Week 1 2026 - starts in previous calendar year
  const week1_2026_start = DateUtils.getIsoWeekStartDate(1, 2026)
  t.is(week1_2026_start.jsDate.getFullYear(), 2025) // Calendar year 2025
  t.is(week1_2026_start.jsDate.getMonth(), 11) // December
  t.is(week1_2026_start.jsDate.getDate(), 29)
  t.is(week1_2026_start.jsDate.getDay(), 1, 'Should be Monday')
  
  // Test Week 52 2021
  const week52_2021_start = DateUtils.getIsoWeekStartDate(52, 2021)
  t.is(week52_2021_start.jsDate.getFullYear(), 2021)
  t.is(week52_2021_start.jsDate.getMonth(), 11) // December
  t.is(week52_2021_start.jsDate.getDate(), 27)
  t.is(week52_2021_start.jsDate.getDay(), 1, 'Should be Monday')
})

test('getIsoWeekStartDate and getIsoWeekAndYear are consistent', (t) => {
  // Test that getting the start date of a week and then calculating its ISO week/year
  // returns the original week and year
  const testCases = [
    { week: 1, year: 2021 },
    { week: 1, year: 2023 },
    { week: 1, year: 2026 },
    { week: 52, year: 2021 },
    { week: 26, year: 2023 },
    { week: 53, year: 2020 }
  ]
  
  testCases.forEach(({ week, year }) => {
    const startDate = DateUtils.getIsoWeekStartDate(week, year)
    const calculated = DateUtils.getIsoWeekAndYear(startDate.jsDate)
    
    t.is(calculated.isoWeek, week, `Week ${week} ${year}: calculated week should match`)
    t.is(calculated.isoYear, year, `Week ${week} ${year}: calculated year should match`)
  })
})

test('getPeriod uses ISO year instead of calendar year', (t) => {
  // Test Week 1 2021 - should use ISO year 2021 in period ID
  const jan4_2021 = new Date(2021, 0, 4) // Monday of Week 1 2021
  const period_2021 = DateUtils.getPeriod(jan4_2021)
  t.true(period_2021.endsWith('_2021'), 'Period ID should end with ISO year 2021')
  t.true(period_2021.startsWith('1_'), 'Period ID should start with week 1')
  
  // Test Week 1 2026 (starts December 29, 2025) - should use ISO year 2026
  const dec29_2025 = new Date(2025, 11, 29) // Monday of Week 1 2026
  const period_2026 = DateUtils.getPeriod(dec29_2025)
  t.true(period_2026.endsWith('_2026'), 'Period ID should end with ISO year 2026, not 2025')
  t.true(period_2026.startsWith('1_'), 'Period ID should start with week 1')
  
  // Test January 1, 2021 (belongs to Week 53 of 2020) - should use ISO year 2020
  const jan1_2021 = new Date(2021, 0, 1) // Friday, belongs to Week 53 of 2020
  const period_jan1_2021 = DateUtils.getPeriod(jan1_2021)
  t.true(period_jan1_2021.endsWith('_2020'), 'Period ID should end with ISO year 2020, not 2021')
  t.true(period_jan1_2021.startsWith('53_'), 'Period ID should start with week 53')
})

test('getPeriod format is correct', (t) => {
  const testDate = new Date(2023, 5, 15) // Some date in 2023
  const period = DateUtils.getPeriod(testDate)
  
  // Period format should be: week_month_isoYear
  const parts = period.split('_')
  t.is(parts.length, 3, 'Period should have 3 parts separated by underscores')
  
  const [week, month, year] = parts
  t.true(!isNaN(Number(week)), 'Week should be a number')
  t.true(!isNaN(Number(month)), 'Month should be a number')
  t.true(!isNaN(Number(year)), 'Year should be a number')
  t.true(Number(week) >= 1 && Number(week) <= 53, 'Week should be between 1 and 53')
  t.true(Number(month) >= 1 && Number(month) <= 12, 'Month should be between 1 and 12')
})

test('ISO week algorithm handles various weekdays correctly', (t) => {
  // Test a full week to ensure all days return the same ISO week and year
  const monday = new Date(2023, 0, 2) // Monday, Week 1 2023
  const tuesday = new Date(2023, 0, 3)
  const wednesday = new Date(2023, 0, 4)
  const thursday = new Date(2023, 0, 5)
  const friday = new Date(2023, 0, 6)
  const saturday = new Date(2023, 0, 7)
  const sunday = new Date(2023, 0, 8)
  
  const days = [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
  
  days.forEach((day, index) => {
    const result = DateUtils.getIsoWeekAndYear(day)
    t.is(result.isoWeek, 1, `Day ${index + 1} of week should be week 1`)
    t.is(result.isoYear, 2023, `Day ${index + 1} of week should be ISO year 2023`)
  })
})

test('ISO week handles leap years correctly', (t) => {
  // Test leap year edge case
  const feb29_2020 = new Date(2020, 1, 29) // February 29, 2020 (leap year)
  const result = DateUtils.getIsoWeekAndYear(feb29_2020)
  
  t.true(result.isoWeek >= 1 && result.isoWeek <= 53, 'Week should be valid')
  t.is(result.isoYear, 2020, 'ISO year should be 2020')
  
  // Verify consistency
  const startDate = DateUtils.getIsoWeekStartDate(result.isoWeek, result.isoYear)
  const calculated = DateUtils.getIsoWeekAndYear(startDate.jsDate)
  t.is(calculated.isoWeek, result.isoWeek, 'Round-trip consistency check for leap year')
})