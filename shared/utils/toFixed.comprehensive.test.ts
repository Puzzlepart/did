import test from 'ava'
import { toFixed } from './toFixed'

// Happy path: basic rounding
test('toFixed: rounds to 2 decimal places by default', (t) => {
  const result = toFixed(1.2345, 2)
  t.is(result, 1.23)
})

test('toFixed: rounds to 0 decimal places', (t) => {
  const result = toFixed(1.2345, 0)
  t.is(result, 1)
})

test('toFixed: rounds to 1 decimal place', (t) => {
  const result = toFixed(1.2345, 1)
  t.is(result, 1.2)
})

test('toFixed: rounds to 3 decimal places', (t) => {
  const result = toFixed(1.2345, 3)
  // Rounding is imperfect due to floating point
  t.is(result, 1.234)
})

test('toFixed: rounds to 4 decimal places', (t) => {
  const result = toFixed(1.2345, 4)
  t.is(result, 1.2345)
})

test('toFixed: uses default precision of 2 when not specified', (t) => {
  const result = toFixed(1.2345)
  t.is(result, 1.23)
})

// Edge case: rounding behavior
test('toFixed: rounds down when next digit is < 5', (t) => {
  const result = toFixed(1.234, 2)
  t.is(result, 1.23)
})

test('toFixed: rounds up when next digit is >= 5', (t) => {
  const result = toFixed(1.235, 2)
  t.is(result, 1.24)
})

test('toFixed: rounds up at 0.5', (t) => {
  const result = toFixed(1.5, 0)
  t.is(result, 2)
})

test('toFixed: handles 0.5 rounding with precision', (t) => {
  const result = toFixed(1.125, 2)
  t.is(result, 1.13)
})

// POTENTIAL BUG: Banker's rounding (round half to even) vs round half up
test('toFixed: JavaScript uses round half away from zero', (t) => {
  // 2.5 rounds to 3 (not banker's rounding)
  const result = toFixed(2.5, 0)
  t.is(result, 3)
})

test('toFixed: negative numbers round half away from zero', (t) => {
  const result = toFixed(-2.5, 0)
  t.is(result, -3)
})

// Edge case: zero values
test('toFixed: handles zero', (t) => {
  const result = toFixed(0, 2)
  t.is(result, 0)
})

test('toFixed: handles negative zero', (t) => {
  const result = toFixed(-0, 2)
  t.is(result, 0)
})

// Edge case: very small numbers
test('toFixed: handles very small positive number', (t) => {
  const result = toFixed(0.001, 2)
  t.is(result, 0)
})

test('toFixed: handles very small positive number with sufficient precision', (t) => {
  const result = toFixed(0.001, 3)
  t.is(result, 0.001)
})

test('toFixed: handles very small negative number', (t) => {
  const result = toFixed(-0.001, 2)
  // -0 is returned, which equals 0
  t.is(result, -0)
})

// Edge case: very large numbers
test('toFixed: handles large integer', (t) => {
  const result = toFixed(12345678.9, 2)
  t.is(result, 12345678.9)
})

test('toFixed: handles very large number', (t) => {
  const result = toFixed(999999999.999, 2)
  t.is(result, 1000000000)
})

// Edge case: negative numbers
test('toFixed: handles negative number', (t) => {
  const result = toFixed(-1.2345, 2)
  t.is(result, -1.23)
})

test('toFixed: handles large negative number', (t) => {
  const result = toFixed(-12345.6789, 2)
  t.is(result, -12345.68)
})

// Edge case: integer inputs
test('toFixed: handles integer with no decimals', (t) => {
  const result = toFixed(5, 2)
  t.is(result, 5)
})

test('toFixed: handles integer with precision 0', (t) => {
  const result = toFixed(5, 0)
  t.is(result, 5)
})

// Edge case: precision variations
test('toFixed: handles high precision', (t) => {
  const result = toFixed(1.23456789, 8)
  t.is(result, 1.23456789)
})

test('toFixed: handles precision 10', (t) => {
  const result = toFixed(1.123456789012, 10)
  t.is(result, 1.123456789)
})

test('toFixed: handles precision beyond input decimals', (t) => {
  const result = toFixed(1.5, 5)
  t.is(result, 1.5)
})

// Edge case: precision 0 (integer rounding)
test('toFixed: precision 0 rounds to integer', (t) => {
  const result = toFixed(1.9, 0)
  t.is(result, 2)
})

test('toFixed: precision 0 rounds down', (t) => {
  const result = toFixed(1.4, 0)
  t.is(result, 1)
})

// Edge case: floating point precision issues
test('toFixed: handles floating point arithmetic correctly', (t) => {
  // 0.1 + 0.2 = 0.30000000000000004 in JavaScript
  const result = toFixed(0.1 + 0.2, 2)
  t.is(result, 0.3)
})

test('toFixed: handles floating point multiplication', (t) => {
  // 0.2 * 3 = 0.6000000000000001 in JavaScript
  const result = toFixed(0.2 * 3, 2)
  t.is(result, 0.6)
})

