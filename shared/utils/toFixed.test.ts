import test from 'ava'
import { toFixed } from './toFixed'

test('toFixed yields correct result for 1.005', (t) => {
  const result = toFixed(1.005)
  t.is(result, 1)
})

test('toFixed yields correct result for 1.314 with precision 1', (t) => {
  const result = toFixed(1.314, 1)
  t.is(result, 1.3)
})