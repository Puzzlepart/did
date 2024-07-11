import test from 'ava'
import { toFixed } from './toFixed'

test('toFixed returns the number in fixed-point notation', (t) => {
  const result = toFixed(1.2345, 2)
  t.is(result, 1.23)
})

test('toFixed returns the number in fixed-point notation with 0 fraction digits', (t) => {
  const result = toFixed(1.2345)
  t.is(result, 1)
})

test('toFixed returns the number in fixed-point notation with 4 fraction digits', (t) => {
  const result = toFixed(1.2345, 4)
  t.is(result, 1.2345)
})

test('toFixed returns the number in fixed-point notation with 5 fraction digits', (t) => {
  const result = toFixed(1.2345, 5)
  t.is(result, 1.2345)
})