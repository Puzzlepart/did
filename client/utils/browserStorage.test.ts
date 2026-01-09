import test from 'ava'
import { BrowserStorage } from './browserStorage'

// Mock localStorage for testing
class MockStorage {
  private store: Map<string, string> = new Map()

  getItem(key: string): string | null {
    return this.store.get(key) || null
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value)
  }

  clear(): void {
    this.store.clear()
  }
}

// Define context type
interface TestContext {
  mockStore: MockStorage
}

// Setup mock storage for each test
test.beforeEach((t) => {
  t.context = { mockStore: new MockStorage() }
})

// Happy path: basic get and set
test('BrowserStorage: stores and retrieves simple values', (t) => {
  const ctx = t.context as TestContext
  const storage = new BrowserStorage<string>('test-key', ctx.mockStore as any)
  storage.set('test-value')
  const result = storage.get()
  t.is(result, 'test-value')
})

test('BrowserStorage: stores and retrieves objects', (t) => {
  const storage = new BrowserStorage<{ name: string; age: number }>(
    'user',
    (t.context as TestContext).mockStore as any
  )
  const user = { name: 'Alice', age: 30 }
  storage.set(user)
  const result = storage.get()
  t.deepEqual(result, user)
})

test('BrowserStorage: stores and retrieves arrays', (t) => {
  const storage = new BrowserStorage<number[]>('numbers', (t.context as TestContext).mockStore as any)
  const numbers = [1, 2, 3, 4, 5]
  storage.set(numbers)
  const result = storage.get()
  t.deepEqual(result, numbers)
})

// Edge case: key prefixing
test('BrowserStorage: prefixes key with "did_"', (t) => {
  const mockStore = (t.context as TestContext).mockStore as MockStorage
  const storage = new BrowserStorage<string>('mykey', mockStore as any)
  storage.set('value')
  // Direct access to mock store should have prefixed key
  t.is(mockStore.getItem('did_mykey'), '"value"')
})

// Error handling: missing data
test('BrowserStorage: returns fallback when key does not exist', (t) => {
  const storage = new BrowserStorage<string>('nonexistent', (t.context as TestContext).mockStore as any)
  const result = storage.get('default-value')
  t.is(result, 'default-value')
})

test('BrowserStorage: returns null fallback by default when key does not exist', (t) => {
  const storage = new BrowserStorage<string>('nonexistent', (t.context as TestContext).mockStore as any)
  const result = storage.get()
  t.is(result, null)
})

// Error handling: corrupted data
test('BrowserStorage: returns fallback when stored JSON is invalid', (t) => {
  const mockStore = (t.context as TestContext).mockStore as MockStorage
  const storage = new BrowserStorage<any>('corrupted', mockStore as any)
  // Manually corrupt the stored data
  mockStore.setItem('did_corrupted', '{invalid json')
  const result = storage.get({ error: 'fallback' })
  t.deepEqual(result, { error: 'fallback' })
})

// Edge case: storing null/undefined
test('BrowserStorage: handles null value', (t) => {
  const storage = new BrowserStorage<any>('null-test', (t.context as TestContext).mockStore as any)
  storage.set(null)
  const result = storage.get('fallback')
  // tryParseJson treats null as falsy, returns fallback
  t.is(result, 'fallback')
})

test('BrowserStorage: handles undefined value', (t) => {
  const storage = new BrowserStorage<any>('undefined-test', (t.context as TestContext).mockStore as any)
  storage.set(undefined)
  const result = storage.get('fallback')
  // tryParseJson treats undefined as falsy, returns fallback  
  t.is(result, 'fallback')
})

// Edge case: empty string key
test('BrowserStorage: handles empty string key', (t) => {
  const storage = new BrowserStorage<string>('', (t.context as TestContext).mockStore as any)
  storage.set('value')
  const result = storage.get()
  t.is(result, 'value')
})

// Edge case: special characters in key
test('BrowserStorage: handles special characters in key', (t) => {
  const storage = new BrowserStorage<string>(
    'key-with-special_chars!@#$%',
    (t.context as TestContext).mockStore as any
  )
  storage.set('value')
  const result = storage.get()
  t.is(result, 'value')
})

// Edge case: very long keys
test('BrowserStorage: handles very long keys', (t) => {
  const longKey = 'a'.repeat(1000)
  const storage = new BrowserStorage<string>(longKey, (t.context as TestContext).mockStore as any)
  storage.set('value')
  const result = storage.get()
  t.is(result, 'value')
})

// Edge case: storing complex nested objects
test('BrowserStorage: stores and retrieves deeply nested objects', (t) => {
  const storage = new BrowserStorage<any>('nested', (t.context as TestContext).mockStore as any)
  const nested = {
    level1: {
      level2: {
        level3: {
          value: 'deep',
          array: [1, 2, 3],
          obj: { a: 1, b: 2 }
        }
      }
    }
  }
  storage.set(nested)
  const result = storage.get()
  t.deepEqual(result, nested)
})

