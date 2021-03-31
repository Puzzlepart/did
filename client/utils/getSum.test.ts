import test from 'ava'
import { getSum } from './getSum'

test('getSum returns the correct sum for property duration', t => {
    const result = getSum([
        {
            duration: 5
        },
        {
            duration: 12
        },
        {
            duration: 3
        }
    ], 'duration')
    t.is(result, 20)
})