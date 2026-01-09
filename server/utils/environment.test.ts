import test from 'ava'
import { environment } from './environment'

// Mock process.env for testing
test.beforeEach((t) => {
  // Save original env
  t.context.originalEnv = { ...process.env }
})

test.afterEach((t) => {
  // Restore original env
  process.env = t.context.originalEnv
})

// Happy path: existing environment variable
test('environment: returns value when environment variable exists', (t) => {
  process.env.TEST_VAR = 'test-value'
  const result = environment('TEST_VAR' as any)
  t.is(result, 'test-value')
})

test('environment: returns environment variable over fallback', (t) => {
  process.env.TEST_VAR = 'env-value'
  const result = environment('TEST_VAR' as any, 'fallback-value')
  t.is(result, 'env-value')
})

// Edge case: missing environment variable
test('environment: returns fallback when variable is missing', (t) => {
  delete process.env.NONEXISTENT_VAR
  const result = environment('NONEXISTENT_VAR' as any, 'fallback')
  t.is(result, 'fallback')
})

test('environment: returns undefined as fallback when not specified', (t) => {
  delete process.env.NONEXISTENT_VAR
  const result = environment('NONEXISTENT_VAR' as any)
  t.is(result, undefined)
})

// Edge case: empty string value
test('environment: treats empty string as missing', (t) => {
  process.env.EMPTY_VAR = ''
  const result = environment('EMPTY_VAR' as any, 'fallback')
  t.is(result, 'fallback')
})

// Edge case: whitespace-only value
test('environment: treats whitespace-only string as missing', (t) => {
  process.env.WHITESPACE_VAR = '   '
  const result = environment('WHITESPACE_VAR' as any, 'fallback')
  t.is(result, 'fallback')
})

test('environment: treats tab/newline as missing', (t) => {
  process.env.TAB_VAR = '\t\n'
  const result = environment('TAB_VAR' as any, 'fallback')
  t.is(result, 'fallback')
})

// Options: splitBy
test('environment: splits value by comma', (t) => {
  process.env.CSV_VAR = 'a,b,c'
  const result = environment('CSV_VAR' as any, undefined, { splitBy: ',' })
  t.deepEqual(result, ['a', 'b', 'c'])
})

test('environment: splits value by semicolon', (t) => {
  process.env.LIST_VAR = 'one;two;three'
  const result = environment('LIST_VAR' as any, undefined, { splitBy: ';' })
  t.deepEqual(result, ['one', 'two', 'three'])
})

test('environment: splits value by space', (t) => {
  process.env.SPACE_VAR = 'alpha beta gamma'
  const result = environment('SPACE_VAR' as any, undefined, { splitBy: ' ' })
  t.deepEqual(result, ['alpha', 'beta', 'gamma'])
})

test('environment: splitBy with empty value returns fallback', (t) => {
  process.env.EMPTY_SPLIT = ''
  const result = environment('EMPTY_SPLIT' as any, ['default'], { splitBy: ',' })
  t.deepEqual(result, ['default'])
})

test('environment: splitBy with single value returns array of one', (t) => {
  process.env.SINGLE_VAR = 'single'
  const result = environment('SINGLE_VAR' as any, undefined, { splitBy: ',' })
  t.deepEqual(result, ['single'])
})

test('environment: splitBy with trailing separator', (t) => {
  process.env.TRAILING_VAR = 'a,b,c,'
  const result = environment('TRAILING_VAR' as any, undefined, { splitBy: ',' })
  t.deepEqual(result, ['a', 'b', 'c', ''])
})

test('environment: splitBy with leading separator', (t) => {
  process.env.LEADING_VAR = ',a,b,c'
  const result = environment('LEADING_VAR' as any, undefined, { splitBy: ',' })
  t.deepEqual(result, ['', 'a', 'b', 'c'])
})

// Options: isSwitch
test('environment: isSwitch returns true for "1"', (t) => {
  process.env.SWITCH_VAR = '1'
  const result = environment('SWITCH_VAR' as any, undefined, { isSwitch: true })
  t.is(result, true)
})

