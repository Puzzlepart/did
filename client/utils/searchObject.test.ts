import test from 'ava'
import { searchObject } from './searchObject'

test('searchObject searches the specified item for the specified searchTerm', (t) => {
  const result = searchObject({
    item: { name: 'Ole Martin', __typename: 'User' },
    searchTerm: 'Ole'
  })
  const result2 = searchObject({
    item: { name: 'Ole Martin', age: 33, __typename: 'User' },
    searchTerm: 'Ole',
    pick_: ['age']
  })
  t.is(result, true)
  t.is(result2, false)
})
