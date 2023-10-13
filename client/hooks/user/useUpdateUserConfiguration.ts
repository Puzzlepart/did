/* eslint-disable unicorn/prevent-abbreviations */
import { useMutation } from '@apollo/client'
import { TypedMap } from 'hooks'
import { useCallback, useEffect } from 'react'
import $updateUserConfiguration from './update-user-configuration.gql'

export type UseUpdateUserConfigurationParamType<T = any> = {
  config?: T
  autoUpdate?: boolean
}

export type UseUpdateUserConfigurationReturnType = {
  updateLastActive?: () => Promise<void>
  updateUserSettings?: (user: TypedMap<any, any, any>) => Promise<boolean>
}

/**
 * Update user configuration hook
 *
 * Retrieves config JSON and update (boolean) and uses useMutation.
 * It will only execute the mutation if update is equal to true, and
 * the value has changed.
 *
 * If `autoUpdate` is set to true, the mutation is ran on every
 * change to the specifie `config` using `useEffect`
 *
 * @remarks For now this is how we update user configuration,
 * but it might be better ways. For now this should do.
 *
 * @param params Parameters
 *
 * @category React Hook
 */
export function useUpdateUserConfiguration(
  params?: UseUpdateUserConfigurationParamType
): UseUpdateUserConfigurationReturnType {
  const [updateUserConfiguration] = useMutation($updateUserConfiguration)
  const stringValue = JSON.stringify(params?.config ?? {})

  // eslint-disable-next-line no-console
  console.log(params)

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

  useEffect(() => {
    if (params?.autoUpdate) {
      // eslint-disable-next-line no-console
      console.log(`Auto updating user configuration: ${stringValue}`)
      updateUserConfiguration({
        variables: { configuration: stringValue }
      })
    }
  }, [stringValue])

  return {
    updateUserSettings,
    updateLastActive
  }
}
