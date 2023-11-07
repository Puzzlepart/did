/* eslint-disable unicorn/prevent-abbreviations */
import { useMutation } from '@apollo/client'
import { TypedMap } from 'hooks'
import { useCallback } from 'react'
import $updateUserConfiguration from './update-user-configuration.gql'
/**
 * Update user configuration hook.
 
 *
 * @category React Hook
 */
export function useUpdateUserConfiguration() {
  const [updateUserConfiguration] = useMutation($updateUserConfiguration)

  const updateLastActive = useCallback(async () => {
    await updateUserConfiguration({
      variables: {
        lastActive: new Date()
      }
    })
  }, [])

  const updateUserSettings = useCallback(
    async (user: TypedMap<any, any, any>) => {
      await updateUserConfiguration({
        variables: {
          user: JSON.stringify(user.$)
        }
      })
      return true
    },
    []
  )

  return {
    updateUserSettings,
    updateLastActive
  }
}
