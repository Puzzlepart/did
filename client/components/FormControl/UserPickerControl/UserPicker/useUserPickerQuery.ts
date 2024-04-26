import { WatchQueryFetchPolicy, useQuery } from '@apollo/client'
import _ from 'lodash'
import { useEffect } from 'react'
import { User } from 'types'
import { IUserPickerContext } from './context'
import $users from './users.gql'

/**
 * Custom hook for handling user picker query.
 *
 * @param context The context for the `UserPicker`.
 * @param fetchPolicy The fetch policy for the query which defaults to `cache-first`.
 */
export function useUserPickerQuery(
  { props, setState }: Partial<IUserPickerContext>,
  fetchPolicy: WatchQueryFetchPolicy = 'cache-first'
) {
  const query = useQuery<{ users: User[] }>($users, {
    fetchPolicy
  })

  useEffect(() => {
    const users = _.get(query, 'data.users', []) as User[]
    const selectedUsers =
      _.isArray(props.value) && props.multiple
        ? props.value.map(({ id }) => users.find((user) => user.id === id))
        : []
    setState({
      users,
      isDataLoaded: !query.loading,
      selectedUsers,
      selectedUser:
        typeof props.value === 'string' && !props.multiple
          ? users.find((user) => user.id === props.value)
          : null
    })
  }, [query])
}
