import test from 'ava'
import { tryParseJson } from './tryParseJson'

test('tryParseJson returns fallback value for invalid JSON', (t) => {
  const result = tryParseJson(`{name:'5}`, { name: null })
  t.is(result.name, null)
  t.deepEqual(Object.keys(result), ['name'])
})

test('tryParseJson parses JSON correctly', (t) => {
  const result = tryParseJson(`{"name":"Ole","age":38}`)
  t.deepEqual(result, { name: 'Ole', age: 38 })
})

test('tryParseJson handles empty string input', (t) => {
  const result = tryParseJson('', { defaultKey: 'defaultValue' })
  t.deepEqual(result, { defaultKey: 'defaultValue' })
})

test('tryParseJson handles non-string input', (t) => {
  const result = tryParseJson(null, { defaultKey: 'defaultValue' })
  t.deepEqual(result, { defaultKey: 'defaultValue' })
})
