import { useQuery } from '@apollo/client'
import { usePermissions } from 'hooks/user/usePermissions'
import { Dispatch, useEffect } from 'react'
import { PermissionScope } from 'security'
import { DATA_UPDATED } from '../reducer/actions'
import $users from './users.gql'
import { AnyAction } from '@reduxjs/toolkit'

/**
 * Custom hook that returns a query object for fetching users data and dispatches a `DATA_UPDATED` action
 *
 * @param dispatch - Redux dispatch function for `Users` component
 */
export function useUsersQuery(dispatch: Dispatch<AnyAction>) {
  const [, hasPermission] = usePermissions()
  const includeInvitations = hasPermission(PermissionScope.INVITE_EXTERNAL_USERS)
  const query = useQuery($users, {
    fetchPolicy: 'cache-and-network',
    variables: { includeInvitations }
  })

  useEffect(() => dispatch(DATA_UPDATED({ query })), [query.loading])

  return query
}
