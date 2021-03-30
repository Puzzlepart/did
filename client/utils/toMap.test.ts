import test from 'ava'
import { toMap } from './toMap'

test('toMap converts an object to a Map', t => {
    const result = toMap({
        name: 'Ole',
        age: 38
    })
    t.is(result.size, 2)
    t.is(result.get('name'), 'Ole')
    t.is(result.get('age'), 38)
})