import test from 'ava'
import { removeNullishValues } from './removeNullishValues'

test('removeNullishValues removes all nullish values from an object', (t) => {
  const result = removeNullishValues({
    name: 'Carl Joachim Damsleth',
    age: 33,
    email: null,
    phone: undefined
  })
  console.log('removeNullishValues', result)
  t.deepEqual(result, { name: 'Carl Joachim Damsleth', age: 33 })
})
