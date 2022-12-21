import { useMutation } from '@apollo/client'
import _ from 'underscore'
import { IUsersContext } from './context'
import $updateUsers from './updateUsers.gql'

/**
 * Sync users hook for `Users`
 *
 * @param context Context
 */
export function useUsersSync(context: IUsersContext) {
  const [updateUsers] = useMutation($updateUsers)
  return async (properties = ['accountEnabled']) => {
    const users = context.state.users
      .map((user) => {
        const adUser = _.find(context.state.adUsers, (a) => a.id === user.id)
        if (!adUser) return null
        const userUpdate = properties.reduce((object, property) => {
          if (
            adUser[property] !== undefined &&
            user[property] !== adUser[property]
          ) {
            object = object ?? {}
            object[property] = adUser[property]
          }
          return object
        }, null as Record<string, any>)
        return userUpdate ? { id: user.id, ...userUpdate } : null
      })
      .filter(Boolean)
    if (!_.isEmpty(users)) {
      await updateUsers({ variables: { users } })
      context.refetch()
    }
  }
}
