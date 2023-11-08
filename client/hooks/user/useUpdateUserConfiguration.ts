/* eslint-disable unicorn/prevent-abbreviations */
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import $updateUserConfiguration from './update-user-configuration.gql'

/**
 * Update user configuration hook.
 *
 * @category React Hook
 */
export function useUpdateUserConfiguration() {
  const [updateUserConfiguration] = useMutation($updateUserConfiguration)

  /**
   * Updates the user's last active timestamp in the user configuration.
   */
  const updateLastActive = useCallback(async () => {
    await updateUserConfiguration({
      variables: {
        lastActive: new Date()
      }
    })
  }, [])

  /**
   * Updates the user configuration with the provided user object.
   *
   * @param user The user object to update the configuration with.
   */
  const updateUserSettings = useCallback(async (user: Record<string, any>) => {
    await updateUserConfiguration({
      variables: {
        user: JSON.stringify(user)
      }
    })
    return true
  }, [])

  return {
    updateUserSettings,
    updateLastActive
  }
}
