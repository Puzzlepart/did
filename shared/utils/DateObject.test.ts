import test from 'ava'
import { DateObject } from './DateObject'

test.todo('Implement test for DateObject.fromObject')

test('DateObject.format yields the correct date format', t => {
  const date = new DateObject().fromObject({
    week: 11,
    year: 2021
  })
  t.is(date.format(), '2021-03-15')
})

test('DateObject.add adds 1 day correctly', t => {
  const date = new DateObject('2021-03-15')
  t.is(date.add('1d').format(), '2021-03-16')
})

test('DateObject.add adds 1 week correctly', t => {
  const date = new DateObject('2021-03-15')
  t.is(date.add('1w').format(), '2021-03-22')
})

test('DateObject.add adds 1 month correctly', t => {
  const date = new DateObject('2021-03-15')
  t.is(date.add('1month').format(), '2021-04-15')
})