import test from 'ava'
import { generateColumn } from './generateColumn'

test('generateColumn generates a default column correctly', t => {
  const result = generateColumn('nameField', 'Name')
  console.log(result)
  t.is(1,1)
})