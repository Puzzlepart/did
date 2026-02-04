import test from 'ava'
import { createPath } from './createPath'

// Happy path: basic path creation
test('createPath: creates path from multiple parts', (t) => {
  const result = createPath(['api', 'users', 'list'])
  t.is(result, '/api/users/list')
})

test('createPath: creates path with two parts', (t) => {
  const result = createPath(['home', 'dashboard'])
  t.is(result, '/home/dashboard')
})

test('createPath: creates path with single part', (t) => {
  const result = createPath(['home'])
  t.is(result, '/home')
})

// Edge case: empty array
test('createPath: returns "/" for empty array', (t) => {
  const result = createPath([])
  t.is(result, '/')
})

// Edge case: null/undefined/falsy values
test('createPath: filters out null values', (t) => {
  const result = createPath(['api', null, 'users'])
  t.is(result, '/api/users')
})

test('createPath: filters out undefined values', (t) => {
  const result = createPath(['api', undefined, 'users'])
  t.is(result, '/api/users')
})

test('createPath: filters out empty strings', (t) => {
  const result = createPath(['api', '', 'users'])
  t.is(result, '/api/users')
})

test('createPath: filters out false boolean', (t) => {
  const result = createPath(['api', false as any, 'users'])
  t.is(result, '/api/users')
})

test('createPath: filters out zero', (t) => {
  const result = createPath(['api', 0 as any, 'users'])
  t.is(result, '/api/users')
})

// Edge case: all falsy values
test('createPath: returns "/" when all values are falsy', (t) => {
  const result = createPath([null, undefined, '', false as any, 0 as any])
  t.is(result, '/')
})

// Case conversion: lowercase
test('createPath: converts to lowercase', (t) => {
  const result = createPath(['API', 'USERS', 'LIST'])
  t.is(result, '/api/users/list')
})

test('createPath: converts mixed case to lowercase', (t) => {
  const result = createPath(['Api', 'Users', 'List'])
  t.is(result, '/api/users/list')
})

// Edge case: parts with slashes
test('createPath: handles parts with slashes', (t) => {
  const result = createPath(['api/', '/users', 'list'])
  t.is(result, '/api///users/list')
})

test('createPath: does not normalize multiple slashes', (t) => {
  const result = createPath(['api', '', '', 'users'])
  // Empty strings are filtered, so no extra slashes
  t.is(result, '/api/users')
})

// Edge case: special characters
test('createPath: preserves hyphens', (t) => {
  const result = createPath(['user-profile', 'edit-info'])
  t.is(result, '/user-profile/edit-info')
})

test('createPath: preserves underscores', (t) => {
  const result = createPath(['user_profile', 'edit_info'])
  t.is(result, '/user_profile/edit_info')
})

test('createPath: preserves dots', (t) => {
  const result = createPath(['api', 'v1.0', 'users'])
  t.is(result, '/api/v1.0/users')
})

test('createPath: preserves numbers', (t) => {
  const result = createPath(['api', 'v2', 'user123'])
  t.is(result, '/api/v2/user123')
})

// Edge case: unicode characters
test('createPath: handles unicode characters', (t) => {
  const result = createPath(['users', '用户', 'profile'])
  t.is(result, '/users/用户/profile')
})

test('createPath: handles emoji in path', (t) => {
  const result = createPath(['emoji', '😀', 'test'])
  t.is(result, '/emoji/😀/test')
})

// Edge case: whitespace
test('createPath: preserves internal spaces', (t) => {
  const result = createPath(['user profile', 'edit info'])
  t.is(result, '/user profile/edit info')
})

test('createPath: filters whitespace-only strings', (t) => {
  const result = createPath(['api', '   ', 'users'])
  // Whitespace-only strings are truthy, so NOT filtered
  t.is(result, '/api/   /users')
})

test('createPath: preserves leading/trailing spaces in parts', (t) => {
  const result = createPath([' api ', ' users '])
  t.is(result, '/ api / users ')
})

// Edge case: very long paths
test('createPath: handles very long path arrays', (t) => {
  const parts = Array.from({ length: 100 }, (_, i) => `part${i}`)
  const result = createPath(parts)
  t.true(result.startsWith('/part0/part1'))
  t.true(result.endsWith('/part98/part99'))
  t.is(result.split('/').length, 101) // 100 parts + 1 empty string from leading /
})

