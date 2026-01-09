import test from 'ava'
import { formatCurrency } from './formatCurrency'

// Happy path: normal positive numbers
test('formatCurrency: formats positive integer', (t) => {
  const result = formatCurrency(1000)
  t.is(result, 'kr 1,000')
})

test('formatCurrency: formats large number with thousands separator', (t) => {
  const result = formatCurrency(1234567)
  t.is(result, 'kr 1,234,567')
})

test('formatCurrency: formats very large number', (t) => {
  const result = formatCurrency(999999999)
  t.is(result, 'kr 999,999,999')
})

// Happy path: custom prefix
test('formatCurrency: uses custom prefix', (t) => {
  const result = formatCurrency(1000, '$')
  t.is(result, '$ 1,000')
})

test('formatCurrency: uses empty string prefix', (t) => {
  const result = formatCurrency(1000, '')
  t.is(result, ' 1,000')
})

test('formatCurrency: uses long prefix', (t) => {
  const result = formatCurrency(1000, 'USD')
  t.is(result, 'USD 1,000')
})

// Edge case: zero and small numbers
test('formatCurrency: handles zero', (t) => {
  const result = formatCurrency(0)
  t.is(result, 'kr 0')
})

test('formatCurrency: handles undefined', (t) => {
  const result = formatCurrency(undefined)
  t.is(result, 'kr 0')
})

test('formatCurrency: handles small numbers less than 1000', (t) => {
  const result = formatCurrency(100)
  t.is(result, 'kr 100')
})

test('formatCurrency: handles 999 (boundary before comma)', (t) => {
  const result = formatCurrency(999)
  t.is(result, 'kr 999')
})

test('formatCurrency: handles 1000 (boundary with comma)', (t) => {
  const result = formatCurrency(1000)
  t.is(result, 'kr 1,000')
})

// Edge case: negative numbers
test('formatCurrency: handles negative numbers', (t) => {
  const result = formatCurrency(-1000)
  t.is(result, 'kr -1,000')
})

test('formatCurrency: handles large negative numbers', (t) => {
  const result = formatCurrency(-123456)
  t.is(result, 'kr -123,456')
})

test('formatCurrency: handles negative zero', (t) => {
  const result = formatCurrency(-0)
  t.is(result, 'kr 0')
})

// Edge case: floating point numbers (rounds to integer)
test('formatCurrency: rounds down decimal to integer', (t) => {
  const result = formatCurrency(1234.56)
  t.is(result, 'kr 1,235')
})

test('formatCurrency: rounds decimal with .49', (t) => {
  const result = formatCurrency(1234.49)
  t.is(result, 'kr 1,234')
})

test('formatCurrency: rounds decimal with .5', (t) => {
  const result = formatCurrency(1234.5)
  t.is(result, 'kr 1,235')
})

test('formatCurrency: rounds decimal with .99', (t) => {
  const result = formatCurrency(1234.99)
  t.is(result, 'kr 1,235')
})

test('formatCurrency: handles very small decimal', (t) => {
  const result = formatCurrency(0.01)
  t.is(result, 'kr 0')
})

test('formatCurrency: handles 0.5 rounds to 0 or 1', (t) => {
  const result = formatCurrency(0.5)
  // toFixed(0) rounds 0.5 to 1 in JS
  t.is(result, 'kr 1')
})

// Edge case: special number values
test('formatCurrency: handles NaN', (t) => {
  const result = formatCurrency(Number.NaN)
  // NaN is falsy, so returns 'kr 0'
  t.is(result, 'kr 0')
})

test('formatCurrency: handles Infinity', (t) => {
  const result = formatCurrency(Number.POSITIVE_INFINITY)
  // toFixed on Infinity returns 'Infinity' string
  t.is(result, 'kr Infinity')
})

test('formatCurrency: handles negative Infinity', (t) => {
  const result = formatCurrency(Number.NEGATIVE_INFINITY)
  t.is(result, 'kr -Infinity')
})

