import { WatchQueryFetchPolicy, useQuery } from '@apollo/client'
import _ from 'lodash'
import { useEffect } from 'react'
import { User } from 'types'
import $users from './users.gql'

/**
 * Custom hook for handling user picker query.
 *
 * @param onUsersFetched The callback function to be called when users are fetched.
 * @param fetchPolicy The fetch policy for the query which defaults to `cache-first`.
 */
export function useUserPickerQuery(
  onUsersFetched: (users: User[]) => void,
  fetchPolicy: WatchQueryFetchPolicy = 'cache-first'
) {
  const query = useQuery<{ users: User[] }>($users, {
    fetchPolicy
  })

  useEffect(() => {
    if (query.loading) return
    const users = _.get(query, 'data.users', []) as User[]
    onUsersFetched(users)
  }, [query])
}
