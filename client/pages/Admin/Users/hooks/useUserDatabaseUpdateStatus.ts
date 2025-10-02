import { useQuery } from '@apollo/client'
import $userDatabaseUpdateStatus from './userDatabaseUpdateStatus.gql'

/**
 * Hook to monitor user database update status with polling
 * Returns the current status and a boolean indicating if update is running
 */
export function useUserDatabaseUpdateStatus() {
  const { data, loading } = useQuery($userDatabaseUpdateStatus, {
    pollInterval: 2000, // Poll every 2 seconds when active
    skip: false, // Always fetch initially
    fetchPolicy: 'cache-and-network'
  })

  const status = data?.userDatabaseUpdateStatus
  const isRunning = status?.running || false

  return {
    status,
    isRunning,
    loading
  }
}