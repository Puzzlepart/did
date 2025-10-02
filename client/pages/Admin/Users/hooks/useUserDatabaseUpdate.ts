import { useMutation } from '@apollo/client'
import { IUsersContext } from '../context'
import $startUserDatabaseUpdate from './startUserDatabaseUpdate.gql'

/**
 * Hook for starting user database update from Entra ID.
 * This will update all user properties in the MongoDB cache from MS Graph.
 *
 * @param context Context for Users page
 * @returns Function to start the user database update
 */
export function useUserDatabaseUpdate(context: IUsersContext) {
  const [startUserDatabaseUpdate] = useMutation($startUserDatabaseUpdate)

  return async (concurrency = 10) => {
    try {
      await startUserDatabaseUpdate({ 
        variables: { concurrency } 
      })
      // Optionally refetch users to show updated data
      context.refetch()
    } catch (error) {
      // Error will be handled by Apollo Client error boundaries
      throw error
    }
  }
}