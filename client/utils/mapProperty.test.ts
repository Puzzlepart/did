import test from 'ava'
import { mapProperty } from './mapProperty'

test('mapProperty maps an array of objects to an array of values for a given property', (t) => {
  const array = [{ key: 'value1' }, { key: 'value2' }, { key: 'value3' }]
  const result = mapProperty(array, 'key')
  t.deepEqual(result, ['value1', 'value2', 'value3'])
})

test('mapProperty removes undefined values', (t) => {
  const array = [{ key: 'value1' }, { key: undefined }, { key: 'value3' }]
  const result = mapProperty(array, 'key')
  t.deepEqual(result, ['value1', 'value3'])
})

test('mapProperty removes null values', (t) => {
  const array = [{ key: 'value1' }, { key: null }, { key: 'value3' }]
  const result = mapProperty(array, 'key')
  t.deepEqual(result, ['value1', 'value3'])
})
