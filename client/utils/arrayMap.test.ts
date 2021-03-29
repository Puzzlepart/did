import test from 'ava'
import { arrayMap } from './arrayMap'

test('arrayMap just returns an empty array if the array is undefined', t => {
    const result = arrayMap(undefined, element => element)
    t.is(result.length, 0)
})

test('arrayMap just returns an empty array if the array is null', t => {
    const result = arrayMap(null, element => element)
    t.is(result.length, 0)
})