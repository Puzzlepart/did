/* eslint-disable unicorn/prevent-abbreviations */
import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BaseResult, ExternalUserInvitation, User } from 'types'
import { useUsersContext } from '../context'
import $cancelExternalInvitation from './cancelExternalInvitation.gql'

export interface UsePendingInvitationsResult {
  invitations: ExternalUserInvitation[]
  getUserById: (id: string) => User
  loading: boolean
  error: Error | null
  cancelInvitation: (invitationId: string) => Promise<void>
}

export function usePendingInvitations(): UsePendingInvitationsResult {
  const { t } = useTranslation()
  const { state } = useUsersContext()
  const [invitations, setInvitations] = useState<ExternalUserInvitation[]>([])
  useEffect(() => {
    setInvitations(state.invitations)
  }, [state.invitations])

  const { displayToast } = useAppContext()
  const [cancelExternalInvitation] = useMutation<
    { result: BaseResult },
    { invitationId: string }
  >($cancelExternalInvitation)

  /**
   * Cancel a pending invitation by calling the 
   * `cancelExternalInvitation` mutation.
   */
  const cancelInvitation = useCallback(async (invitationId: string) => {
    const { data } = await cancelExternalInvitation({
      variables: { invitationId }
    })
    if (data?.result?.success) {
      displayToast(t('admin.users.cancelInvitationSuccess'), 'success')
      setInvitations((prev) =>
        prev.filter((invitation) => invitation.id !== invitationId)
      )
    } else {
      displayToast(
        t('admin.users.cancelInvitationError', {
          error: data?.result?.error?.message
        }),
        'error'
      )
    }
  }, [])

  return {
    invitations,
    getUserById: (id: string) => state.users.find((user) => user.id === id),
    loading: state.loading,
    error: null,
    cancelInvitation
  }
}
