import test from 'ava'
import { cleanArray } from './cleanArray'

test('cleanArray cleans an array correctly', (t) => {
  const result = cleanArray([1, 2, null, undefined, 3, 4, 5])
  t.is(result.length, 5)
})

test('cleanArray returns an empty array when given an empty array', (t) => {
  const result = cleanArray([])
  t.is(result.length, 0)
})

test('cleanArray handles an array with only null/undefined values', (t) => {
  const result = cleanArray([null, undefined, null])
  t.is(result.length, 0)
})
