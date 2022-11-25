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
