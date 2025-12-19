import { useLazyQuery } from '@apollo/client'
import { useCallback, useContext, useRef } from 'react'
import { UsersContext } from '../context'
import { SET_AD_USERS, SET_AD_USERS_LOADING } from '../reducer/actions'
import $loadActiveDirectoryUsers from '../hooks/loadActiveDirectoryUsers.gql'

export function useLoadAdUsers() {
  const context = useContext(UsersContext)
  const loadAttemptedRef = useRef(false)
  
  const [loadActiveDirectoryUsers] = useLazyQuery($loadActiveDirectoryUsers, {
    fetchPolicy: 'network-only', // Prevent Apollo cache from interfering
    onCompleted: (data) => {
      context.dispatch(SET_AD_USERS(data.activeDirectoryUsers))
    },
    onError: () => {
      context.dispatch(SET_AD_USERS_LOADING(false))
    }
  })

  const loadUsers = useCallback(async () => {
    // Prevent multiple simultaneous loads
    if (loadAttemptedRef.current || context.state.adUsersLoading) {
      return
    }
    
    loadAttemptedRef.current = true
    context.dispatch(SET_AD_USERS_LOADING(true))
    try {
      await loadActiveDirectoryUsers()
    } catch {
      context.dispatch(SET_AD_USERS_LOADING(false))
    }
  }, [context.dispatch, context.state.adUsersLoading, loadActiveDirectoryUsers])

  return {
    loadUsers,
    loading: context.state.adUsersLoading,
    hasUsers: context.state.adUsers.length > 0
  }
}
