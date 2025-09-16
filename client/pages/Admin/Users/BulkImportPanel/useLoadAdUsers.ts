import { useLazyQuery } from '@apollo/client'
import { useContext } from 'react'
import { UsersContext } from '../context'
import { SET_AD_USERS, SET_AD_USERS_LOADING } from '../reducer/actions'
import $loadActiveDirectoryUsers from '../hooks/loadActiveDirectoryUsers.gql'

export function useLoadAdUsers() {
  const context = useContext(UsersContext)
  const [loadActiveDirectoryUsers] = useLazyQuery($loadActiveDirectoryUsers, {
    onCompleted: (data) => {
      context.dispatch(SET_AD_USERS(data.activeDirectoryUsers))
    },
    onError: () => {
      context.dispatch(SET_AD_USERS_LOADING(false))
    }
  })

  const loadUsers = async () => {
    context.dispatch(SET_AD_USERS_LOADING(true))
    try {
      await loadActiveDirectoryUsers()
    } catch {
      context.dispatch(SET_AD_USERS_LOADING(false))
    }
  }

  return {
    loadUsers,
    loading: context.state.adUsersLoading,
    hasUsers: context.state.adUsers.length > 0
  }
}
