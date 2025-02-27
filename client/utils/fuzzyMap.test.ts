import test from 'ava'
import { fuzzyMap } from './fuzzyMap'

test('fuzzyMap maps an array', (t) => {
  const result = fuzzyMap([1, 2, 3], (item) => item + 1)
  t.deepEqual(result, [2, 3, 4])
})

test('fuzzyMap maps an array and removes null and undefined values', (t) => {
  const result = fuzzyMap([1, 2, 3], (item) => item > 2 && item)
  t.deepEqual(result, [3])
  t.deepEqual(result.length, 1)
})

test('fuzzyMap maps an object', (t) => {
  const object = {
    five: 5,
    six: 6,
    seven: 7
  }
  const result = fuzzyMap(object, (item) => item + 1)
  t.deepEqual(result, [6, 7, 8])
})

test('fuzzyMap maps an more advanced object', (t) => {
  const object = {
    five: [5, 6, 7],
    six: [7, 8, 9],
    seven: [8, 9, 10]
  }
  const result = fuzzyMap(object, (item, key) => `${key}: ${item.join(', ')}`)
  t.deepEqual(result, ['five: 5, 6, 7', 'six: 7, 8, 9', 'seven: 8, 9, 10'])
})

test('fuzzyMap returns empty array for empty array input', (t) => {
  const result = fuzzyMap([], (item) => item + 1)
  t.deepEqual(result, [])
})

test('fuzzyMap handles null or undefined input', (t) => {
  const resultNull = fuzzyMap(null, (item) => item)
  const resultUndefined = fuzzyMap(undefined, (item) => item)
  t.deepEqual(resultNull, [])
  t.deepEqual(resultUndefined, [])
})
