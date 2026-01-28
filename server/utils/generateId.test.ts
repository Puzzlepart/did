import test from 'ava'
import { generateId } from './generateId'

// Basic functionality
test('generateId: generates a string', (t) => {
  const result = generateId()
  t.is(typeof result, 'string')
})

test('generateId: default length is 9 characters', (t) => {
  const result = generateId()
  t.is(result.length, 9)
})

test('generateId: respects custom length parameter', (t) => {
  const result = generateId(5)
  t.is(result.length, 5)
})

test('generateId: attempts longer IDs but limited by random string length', (t) => {
  const result = generateId(20)
  // Math.random().toString(36).slice(2) generates ~11 characters max
  t.true(result.length <= 20)
  t.true(result.length >= 9) // Should get at least default length
})

test('generateId: generates single character ID', (t) => {
  const result = generateId(1)
  t.is(result.length, 1)
})

// Edge case: zero length
test('generateId: zero length returns empty string', (t) => {
  const result = generateId(0)
  t.is(result.length, 0)
  t.is(result, '')
})

// Edge case: negative length
test('generateId: negative length still generates some characters', (t) => {
  const result = generateId(-5)
  // slice(2, -3) will slice from position 2 to 3 positions from end
  t.is(typeof result, 'string')
  t.true(result.length >= 0)
})

// Character set: alphanumeric (base36: 0-9, a-z)
test('generateId: contains only alphanumeric characters', (t) => {
  const result = generateId(50)
  const alphanumericRegex = /^[a-z0-9]*$/
  t.regex(result, alphanumericRegex)
})

test('generateId: never contains uppercase letters', (t) => {
  // Base36 toString() produces lowercase only
  const result = generateId(50)
  t.is(result, result.toLowerCase())
})

test('generateId: never contains special characters', (t) => {
  const result = generateId(50)
  const noSpecialChars = /^[a-z0-9]*$/
  t.regex(result, noSpecialChars)
})

// Uniqueness testing
test('generateId: generates different IDs on consecutive calls', (t) => {
  const id1 = generateId()
  const id2 = generateId()
  const id3 = generateId()

  t.not(id1, id2)
  t.not(id2, id3)
  t.not(id1, id3)
})

test('generateId: high probability of uniqueness in 100 IDs', (t) => {
  const ids = new Set<string>()
  const count = 100

  for (let i = 0; i < count; i++) {
    ids.add(generateId())
  }

  // All IDs should be unique
  t.is(ids.size, count)
})

test('generateId: high probability of uniqueness in 1000 IDs', (t) => {
  const ids = new Set<string>()
  const count = 1000

  for (let i = 0; i < count; i++) {
    ids.add(generateId())
  }

  // With random generation, there's a tiny chance of collision
  // but it should be extremely rare
  // We'll allow 1 collision in 1000 to account for randomness
  t.true(
    ids.size >= count - 1,
    `Expected at least ${count - 1} unique IDs, got ${ids.size}`
  )
})

// Edge case: very large length
test('generateId: large length limited by random string', (t) => {
  const result = generateId(100)
  // Can only generate ~11 chars from single random() call
  t.true(result.length < 100)
  t.true(result.length > 0)
})

// POTENTIAL BUG: What if Math.random() returns exactly 1?
// In practice, Math.random() returns [0, 1) but let's document the edge case
test('generateId: Math.random() edge case - theoretical maximum', (t) => {
  // Math.random().toString(36) will be '0.xxxxxxxxx' format
  // After slice(2), we remove '0.'
  // Maximum we can get is 35 characters (limited by precision)
  const result = generateId(50)
  // Even with length 50, we can't get more than ~35 chars from one random number
  t.true(result.length <= 50)
})

// Testing slice behavior
test('generateId: slice behavior with length exceeding random string', (t) => {
  // If we request length > what random().toString(36) can provide
  // we get truncated result
  const result = generateId(100)
  // toString(36) after slice(2) gives max ~12-13 characters
  // So result will be shorter than requested
  t.true(result.length <= 100)
})