test('toFixed: handles floating point division', (t) => {
  const result = toFixed(1 / 3, 2)
  t.is(result, 0.33)
})

test('toFixed: handles complex floating point', (t) => {
  const result = toFixed(1.005, 2)
  // This is a classic floating point issue
  // 1.005 is actually stored as 1.00499999... so rounds to 1.00
  t.is(result, 1)
})

// Edge case: special number values
test('toFixed: handles NaN', (t) => {
  const result = toFixed(Number.NaN, 2)
  t.true(Number.isNaN(result))
})

test('toFixed: handles Infinity', (t) => {
  const result = toFixed(Number.POSITIVE_INFINITY, 2)
  t.is(result, Number.POSITIVE_INFINITY)
})

test('toFixed: handles negative Infinity', (t) => {
  const result = toFixed(Number.NEGATIVE_INFINITY, 2)
  t.is(result, Number.NEGATIVE_INFINITY)
})

// Edge case: negative precision (should work but strange)
test('toFixed: negative precision causes error', (t) => {
  // toFixed with negative precision throws RangeError
  t.throws(() => toFixed(1.234, -1))
})

// Edge case: extremely large precision
test('toFixed: very large precision throws error', (t) => {
  // toFixed supports precision 0-100
  t.throws(() => toFixed(1.234, 101))
})

test('toFixed: precision 100 is maximum', (t) => {
  const result = toFixed(1.123, 100)
  t.is(typeof result, 'number')
})

// Return type verification
test('toFixed: returns number type, not string', (t) => {
  const result = toFixed(1.234, 2)
  t.is(typeof result, 'number')
})

// Comparison with standard toFixed
test('toFixed: matches standard toFixed behavior', (t) => {
  const value = 1.2345
  const precision = 2
  const result = toFixed(value, precision)
  const expected = Number.parseFloat(value.toFixed(precision))
  t.is(result, expected)
})

// Idempotency
test('toFixed: applying twice gives same result', (t) => {
  const once = toFixed(1.2345, 2)
  const twice = toFixed(once, 2)
  t.is(once, twice)
})

// Edge case: very precise input
test('toFixed: handles many decimal places in input', (t) => {
  const result = toFixed(1.123456789012345, 2)
  t.is(result, 1.12)
})

// Real-world use cases
test('toFixed: currency rounding', (t) => {
  const price = 19.995
  const result = toFixed(price, 2)
  t.is(result, 20)
})

test('toFixed: percentage calculation', (t) => {
  const percentage = (5 / 7) * 100
  const result = toFixed(percentage, 2)
  t.is(result, 71.43)
})

test('toFixed: time calculation in hours', (t) => {
  const minutes = 50
  const hours = minutes / 60
  const result = toFixed(hours, 2)
  t.is(result, 0.83)
})

// Edge case: boundary values
test('toFixed: handles Number.MAX_VALUE', (t) => {
  const result = toFixed(Number.MAX_VALUE, 2)
  t.is(result, Number.MAX_VALUE)
})

test('toFixed: handles Number.MIN_VALUE', (t) => {
  const result = toFixed(Number.MIN_VALUE, 2)
  t.is(result, 0)
})

test('toFixed: handles Number.MAX_SAFE_INTEGER', (t) => {
  const result = toFixed(Number.MAX_SAFE_INTEGER, 2)
  t.is(result, Number.MAX_SAFE_INTEGER)
})

test('toFixed: handles Number.MIN_SAFE_INTEGER', (t) => {
  const result = toFixed(Number.MIN_SAFE_INTEGER, 2)
  t.is(result, Number.MIN_SAFE_INTEGER)
})

// Performance with many calls
test('toFixed: handles many consecutive calls efficiently', (t) => {
  const start = Date.now()
  for (let i = 0; i < 10000; i++) {
    toFixed(Math.random() * 100, 2)
  }
  const elapsed = Date.now() - start
  t.true(elapsed < 100, `Took ${elapsed}ms for 10000 calls`)
})

// Consistency check
test('toFixed: produces consistent results', (t) => {
  const value = 1.2345
  const result1 = toFixed(value, 2)
  const result2 = toFixed(value, 2)
  const result3 = toFixed(value, 2)
  t.is(result1, result2)
  t.is(result2, result3)
})

// Edge case: undefined precision (uses default)
test('toFixed: undefined precision uses default', (t) => {
  const result = toFixed(1.2345, undefined)
  t.is(result, 1.23)
})

// Edge case: null precision (coerces to 0)
test('toFixed: null precision coerces to 0', (t) => {
  const result = toFixed(1.2345, null as any)
  t.is(result, 1)
})

// Edge case: string precision (should be parsed)
test('toFixed: string precision is coerced to number', (t) => {
  const result = toFixed(1.2345, '2' as any)
  t.is(result, 1.23)
})

// Edge case: float precision (should work)
test('toFixed: float precision is truncated', (t) => {
  const result = toFixed(1.2345, 2.7)
  // toFixed truncates precision to integer
  t.is(result, 1.23)
})
