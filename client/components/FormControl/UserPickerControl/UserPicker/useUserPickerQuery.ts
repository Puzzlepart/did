import { useQuery } from '@apollo/client'
import _ from 'lodash'
import { User } from 'types'
import $users from './users.gql'
import { useEffect } from 'react'
import { IUserPickerState } from './types'

/**
 * Custom hook for handling user picker query.
 */
export function useUserPickerQuery(
  setState: (newState: React.SetStateAction<IUserPickerState>) => void
) {
  const query = useQuery<{ users: User[] }>($users, {
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    const users = _.get(query, 'data.users', []) as User[]
    setState({
      users,
      loading: query.loading
    })
  }, [query])
}
