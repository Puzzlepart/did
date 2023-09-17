import test from 'ava'
import { fuzzyStringEqual } from './fuzzyStringEqual'

test('fuzzyStringEqual compares strings without special characters', (t) => {
  const result = fuzzyStringEqual('ABC DE', 'ABCDE')
  t.is(result, true)
})

test('fuzzyStringEqual doesn`t throw if a or b is undefined', (t) => {
  const result = fuzzyStringEqual(undefined, 'ABCDE')
  t.is(result, false)
})

test('fuzzyStringEqual doesn`t throw if a or b is null', (t) => {
  const result = fuzzyStringEqual(null, 'ABCDE')
  t.is(result, false)
})

test('fuzzyStringEqual doesn`t throw if a is null and b is undefined', (t) => {
  const result = fuzzyStringEqual(null, undefined)
  t.is(result, false)
})
