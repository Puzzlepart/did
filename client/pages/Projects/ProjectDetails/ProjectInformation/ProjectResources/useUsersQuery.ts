import { useQuery } from '@apollo/client'
import $users from './users.gql'
import { useMemo } from 'react'

export function useUsersQuery() {
  const query = useQuery($users, {
    fetchPolicy: 'cache-and-network'
  })

  const users = useMemo(() => query?.data?.users ?? [], [query.data])

  return { users, isDataLoaded: !query.loading }
}
