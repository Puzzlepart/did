import test from 'ava'
import { switchCase } from './switchCase'

test('switchCase should return the result of the first matching case', (t) => {
  const result = switchCase(
    [
      [(v) => v === 1, 'one'],
      [(v) => v === 2, 'two'],
      [(v) => v === 3, 'three']
    ],
    2
  )

  t.is(result, 'two')
})

test('switchCase should return the result of the first matching case not using a predicate', (t) => {
  const result = switchCase(
    [
      [true, 'one'],
      [true, 'two'],
      [true, 'three']
    ],
    2
  )

  t.is(result, 'one')
})

test('switchCase should return the default case if no cases match', (t) => {
  const result = switchCase(
    [
      [(v) => v === 1, 'one'],
      [(v) => v === 2, 'two'],
      [(v) => v === 3, 'three']
    ],
    4,
    'four'
  )

  t.is(result, 'four')
})