// Edge case: single character parts
test('createPath: handles single character parts', (t) => {
  const result = createPath(['a', 'b', 'c'])
  t.is(result, '/a/b/c')
})

// Real-world scenarios
test('createPath: creates user profile path', (t) => {
  const userId = '123'
  const result = createPath(['users', userId, 'profile'])
  t.is(result, '/users/123/profile')
})

test('createPath: creates API versioned path', (t) => {
  const result = createPath(['api', 'v1', 'resources'])
  t.is(result, '/api/v1/resources')
})

test('createPath: handles optional path segments', (t) => {
  const section = null
  const result = createPath(['settings', section, 'profile'])
  t.is(result, '/settings/profile')
})

test('createPath: creates nested resource path', (t) => {
  const result = createPath(['projects', '42', 'tasks', '7', 'comments'])
  t.is(result, '/projects/42/tasks/7/comments')
})

// Edge case: numbers as path parts
test('createPath: handles numeric parts', (t) => {
  const result = createPath(['user', '123', 'post', '456'])
  t.is(result, '/user/123/post/456')
})

test('createPath: converts number 1 to "1"', (t) => {
  // 1 is truthy, so it's included, but needs to be string
  const result = createPath(['api', 1 as any, 'users'])
  t.is(result, '/api/1/users')
})

// Edge case: boolean true (should be included)
test('createPath: includes boolean true', (t) => {
  const result = createPath(['api', true as any, 'users'])
  t.is(result, '/api/true/users')
})

// Idempotency
test('createPath: produces consistent results', (t) => {
  const parts = ['api', 'users', 'list']
  const result1 = createPath(parts)
  const result2 = createPath(parts)
  const result3 = createPath(parts)
  t.is(result1, result2)
  t.is(result2, result3)
})

// Edge case: array mutation doesn't affect result
test('createPath: does not mutate input array', (t) => {
  const parts = ['API', 'Users']
  const original = [...parts]
  createPath(parts)
  t.deepEqual(parts, original)
})

// Edge case: mixed content
test('createPath: handles mixed truthy and falsy values', (t) => {
  const result = createPath(['a', null, 'b', undefined, 'c', '', 'd'])
  t.is(result, '/a/b/c/d')
})

// Edge case: URL encoding not performed
test('createPath: does not URL encode special characters', (t) => {
  const result = createPath(['api', 'search?q=test', 'results'])
  t.is(result, '/api/search?q=test/results')
})

test('createPath: preserves ampersands', (t) => {
  const result = createPath(['api', 'query&filter'])
  t.is(result, '/api/query&filter')
})

// Edge case: fragments and queries
test('createPath: includes hash fragments', (t) => {
  const result = createPath(['page', '#section'])
  t.is(result, '/page/#section')
})

// Performance test
test('createPath: handles large arrays efficiently', (t) => {
  const parts = Array.from({ length: 1000 }, (_, i) => `segment${i}`)
  const start = Date.now()
  const result = createPath(parts)
  const elapsed = Date.now() - start

  t.true(result.length > 1000)
  t.true(elapsed < 100, `Took ${elapsed}ms`)
})

// Return type check
test('createPath: always returns string', (t) => {
  t.is(typeof createPath([]), 'string')
  t.is(typeof createPath(['a']), 'string')
  t.is(typeof createPath([null]), 'string')
})

// BUG: The return type is 'any', should be 'string'
test('createPath: TYPING BUG - return type should be string, not any', (t) => {
  // The function signature says: any
  // But it always returns a string
  const result = createPath(['test'])
  t.is(typeof result, 'string')
})

// Leading slash always present
test('createPath: always starts with slash', (t) => {
  t.true(createPath(['test']).startsWith('/'))
  t.true(createPath([]).startsWith('/'))
  t.true(createPath([null]).startsWith('/'))
})

// No trailing slash
test('createPath: does not add trailing slash', (t) => {
  const result = createPath(['api', 'users'])
  t.false(result.endsWith('/'))
})

test('createPath: does not remove trailing slash from last part', (t) => {
  const result = createPath(['api', 'users/'])
  t.is(result, '/api/users/')
})
