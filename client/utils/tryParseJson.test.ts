import test from 'ava'
import { tryParseJson } from './tryParseJson'

test('tryParseJson returns fallback value for invalid JSON', t => {
  const result = tryParseJson(`{name:'5}`, { name: null })
  t.is(result.name, null)
  t.deepEqual(Object.keys(result), ['name'])
})

test('tryParseJson parses JSON correctly', t => {
  const result = tryParseJson(`{"name":"Ole","age":38}`)
  t.deepEqual(result, { name: 'Ole', age: 38 })
})