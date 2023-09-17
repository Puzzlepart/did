import test from 'ava'
import { mergeMaps } from './mergeMaps'

test('mergeMaps merges multiple maps into a single map', (t) => {
  const firstMap = new Map<string, string>([
    ['key1', 'value1'],
    ['key2', 'value2']
  ])
  const secondMap = new Map<string, string>([
    ['key3', 'value3'],
    ['key4', 'value4']
  ])
  const result = mergeMaps(firstMap, secondMap)
  t.is(result.size, 4)
  t.is(result.get('key1'), 'value1')
  t.is(result.get('key2'), 'value2')
  t.is(result.get('key3'), 'value3')
  t.is(result.get('key4'), 'value4')
})

test('the last maps value for a key wins', (t) => {
  const firstMap = new Map<string, string>([
    ['key1', 'value1'],
    ['key2', 'value2']
  ])
  const secondMap = new Map<string, string>([
    ['key2', 'value3'],
    ['key4', 'value4']
  ])
  const result = mergeMaps(firstMap, secondMap)
  t.is(result.size, 3)
  t.is(result.get('key1'), 'value1')
  t.is(result.get('key2'), 'value3')
  t.is(result.get('key4'), 'value4')
})
