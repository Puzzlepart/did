import test from 'ava'
import { sortAlphabetically } from './sortAlphabetically'

test('sortAlphabetically sorts the letters in interchangeableness alphabetically', (t) => {
  const word = 'interchangeableness'
  const result = sortAlphabetically(word.split(''))
  t.deepEqual(result, [
    'a',
    'a',
    'b',
    'c',
    'e',
    'e',
    'e',
    'e',
    'g',
    'h',
    'i',
    'l',
    'n',
    'n',
    'n',
    'r',
    's',
    's',
    't'
  ])
  t.is(result.length, word.length)
})