test('environment: isSwitch returns true for "true"', (t) => {
  process.env.SWITCH_VAR = 'true'
  const result = environment('SWITCH_VAR' as any, undefined, { isSwitch: true })
  t.is(result, true)
})

test('environment: isSwitch returns true for "TRUE"', (t) => {
  process.env.SWITCH_VAR = 'TRUE'
  const result = environment('SWITCH_VAR' as any, undefined, { isSwitch: true })
  t.is(result, true)
})

test('environment: isSwitch returns true for "True"', (t) => {
  process.env.SWITCH_VAR = 'True'
  const result = environment('SWITCH_VAR' as any, undefined, { isSwitch: true })
  t.is(result, true)
})

test('environment: isSwitch returns false for "0"', (t) => {
  process.env.SWITCH_VAR = '0'
  const result = environment('SWITCH_VAR' as any, undefined, { isSwitch: true })
  t.is(result, false)
})

test('environment: isSwitch returns false for "false"', (t) => {
  process.env.SWITCH_VAR = 'false'
  const result = environment('SWITCH_VAR' as any, undefined, { isSwitch: true })
  t.is(result, false)
})

test('environment: isSwitch returns false for any other string', (t) => {
  process.env.SWITCH_VAR = 'yes'
  const result = environment('SWITCH_VAR' as any, undefined, { isSwitch: true })
  t.is(result, false)
})

test('environment: isSwitch returns false for empty string (via fallback)', (t) => {
  process.env.SWITCH_VAR = ''
  const result = environment('SWITCH_VAR' as any, false, { isSwitch: true })
  t.is(result, false)
})

// Edge case: numeric values
test('environment: returns numeric string as string', (t) => {
  process.env.NUMBER_VAR = '42'
  const result = environment('NUMBER_VAR' as any)
  t.is(result, '42')
  t.is(typeof result, 'string')
})

test('environment: returns zero as string', (t) => {
  process.env.ZERO_VAR = '0'
  const result = environment('ZERO_VAR' as any)
  t.is(result, '0')
})

// Edge case: special characters
test('environment: handles special characters in value', (t) => {
  process.env.SPECIAL_VAR = '!@#$%^&*()'
  const result = environment('SPECIAL_VAR' as any)
  t.is(result, '!@#$%^&*()')
})

test('environment: handles newlines in value', (t) => {
  process.env.NEWLINE_VAR = 'line1\nline2'
  const result = environment('NEWLINE_VAR' as any)
  t.is(result, 'line1\nline2')
})

test('environment: handles unicode in value', (t) => {
  process.env.UNICODE_VAR = 'Hello 👋 World 🌍'
  const result = environment('UNICODE_VAR' as any)
  t.is(result, 'Hello 👋 World 🌍')
})

// Edge case: very long values
test('environment: handles very long values', (t) => {
  const longValue = 'a'.repeat(10000)
  process.env.LONG_VAR = longValue
  const result = environment('LONG_VAR' as any)
  t.is(result, longValue)
  t.is(result.length, 10000)
})

// Edge case: URLs and paths
test('environment: handles URL values', (t) => {
  process.env.URL_VAR = 'https://example.com:8080/path?query=value'
  const result = environment('URL_VAR' as any)
  t.is(result, 'https://example.com:8080/path?query=value')
})

test('environment: handles file path values', (t) => {
  process.env.PATH_VAR = '/usr/local/bin:/usr/bin:/bin'
  const result = environment('PATH_VAR' as any)
  t.is(result, '/usr/local/bin:/usr/bin:/bin')
})

// Edge case: JSON strings
test('environment: returns JSON string as-is (not parsed)', (t) => {
  process.env.JSON_VAR = '{"key":"value"}'
  const result = environment('JSON_VAR' as any)
  t.is(result, '{"key":"value"}')
  t.is(typeof result, 'string')
})

// Type parameter testing
test('environment: generic type parameter for string', (t) => {
  process.env.STRING_VAR = 'text'
  const result = environment<string>('STRING_VAR' as any)
  t.is(typeof result, 'string')
})

