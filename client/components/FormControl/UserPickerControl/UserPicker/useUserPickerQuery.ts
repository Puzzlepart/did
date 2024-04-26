import { WatchQueryFetchPolicy, useQuery } from '@apollo/client'
import _ from 'lodash'
import { User } from 'types'
import $users from './users.gql'
import { useEffect } from 'react'
import { IUserPickerState } from './types'

/**
 * Custom hook for handling user picker query.
 *
 * @param setState The state setter function.
 * @param fetchPolicy The fetch policy for the query which defaults to `cache-first`.
 */
export function useUserPickerQuery(
  setState: (newState: React.SetStateAction<IUserPickerState>) => void,
  fetchPolicy: WatchQueryFetchPolicy = 'cache-first'
) {
  const query = useQuery<{ users: User[] }>($users, {
    fetchPolicy
  })

  useEffect(() => {
    const users = _.get(query, 'data.users', []) as User[]
    setState({
      users,
      loading: query.loading
    })
  }, [query])
}
