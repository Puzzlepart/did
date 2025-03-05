import { useCallback, useState } from 'react'
import { ExternalUserInvitation } from 'types'
import { useUsersContext } from '../context'

export interface UsePendingInvitationsResult {
  invitations: ExternalUserInvitation[]
  loading: boolean
  error: Error | null
  cancelInvitation: (invitationId: string) => Promise<void>
}

export function usePendingInvitations(): UsePendingInvitationsResult {
  const { state } = useUsersContext()
  const [error, setError] = useState<Error | null>(null)

  /**
   * Cancel a pending invitation
   */
  const cancelInvitation = useCallback(async (invitationId: string) => {
    try {
      // In a real implementation, this would make an API call to cancel the invitation
      // eslint-disable-next-line no-console
      console.log(`Cancelling invitation ${invitationId}`)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (error_) {
      setError(
        error_ instanceof Error
          ? error_
          : new Error('Failed to cancel invitation')
      )
      throw error_
    }
  }, [])

  return {
    invitations: state.invitations,
    loading: state.loading,
    error,
    cancelInvitation
  }
}