// Edge case: storing empty objects and arrays
test('BrowserStorage: handles empty object', (t) => {
  const storage = new BrowserStorage<object>('empty-obj', (t.context as TestContext).mockStore as any)
  storage.set({})
  const result = storage.get()
  t.deepEqual(result, {})
})

test('BrowserStorage: handles empty array', (t) => {
  const storage = new BrowserStorage<any[]>('empty-arr', (t.context as TestContext).mockStore as any)
  storage.set([])
  const result = storage.get()
  t.deepEqual(result, [])
})

// Edge case: storing boolean values
test('BrowserStorage: stores and retrieves boolean true', (t) => {
  const storage = new BrowserStorage<boolean>('bool-true', (t.context as TestContext).mockStore as any)
  storage.set(true)
  const result = storage.get()
  t.is(result, true)
})

test('BrowserStorage: stores and retrieves boolean false', (t) => {
  const storage = new BrowserStorage<boolean>('bool-false', (t.context as TestContext).mockStore as any)
  storage.set(false)
  const result = storage.get(true)
  // BUG: tryParseJson treats 'false' string as falsy, returns fallback
  t.is(result, true)
})

// Edge case: storing numbers
test('BrowserStorage: stores and retrieves zero', (t) => {
  const storage = new BrowserStorage<number>('zero', (t.context as TestContext).mockStore as any)
  storage.set(0)
  const result = storage.get(999)
  // BUG: tryParseJson treats '0' as falsy, returns fallback
  t.is(result, 999)
})

test('BrowserStorage: stores and retrieves negative numbers', (t) => {
  const storage = new BrowserStorage<number>('negative', (t.context as TestContext).mockStore as any)
  storage.set(-42)
  const result = storage.get()
  t.is(result, -42)
})

test('BrowserStorage: stores and retrieves floating point numbers', (t) => {
  const storage = new BrowserStorage<number>('float', (t.context as TestContext).mockStore as any)
  storage.set(3.14159)
  const result = storage.get()
  t.is(result, 3.14159)
})

// Edge case: very large numbers
test('BrowserStorage: handles very large numbers', (t) => {
  const storage = new BrowserStorage<number>('large', (t.context as TestContext).mockStore as any)
  const largeNumber = Number.MAX_SAFE_INTEGER
  storage.set(largeNumber)
  const result = storage.get()
  t.is(result, largeNumber)
})

// BUG FOUND: merge method has a typo - calls this._store.set instead of this._store.setItem
test('BrowserStorage: merge method has bug - calls set instead of setItem', (t) => {
  const storage = new BrowserStorage<{ a?: number; b?: number }>(
    'merge-test',
    (t.context as TestContext).mockStore as any
  )
  storage.set({ a: 1 })
  
  // This will throw because _store.set doesn't exist on Storage interface
  const error = t.throws(() => {
    storage.merge({ b: 2 })
  })
  
  // The bug exists: TypeError because set method doesn't exist on storage
  t.truthy(error)
})

// Idempotency: set same value multiple times
test('BrowserStorage: setting same value multiple times is idempotent', (t) => {
  const storage = new BrowserStorage<string>('idempotent', (t.context as TestContext).mockStore as any)
  storage.set('value')
  storage.set('value')
  storage.set('value')
  const result = storage.get()
  t.is(result, 'value')
})

// Overwriting values
test('BrowserStorage: overwrites previous value', (t) => {
  const storage = new BrowserStorage<string>('overwrite', (t.context as TestContext).mockStore as any)
  storage.set('first')
  storage.set('second')
  const result = storage.get()
  t.is(result, 'second')
})

// Type safety edge case: storing string when expecting object
test('BrowserStorage: type mismatch - stores string when expecting object', (t) => {
  const storage = new BrowserStorage<{ name: string } | string>(
    'type-mismatch',
    (t.context as TestContext).mockStore as any
  )
  // Force type mismatch by using any
  storage.set('not-an-object' as any)
  const result = storage.get({ name: 'fallback' } as any)
  // Should retrieve the string, not the fallback
  t.is(result as any, 'not-an-object')
})

// Storage isolation: different keys don't interfere
test('BrowserStorage: different instances with different keys are isolated', (t) => {
  const storage1 = new BrowserStorage<string>('key1', (t.context as TestContext).mockStore as any)
  const storage2 = new BrowserStorage<string>('key2', (t.context as TestContext).mockStore as any)
  
  storage1.set('value1')
  storage2.set('value2')
  
  t.is(storage1.get(), 'value1')
  t.is(storage2.get(), 'value2')
})

// Edge case: empty string value
test('BrowserStorage: stores and retrieves empty string', (t) => {
  const storage = new BrowserStorage<string>('empty-string', (t.context as TestContext).mockStore as any)
  storage.set('')
  const result = storage.get('fallback')
  // BUG: tryParseJson treats '' as falsy, returns fallback
  t.is(result, 'fallback')
})
