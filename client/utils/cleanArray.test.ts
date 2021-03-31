import test from 'ava'
import { cleanArray } from './cleanArray'

test('cleanArray cleans an array correctly', t => {
  const result = cleanArray([1, 2, null, undefined, 3, 4, 5])
  t.is(result.length, 5)
})