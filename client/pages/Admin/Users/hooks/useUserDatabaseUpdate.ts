import { useMutation } from '@apollo/client'
import { IUsersContext } from '../context'
import $syncActiveDirectoryUsers from '../../../../graphql-mutations/user/syncActiveDirectoryUsers.gql'

/**
 * Hook for syncing user database from Entra ID using delta queries.
 * This efficiently updates only changed users and saves a delta link for future incremental syncs.
 *
 * @param context Context for Users page
 * @returns Function to start the user database sync
 */
export function useUserDatabaseUpdate(context: IUsersContext) {
  const [syncActiveDirectoryUsers] = useMutation($syncActiveDirectoryUsers)

  return async (forceFullSync = false) => {
    try {
      const result = await syncActiveDirectoryUsers({
        variables: { forceFullSync }
      })
      // Refetch users to show updated data
      context.refetch()
      return result.data?.syncActiveDirectoryUsers
    } catch (error) {
      // Error will be handled by Apollo Client error boundaries
      throw error
    }
  }
}