import { useMutation } from '@apollo/client'
import $syncActiveDirectoryUsers from '../../../../graphql-mutations/user/syncActiveDirectoryUsers.gql'
import $forceFullSyncActiveDirectoryUsers from '../../../../graphql-mutations/user/forceFullSyncActiveDirectoryUsers.gql'

/**
 * Hook for syncing Active Directory users using delta queries.
 * Provides functions to trigger incremental sync or force full sync.
 */
export function useActiveDirectorySync() {
  const [syncUsers, { loading: syncLoading, data: syncData }] = useMutation(
    $syncActiveDirectoryUsers
  )

  const [forceFullSync, { loading: fullSyncLoading, data: fullSyncData }] =
    useMutation($forceFullSyncActiveDirectoryUsers)

  /**
   * Trigger an incremental sync of Active Directory users.
   * If no delta link exists, performs a full sync automatically.
   *
   * @param forceFullSync - Whether to force a full sync even if delta link exists
   */
  const sync = async (forceFullSync = false) => {
    const result = await syncUsers({
      variables: { forceFullSync }
    })
    return result.data?.syncActiveDirectoryUsers
  }

  /**
   * Force a complete re-sync of all Active Directory users.
   * Clears all cached data and fetches everything from scratch.
   */
  const forceSync = async () => {
    const result = await forceFullSync()
    return result.data?.forceFullSyncActiveDirectoryUsers
  }

  return {
    sync,
    forceSync,
    loading: syncLoading || fullSyncLoading,
    lastSyncResult:
      syncData?.syncActiveDirectoryUsers ||
      fullSyncData?.forceFullSyncActiveDirectoryUsers
  }
}
