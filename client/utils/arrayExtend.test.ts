import test from 'ava'
import { arrayExtend } from './arrayExtend'

test('arrayExtend extends the array correctly', (t) => {
  const result = arrayExtend<any>(
    [
      {
        name: 'Carl Joakim Damsleth',
        location: 'unknown'
      },
      {
        name: 'Ole Kristian Mørch Storstein',
        location: 'unknown'
      }
    ],
    {
      location: 'Oslo'
    }
  )
  t.is(result[0].location, 'Oslo')
  t.is(result[1].location, 'Oslo')
})

test('arrayExtend skips extends if condition is false', (t) => {
  const result = arrayExtend<any>(
    [
      {
        name: 'Carl Joakim Damsleth',
        location: 'unknown'
      },
      {
        name: 'Ole Kristian Mørch Storstein',
        location: 'unknown'
      }
    ],
    {
      location: 'Oslo'
    },
    false
  )
  t.is(result[0].location, 'unknown')
  t.is(result[1].location, 'unknown')
})