test('environment: generic type parameter for array', (t) => {
  process.env.ARRAY_VAR = 'a,b,c'
  const result = environment<string[]>('ARRAY_VAR' as any, undefined, { splitBy: ',' })
  t.true(Array.isArray(result))
})

test('environment: generic type parameter for boolean', (t) => {
  process.env.BOOL_VAR = 'true'
  const result = environment<boolean>('BOOL_VAR' as any, undefined, { isSwitch: true })
  t.is(typeof result, 'boolean')
})

// Fallback type testing
test('environment: fallback can be different type', (t) => {
  delete process.env.MISSING_VAR
  const result = environment('MISSING_VAR' as any, 123)
  t.is(result, 123)
  t.is(typeof result, 'number')
})

test('environment: fallback can be object', (t) => {
  delete process.env.MISSING_VAR
  const fallback = { key: 'value' }
  const result = environment('MISSING_VAR' as any, fallback)
  t.is(result, fallback)
})

test('environment: fallback can be null', (t) => {
  delete process.env.MISSING_VAR
  const result = environment('MISSING_VAR' as any, null)
  t.is(result, null)
})

// Combination of options
test('environment: cannot combine splitBy and isSwitch meaningfully', (t) => {
  process.env.COMBO_VAR = 'a,b,c'
  // splitBy takes precedence
  const result = environment('COMBO_VAR' as any, undefined, {
    splitBy: ',',
    isSwitch: true
  })
  // splitBy is processed first, so we get an array
  t.true(Array.isArray(result))
})

// Edge case: undefined process.env key
test('environment: handles completely undefined env variable', (t) => {
  const key = 'DEFINITELY_NOT_SET_' + Date.now()
  t.is(process.env[key], undefined)
  const result = environment(key as any, 'fallback')
  t.is(result, 'fallback')
})

// Edge case: numeric fallback
test('environment: numeric fallback is returned correctly', (t) => {
  delete process.env.MISSING_NUM
  const result = environment('MISSING_NUM' as any, 42)
  t.is(result, 42)
})

// Real-world scenarios
test('environment: AUTH_PROVIDERS with split', (t) => {
  process.env.AUTH_PROVIDERS = 'azuread-openidconnect,google'
  const result = environment('AUTH_PROVIDERS', undefined, { splitBy: ',' })
  t.deepEqual(result, ['azuread-openidconnect', 'google'])
})

test('environment: PORT with numeric string', (t) => {
  process.env.PORT = '9001'
  const result = environment('PORT')
  t.is(result, '9001')
})

test('environment: MAINTENANCE_MODE as switch', (t) => {
  process.env.MAINTENANCE_MODE = '1'
  const result = environment('MAINTENANCE_MODE', false, { isSwitch: true })
  t.is(result, true)
})

test('environment: MICROSOFT_SCOPES with space separator', (t) => {
  process.env.MICROSOFT_SCOPES = 'User.Read Calendars.Read'
  const result = environment('MICROSOFT_SCOPES', undefined, { splitBy: ' ' })
  t.deepEqual(result, ['User.Read', 'Calendars.Read'])
})

// Debug logging behavior (we can't easily test debug output, but we can verify function doesn't throw)
test('environment: does not throw when debug logging', (t) => {
  delete process.env.DEBUG_TEST
  // This should trigger debug log but not throw
  t.notThrows(() => {
    environment('DEBUG_TEST' as any, 'fallback')
  })
})

// Idempotency
test('environment: returns same value on repeated calls', (t) => {
  process.env.IDEMPOTENT_VAR = 'consistent'
  const result1 = environment('IDEMPOTENT_VAR' as any)
  const result2 = environment('IDEMPOTENT_VAR' as any)
  const result3 = environment('IDEMPOTENT_VAR' as any)
  t.is(result1, result2)
  t.is(result2, result3)
})

// Edge case: changing environment variable between calls
test('environment: reflects changes to environment variables', (t) => {
  process.env.CHANGING_VAR = 'first'
  const result1 = environment('CHANGING_VAR' as any)
  t.is(result1, 'first')
  
  process.env.CHANGING_VAR = 'second'
  const result2 = environment('CHANGING_VAR' as any)
  t.is(result2, 'second')
})
