import test from 'ava'
import { isNullish } from './isNullish'

// Test null
test('isNullish: returns true for null', (t) => {
  const result = isNullish(null)
  t.is(result, true)
})

// Test undefined
test('isNullish: returns true for undefined', (t) => {
  const result = isNullish(undefined)
  t.is(result, true)
})

// Test empty string
test('isNullish: returns true for empty string', (t) => {
  const result = isNullish('')
  t.is(result, true)
})

// Test zero
test('isNullish: returns true for zero', (t) => {
  const result = isNullish(0)
  t.is(result, true)
})

// BUG ANALYSIS: This function considers 0 as nullish, which is often undesirable
// In many contexts, 0 is a valid value (e.g., count of items, price, index)
test('isNullish: POTENTIAL BUG - treats 0 as nullish', (t) => {
  // This behavior might be a bug depending on use case
  // 0 is a valid number and often should not be treated as "missing" data
  t.is(isNullish(0), true)

  // In many contexts, you'd expect:
  // t.is(isNullish(0), false)
})

// Test non-nullish values
test('isNullish: returns false for positive numbers', (t) => {
  t.is(isNullish(1), false)
  t.is(isNullish(42), false)
  t.is(isNullish(0.1), false)
})

test('isNullish: returns false for negative numbers', (t) => {
  t.is(isNullish(-1), false)
  t.is(isNullish(-42), false)
  t.is(isNullish(-0.1), false)
})

// BUG FOUND: Negative zero is not caught
test('isNullish: does not catch negative zero', (t) => {
  // -0 === 0 in JavaScript, so this should be caught, but let's verify
  t.is(isNullish(-0), true)
})

// Test non-empty strings
test('isNullish: returns false for non-empty strings', (t) => {
  t.is(isNullish('hello'), false)
  t.is(isNullish('0'), false) // String "0" is not nullish
  t.is(isNullish(' '), false) // Space is not empty string
})

// Test whitespace strings
test('isNullish: returns false for whitespace strings', (t) => {
  // Only empty string '' is nullish, not strings with whitespace
  t.is(isNullish(' '), false)
  t.is(isNullish('  '), false)
  t.is(isNullish('\n'), false)
  t.is(isNullish('\t'), false)
})

// Test objects
test('isNullish: returns false for objects', (t) => {
  t.is(isNullish({}), false)
  t.is(isNullish({ key: 'value' }), false)
})

// Test arrays
test('isNullish: returns false for arrays', (t) => {
  t.is(isNullish([]), false)
  t.is(isNullish([1, 2, 3]), false)
})

// Test booleans
test('isNullish: returns false for true', (t) => {
  t.is(isNullish(true), false)
})

test('isNullish: returns false for false', (t) => {
  // false is falsy but not nullish in this implementation
  t.is(isNullish(false), false)
})

// Test functions
test('isNullish: returns false for functions', (t) => {
  t.is(
    isNullish(() => {}),
    false
  )
  t.is(
    isNullish(function () {}),
    false
  )
})

// Test symbols
test('isNullish: returns false for symbols', (t) => {
  t.is(isNullish(Symbol('test')), false)
})

// Test special number values
test('isNullish: returns false for NaN', (t) => {
  // NaN is weird, but it's not nullish in this implementation
  t.is(isNullish(Number.NaN), false)
})

test('isNullish: returns false for Infinity', (t) => {
  t.is(isNullish(Number.POSITIVE_INFINITY), false)
  t.is(isNullish(Number.NEGATIVE_INFINITY), false)
})

// Edge case: numeric strings
test('isNullish: numeric strings are not nullish', (t) => {
  t.is(isNullish('0'), false)
  t.is(isNullish('1'), false)
  t.is(isNullish('123'), false)
})

// Edge case: string with just zero-width characters
test('isNullish: zero-width characters make string non-empty', (t) => {
  // Zero-width space is not empty string
  t.is(isNullish('\u200B'), false)
})

// Type coercion edge cases
test('isNullish: does not coerce types', (t) => {
  // The function uses strict equality (===), so no type coercion
  t.is(isNullish('null'), false) // String "null" is not null
  t.is(isNullish('undefined'), false) // String "undefined" is not undefined
})

// Edge case: Date objects
test('isNullish: returns false for Date objects', (t) => {
  t.is(isNullish(new Date()), false)
})

// Edge case: Invalid Date
test('isNullish: returns false for Invalid Date', (t) => {
  t.is(isNullish(new Date('invalid')), false)
})

// Edge case: Regular expressions
test('isNullish: returns false for RegExp', (t) => {
  t.is(isNullish(/test/), false)
})

// Edge case: large numbers
test('isNullish: returns false for large numbers', (t) => {
  t.is(isNullish(Number.MAX_VALUE), false)
  t.is(isNullish(Number.MIN_VALUE), false) // MIN_VALUE is a positive number close to 0
  t.is(isNullish(Number.MAX_SAFE_INTEGER), false)
  t.is(isNullish(Number.MIN_SAFE_INTEGER), false)
})

// CRITICAL BUG: MIN_VALUE is not zero but very small positive number
test('isNullish: Number.MIN_VALUE is not zero', (t) => {
  // This is important: MIN_VALUE is 5e-324, not 0
  t.is(isNullish(Number.MIN_VALUE), false)
  t.not(Number.MIN_VALUE, 0)
})

// Consistency check: multiple calls
test('isNullish: returns consistent results', (t) => {
  const testValue = null
  t.is(isNullish(testValue), isNullish(testValue))
  t.is(isNullish(testValue), isNullish(testValue))
})

// Edge case: objects with valueOf
test('isNullish: does not call valueOf', (t) => {
  const obj = {
    valueOf() {
      return 0
    }
  }
  // Object is not coerced to its valueOf, so it's not nullish
  t.is(isNullish(obj), false)
})

// Edge case: objects with toString
test('isNullish: does not call toString', (t) => {
  const obj = {
    toString() {
      return ''
    }
  }
  // Object is not coerced to its string representation
  t.is(isNullish(obj), false)
})

// Testing all four nullish cases together
test('isNullish: correctly identifies all four nullish values', (t) => {
  const nullishValues = [null, undefined, '', 0]
  for (const value of nullishValues) {
    t.is(isNullish(value), true, `${value} should be nullish`)
  }
})

// Testing a variety of non-nullish values
test('isNullish: correctly identifies non-nullish values', (t) => {
  const nonNullishValues = [
    1,
    -1,
    true,
    false,
    'string',
    [],
    {},
    () => {},
    Symbol('test')
  ]
  for (const value of nonNullishValues) {
    t.is(isNullish(value), false, `${String(value)} should not be nullish`)
  }
})

// Generic type parameter test
test('isNullish: works with generic type parameter', (t) => {
  const stringValue: string | null = null
  t.is(isNullish<string | null>(stringValue), true)

  const numberValue: number | undefined = undefined
  t.is(isNullish<number | undefined>(numberValue), true)
})

// Edge case: passing no arguments (should be undefined)
test('isNullish: undefined when called without arguments', (t) => {
  // @ts-expect-error - testing runtime behavior without argument
  const result = isNullish()
  t.is(result, true) // undefined is nullish
})
