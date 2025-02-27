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

test('t9r returns original string when no placeholders are found', (t) => {
  const result = t9r('hello world', { name: 'Kim' })
  t.is(result, 'hello world')
})

test('t9r handles missing properties gracefully', (t) => {
  const result = t9r('hello {{name}}', {})
  t.is(result, 'hello ')
})