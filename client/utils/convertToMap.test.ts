import test from 'ava'
import { convertToMap } from './convertToMap'

test('toMap converts an object to a Map', (t) => {
  const result = convertToMap({
    name: 'Ole',
    age: 38
  })
  t.is(result.size, 2)
  t.is(result.get('name'), 'Ole')
  t.is(result.get('age'), 38)
})

test('convertToMap handles empty object', (t) => {
  const result = convertToMap({})
  t.is(result.size, 0)
})

test('convertToMap handles null or undefined gracefully', (t) => {
  const resultNull = convertToMap(null)
  const resultUndefined = convertToMap(undefined)
  t.is(resultNull.size, 0)
  t.is(resultUndefined.size, 0)
})