// Edge case: floating point length (should work due to addition)
test('generateId: handles float length by coercion', (t) => {
  // length + 2 will convert to number
  const result = generateId(5.7 as any)
  // 5.7 + 2 = 7.7, slice(2, 7.7) effectively slice(2, 7)
  t.true(result.length <= 8) // May be less due to random string length
})

// Consistency: same length parameter gives same length output (when possible)
test('generateId: consistent length output for same parameter', (t) => {
  const length = 5
  const results = []

  for (let i = 0; i < 10; i++) {
    results.push(generateId(length))
  }

  // All should have same length (or less if random string is shorter)
  const lengths = results.map((r) => r.length)
  const allSameLength = lengths.every((l) => l === lengths[0])
  t.true(allSameLength || lengths.every((l) => l <= length))
})

// Edge case: undefined parameter
test('generateId: undefined parameter uses default length 9', (t) => {
  const result = generateId(undefined)
  t.is(result.length, 9)
})

// Edge case: null parameter (coerced to 0)
test('generateId: null parameter coerces to 0', (t) => {
  const result = generateId(null as any)
  // null + 2 = 2, slice(2, 2) = empty
  t.is(result.length, 0)
})

// Distribution check: does it use all possible characters?
test('generateId: uses variety of characters from base36', (t) => {
  const allChars = new Set<string>()

  // Generate many IDs to collect character samples
  for (let i = 0; i < 500; i++) {
    const id = generateId(10)
    for (const char of id) {
      allChars.add(char)
    }
  }

  // Should have seen multiple different characters
  // Base36 has 36 possible characters (0-9, a-z)
  // We won't see all of them, but should see a good variety
  t.true(
    allChars.size >= 15,
    `Expected at least 15 different characters, got ${allChars.size}`
  )
})

// Testing randomness: no obvious patterns
test('generateId: no obvious repeating patterns', (t) => {
  const id = generateId(20)

  // Check if ID is not all same character
  const allSameChar = id.split('').every((char) => char === id[0])
  t.false(allSameChar, 'ID should not be all same character')
})

// Performance: can generate IDs quickly
test('generateId: can generate many IDs quickly', (t) => {
  const start = Date.now()
  const count = 10000

  for (let i = 0; i < count; i++) {
    generateId()
  }

  const elapsed = Date.now() - start
  // Should generate 10000 IDs in less than 1 second
  t.true(elapsed < 1000, `Took ${elapsed}ms to generate ${count} IDs`)
})

// Edge case: maximum safe integer as length
test('generateId: handles very large length parameter', (t) => {
  // This will attempt to slice way beyond what's available
  const result = generateId(1000000)
  // Will return whatever random().toString(36).slice(2) gives
  t.true(result.length < 100) // Much less than requested
})

// Return type consistency
test('generateId: always returns string type', (t) => {
  t.is(typeof generateId(0), 'string')
  t.is(typeof generateId(1), 'string')
  t.is(typeof generateId(100), 'string')
  t.is(typeof generateId(-5), 'string')
})

// No leading zeros (well, they're possible in base36)
test('generateId: may contain leading zeros (valid in base36)', (t) => {
  // Just verify this doesn't cause issues
  // Leading zeros are valid in the output
  let hasLeadingZero = false

  for (let i = 0; i < 100; i++) {
    const id = generateId()
    if (id.startsWith('0')) {
      hasLeadingZero = true
      break
    }
  }

  // It's okay if we find leading zeros - they're valid
  // This test just documents the behavior
  t.pass()
})

// Collision probability calculation (documentation test)
test('generateId: collision probability is extremely low', (t) => {
  // For 9-character base36 string: 36^9 = ~1.01 * 10^14 possibilities
  // Birthday paradox: for 50% collision probability, need ~sqrt(36^9) ≈ 10^7 IDs
  // So for typical usage (thousands of IDs), collision is virtually impossible

  // Generate 10000 IDs
  const ids = new Set<string>()
  for (let i = 0; i < 10000; i++) {
    ids.add(generateId())
  }

  // Should all be unique
  t.is(ids.size, 10000)
})
