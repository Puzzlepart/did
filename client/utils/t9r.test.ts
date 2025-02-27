import test from 'ava'
import { t9r } from './t9r'

test('t9r converts a string to T9 representation', (t) => {
  const result = t9r('hello {{name}}', { name: 'Kim' })
  t.deepEqual(result, 'hello Kim')
})

test('t9r converts a string to T9 representation with nested object', (t) => {
  const result = t9r('hello {{name.first}}', { name: { first: 'Kim' } })
  t.deepEqual(result, 'hello Kim')
})