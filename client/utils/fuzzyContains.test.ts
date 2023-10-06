import test from 'ava'
import { fuzzyContains } from './fuzzyContains'

test('fuzzyContains returns true if an array contains a value', (t) => {
  const result = fuzzyContains(['foo', 'bar', 'baz'], 'bar')
  t.true(result)
})

test('fuzzyContains returns false if an array does not contain a value', (t) => {
  const result = fuzzyContains(['foo', 'bar', 'baz'], 'qux')
  t.false(result)
})

test('fuzzyContains returns true if an array contains a value, ignoring case', (t) => {
  const result = fuzzyContains(['foo', 'bar', 'baz'], 'BAR')
  t.true(result)
})
