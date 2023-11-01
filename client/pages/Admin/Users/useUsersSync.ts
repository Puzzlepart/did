import { useMutation } from '@apollo/client'
import _ from 'underscore'
import { IUsersContext } from './context'
import $updateUsers from './updateUsers.gql'

/**
 * Sync users hook for `Users`. Returns a function that can be used to
 * sync users with the backend. The function takes an array of
 * properties to sync. If no properties are provided, all properties
 * will be synced. The hook is using the mutation `updateUsers` to
 * update the users.
 *
 * @param context Context
 */
export function useUsersSync(context: IUsersContext) {
  const [updateUsers] = useMutation($updateUsers)
  return async (properties = ['accountEnabled']) => {
    const users = context.state.selectedUsers
      .map((user) => {
        const adUser = _.find(context.state.adUsers, (a) => a.id === user.id)
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
        return userUpdate ? { id: user.id, ...userUpdate } : null
      })
      .filter(Boolean)
    if (!_.isEmpty(users)) {
      await updateUsers({ variables: { users } })
      context.refetch()
    }
  }
}
