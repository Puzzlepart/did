import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import $userDatabaseUpdateStatus from './userDatabaseUpdateStatus.gql'

/**
 * Hook to monitor user database update status with smart polling
 * Only polls when an update is running to minimize server load
 * Returns the current status and a boolean indicating if update is running
 */
export function useUserDatabaseUpdateStatus() {
  const [pollInterval, setPollInterval] = useState<number>(0)
  
  const { data, loading, startPolling, stopPolling } = useQuery($userDatabaseUpdateStatus, {
    pollInterval: pollInterval || undefined, // Dynamic polling based on status
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  })

  const status = data?.userDatabaseUpdateStatus
  const isRunning = status?.running || false

  // Smart polling: only poll when update is running
  useEffect(() => {
    if (isRunning) {
      // Update is running - poll every 3 seconds (reduced from 2s to further reduce load)
      setPollInterval(3000)
      startPolling(3000)
    } else if (pollInterval !== 0) {
      // Update finished or not running - stop polling
      setPollInterval(0)
      stopPolling()
    }
    
    return () => {
      // Cleanup: stop polling when component unmounts
      stopPolling()
    }
  }, [isRunning, pollInterval, startPolling, stopPolling])

  return {
    status,
    isRunning,
    loading
  }
}