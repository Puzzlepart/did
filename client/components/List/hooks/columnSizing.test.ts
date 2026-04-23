import test from 'ava'
import { IListColumn } from '../types'
import {
  DEFAULT_MIN_WIDTH,
  MAX_COLUMN_WIDTH,
  estimateColumnWidth
} from './columnSizing'

const column = (overrides: Partial<IListColumn> = {}): IListColumn => ({
  key: 'name',
  name: 'Name',
  fieldName: 'name',
  ...overrides
})

test('estimateColumnWidth uses the longest sampled value', (t) => {
  const width = estimateColumnWidth(
    column(),
    [{ name: 'A' }, { name: 'ABCDEFGHIJ' }, { name: 'ABC' }],
    50
  )
  t.true(width > estimateColumnWidth(column(), [{ name: 'A' }], 50))
})

test('estimateColumnWidth considers header name length', (t) => {
  const width = estimateColumnWidth(
    column({ name: 'A very long header label' }),
    [{ name: '' }],
    50
  )
  t.true(width > DEFAULT_MIN_WIDTH)
})

test('estimateColumnWidth honors only the first `sampleSize` items', (t) => {
  const items = [
    { name: 'short' },
    { name: 'also short' },
    { name: 'this-is-a-much-longer-value-that-should-be-ignored' }
  ]
  const sampled = estimateColumnWidth(column(), items, 2)
  const fullySampled = estimateColumnWidth(column(), items, items.length)
  t.true(sampled < fullySampled)
})

test('estimateColumnWidth clamps below column.minWidth', (t) => {
  const width = estimateColumnWidth(
    column({ minWidth: 200 }),
    [{ name: 'x' }],
    50
  )
  t.is(width, 200)
})

test('estimateColumnWidth clamps above column.maxWidth', (t) => {
  const longValue = 'x'.repeat(1000)
  const width = estimateColumnWidth(
    column({ maxWidth: 150 }),
    [{ name: longValue }],
    50
  )
  t.is(width, 150)
})

test('estimateColumnWidth never exceeds MAX_COLUMN_WIDTH', (t) => {
  const longValue = 'x'.repeat(100_000)
  const width = estimateColumnWidth(
    column(),
    [{ name: longValue }],
    50
  )
  t.is(width, MAX_COLUMN_WIDTH)
})

test('estimateColumnWidth falls back to idealWidth for columns with onRender', (t) => {
  const width = estimateColumnWidth(
    column({ onRender: () => null, idealWidth: 300 }),
    [{ name: 'short' }],
    50
  )
  t.is(width, 300)
})

test('estimateColumnWidth falls back to idealWidth for columns with renderAs', (t) => {
  const width = estimateColumnWidth(
    column({ renderAs: 'persona', idealWidth: 275 }),
    [{ name: 'short' }],
    50
  )
  t.is(width, 275)
})

test('estimateColumnWidth ignores non-string / non-number field values', (t) => {
  const bare = column({ name: '' })
  const width = estimateColumnWidth(
    bare,
    [
      { name: { deeply: 'nested' } },
      { name: [1, 2, 3] },
      { name: null },
      { name: undefined }
    ] as any,
    50
  )
  t.is(width, DEFAULT_MIN_WIDTH)
})

test('estimateColumnWidth handles an empty items array', (t) => {
  const width = estimateColumnWidth(column({ name: 'Hi' }), [], 50)
  t.true(width >= DEFAULT_MIN_WIDTH)
})
