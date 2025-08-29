import { useLazyQuery, useMutation } from '@apollo/client'
import _ from 'underscore'
import { IUsersContext } from '../context'
import { SET_AD_USERS, SET_AD_USERS_LOADING } from '../reducer/actions'
import $updateUsers from './updateUsers.gql'
import $loadActiveDirectoryUsers from './loadActiveDirectoryUsers.gql'
import { omitTypename } from 'utils'

/**
 * Sync users hook for `Users`. Returns a function that can be used to
 * sync users with the backend. The function takes an array of
 * properties to sync. If no properties are provided, all properties
 * will be synced. The hook is using the mutation `updateUsers` to
 * update the users.
 *
 * @param context Context for `Users`
 */
export function useUsersSync(context: IUsersContext) {
  const [updateUsers] = useMutation($updateUsers)
  const [loadActiveDirectoryUsers] = useLazyQuery($loadActiveDirectoryUsers, {
    onCompleted: (data) => {
      context.dispatch(SET_AD_USERS(data.activeDirectoryUsers))
    },
    onError: () => {
      context.dispatch(SET_AD_USERS_LOADING(false))
    }
  })

  return async (properties = ['manager']) => {
    // Check if AD users are loaded, if not load them first
    if (context.state.adUsers.length === 0 && !context.state.adUsersLoading) {
      context.dispatch(SET_AD_USERS_LOADING(true))
      try {
        await loadActiveDirectoryUsers()
      } catch {
        context.dispatch(SET_AD_USERS_LOADING(false))
        return // Exit early if loading fails
      }
    }

    // Wait for AD users to be loaded if they're currently loading
    if (context.state.adUsersLoading) {
      return // Exit early, user can try again once loaded
    }

    // Determine which users to sync: selected users or all non-external users
    const usersToSync = context.state.selectedUsers.length > 0
      ? context.state.selectedUsers.filter(({ isExternal }) => !isExternal)
      : context.state.users.filter(({ isExternal }) => !isExternal)

    const users = usersToSync
      .map((user) => {
        const adUser = _.find(context.state.adUsers, ({ id }) => id === user.id)
        if (!adUser) return null
        const userUpdate = properties.reduce(
          (object, property) => {
            if (
              adUser[property] !== undefined &&
              user[property] !== adUser[property]
            ) {
              object = object ?? {}
              object[property] = adUser[property]
            }
            return object
          },
          null as Record<string, any>
        )
        if (!userUpdate) return null
        return omitTypename({ id: user.id, ...userUpdate })
      })
      .filter(Boolean)
    if (!_.isEmpty(users)) {
      await updateUsers({ variables: { users } })
      context.refetch()
    }
  }
}
