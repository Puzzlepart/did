import test from 'ava'
import { parseInt, parseFloat } from './parseNumber'

test('parseInt yields correct result for 1.005', (t) => {
  const result = parseInt('1.005')
  t.is(result, 1)
})

test('parseFloat yields correct result for 1.314', (t) => {
  const result = parseFloat('1.314')
  t.is(result, 1.314)
})

test('parseFloat yields correct result for 1.314 with 2 fraction digits', (t) => {
  const result = parseFloat('1.314', 2)
  t.is(result, 1.31)
})