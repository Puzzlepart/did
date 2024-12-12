import test from 'ava'
import { omitDeep } from './omitDeep'

test('omitDeep removes __typename deep', (t) => {
  const result = omitDeep(
    {
      __typename: 'Customer',
      name: 'Puzzlepart',
      projects: [
        {
          __typename: 'Project',
          name: 'did'
        },
        {
          __typename: 'Project',
          name: 'Prosjektportalen'
        }
      ]
    },
    '__typename'
  )
  t.deepEqual(result, {
    projects: [{ name: 'did' }, { name: 'Prosjektportalen' }],
    name: 'Puzzlepart'
  })
})