// Edge case: very large numbers
test('formatCurrency: handles MAX_SAFE_INTEGER', (t) => {
  const result = formatCurrency(Number.MAX_SAFE_INTEGER)
  // Should have proper comma separation
  t.regex(result, /^kr \d{1,3}(,\d{3})*$/)
})

// BUG FOUND: The function has inconsistent handling of non-number types
test('formatCurrency: wrong type handling - returns "kr {value}" for non-numbers', (t) => {
  // According to the code: if (!x) return `${prefix} 0`
  // Then: if (typeof x !== 'number') return `${prefix} ${x}`
  // But this doesn't make sense for non-number types
  const result = formatCurrency('not a number' as any)
  t.is(result, 'kr not a number')
})

test('formatCurrency: null is falsy, returns "kr 0"', (t) => {
  const result = formatCurrency(null as any)
  t.is(result, 'kr 0')
})

test('formatCurrency: empty string is falsy, returns "kr 0"', (t) => {
  const result = formatCurrency('' as any)
  t.is(result, 'kr 0')
})

test('formatCurrency: false is falsy, returns "kr 0"', (t) => {
  const result = formatCurrency(false as any)
  t.is(result, 'kr 0')
})

// Edge case: prefix variations
test('formatCurrency: handles special characters in prefix', (t) => {
  const result = formatCurrency(1000, '€')
  t.is(result, '€ 1,000')
})

test('formatCurrency: handles unicode prefix', (t) => {
  const result = formatCurrency(1000, '¥')
  t.is(result, '¥ 1,000')
})

test('formatCurrency: handles multi-character unicode prefix', (t) => {
  const result = formatCurrency(1000, '💰')
  t.is(result, '💰 1,000')
})

// Edge case: number precision
test('formatCurrency: handles floating point precision issues', (t) => {
  // 0.1 + 0.2 = 0.30000000000000004 in JS
  const result = formatCurrency(0.1 + 0.2)
  t.is(result, 'kr 0')
})

test('formatCurrency: handles very precise decimal', (t) => {
  const result = formatCurrency(1234.123456789)
  t.is(result, 'kr 1,234')
})

// Boundary testing: thousand separators
test('formatCurrency: no separator for 100', (t) => {
  const result = formatCurrency(100)
  t.false(result.includes(','))
})

test('formatCurrency: one separator for 1,000', (t) => {
  const result = formatCurrency(1000)
  t.is((result.match(/,/g) || []).length, 1)
})

test('formatCurrency: two separators for 1,000,000', (t) => {
  const result = formatCurrency(1000000)
  t.is((result.match(/,/g) || []).length, 2)
})

test('formatCurrency: three separators for 1,000,000,000', (t) => {
  const result = formatCurrency(1000000000)
  t.is((result.match(/,/g) || []).length, 3)
})

// Edge case: single digit
test('formatCurrency: handles single digit', (t) => {
  const result = formatCurrency(5)
  t.is(result, 'kr 5')
})

// Edge case: two digits
test('formatCurrency: handles two digits', (t) => {
  const result = formatCurrency(42)
  t.is(result, 'kr 42')
})

// Edge case: three digits (boundary)
test('formatCurrency: handles three digits', (t) => {
  const result = formatCurrency(123)
  t.is(result, 'kr 123')
})

// Edge case: four digits (first comma)
test('formatCurrency: handles four digits with comma', (t) => {
  const result = formatCurrency(1234)
  t.is(result, 'kr 1,234')
})

// Multiple calls (idempotency check)
test('formatCurrency: produces consistent results on repeated calls', (t) => {
  const value = 12345
  const result1 = formatCurrency(value)
  const result2 = formatCurrency(value)
  const result3 = formatCurrency(value)
  t.is(result1, result2)
  t.is(result2, result3)
})

// Edge case: default prefix
test('formatCurrency: uses "kr" as default prefix when not specified', (t) => {
  const result = formatCurrency(1000)
  t.true(result.startsWith('kr '))
})

test('formatCurrency: prefix parameter is truly optional', (t) => {
  const result = formatCurrency(1000)
  t.is(result, 'kr 1,000')
})
