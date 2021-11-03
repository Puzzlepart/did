import test from 'ava'
import { omitTypename } from './omitTypename'

test('omitTypename removes all __typename instances in the object', (t) => {
  const result = omitTypename({ name: 'Ole Martin', __typename: 'User', country: { name: 'Norway', __typename: 'Country' } })
  t.deepEqual(result, {
    name: 'Ole Martin',
    country: { name: 'Norway' }
  })
})

