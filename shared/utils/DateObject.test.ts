import test from 'ava'
import { DateObject } from './DateObject'

test.todo('Implement test for DateObject.fromObject')

test('DateObject.format yields the correct date format', (t) => {
  const date = new DateObject().fromObject({
    week: 11,
    year: 2021
  })
  t.is(date.format(), '2021-03-15')
})

test('DateObject.add adds 1 day correctly', (t) => {
  const date = new DateObject('2021-03-15')
  t.is(date.add('1d').format(), '2021-03-16')
})

test('DateObject.add adds 1 week correctly', (t) => {
  const date = new DateObject('2021-03-15')
  t.is(date.add('1w').format(), '2021-03-22')
})

test('DateObject.add adds 1 month correctly', (t) => {
  const date = new DateObject('2021-03-15')
  t.is(date.add('1month').format(), '2021-04-15')
})

test('DateObject.isoWeek returns correct week number (52) for 2022-12-31', (t) => {
  const date = new DateObject('2022-12-31')
  t.is(date.isoWeek(), 52)
})

test('DateObject.isoWeek returns correct week number (52) for 2023-12-31', (t) => {
  const date = new DateObject('2023-12-31')
  t.is(date.isoWeek(), 52)
})

test('DateObject.isoWeek returns correct week number (1) for 2024-12-31', (t) => {
  const date = new DateObject('2024-12-31')
  t.is(date.isoWeek(), 1)
})

test('DateObject.isoWeek returns correct week number (53) for 2026-12-31', (t) => {
  const date = new DateObject('2026-12-31')
  t.is(date.isoWeek(), 53)
})
