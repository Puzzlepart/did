import test from 'ava'
import { deepCopy } from './deepCopy'

test('deepCopy returns a deep copy of an object', (t) => {
  const obj = {
    a: 1,
    b: {
      c: 2,
      d: {
        e: 3
      }
    }
  }
  const result = deepCopy(obj)
  t.deepEqual(result, obj)
  t.not(result, obj)
  t.not(result.b, obj.b)
  t.not(result.b.d, obj.b.d)
})

test('deepCopy handles arrays correctly', (t) => {
  const arr = [1, { nested: 'value' }]
  const result = deepCopy(arr)
  t.deepEqual(result, arr)
  t.not(result, arr)
  t.not(result[1], arr[1])
})
