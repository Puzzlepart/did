/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client'
import { useCallback, useEffect } from 'react'
import $updateUserConfiguration from './update-user-configuration.gql'

export type UseUpdateUserConfigurationParamType<T = any> = {
  config?: T
  autoUpdate?: boolean
}

export type UseUpdateUserConfigurationReturnType = {
  updateConfiguration?: (config: any) => Promise<void>
  updateStartPage?: (startPage: string) => Promise<void>
  updatePreferredLanguage?: (preferredLanguage: string) => Promise<void>
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
 * @param config - Configuration
 * @param autoUpdate - Auto update on value change
 *
 * @category React Hook
 */
export function useUpdateUserConfiguration(params: UseUpdateUserConfigurationParamType): UseUpdateUserConfigurationReturnType {
  const [updateUserConfiguration] = useMutation($updateUserConfiguration)
  const stringValue = JSON.stringify(params?.config || {})

  const updateConfiguration = useCallback(async (config_: any) => {
    await updateUserConfiguration({
      variables: { configuration: JSON.stringify(config_) }
    })
  }, [])

  const updateStartPage = useCallback(async (startPage: string) => {
    await updateUserConfiguration({
      variables: {
        startPage
      }
    })
  }, [])

  const updatePreferredLanguage = useCallback(async (preferredLanguage: string) => {
    await updateUserConfiguration({
      variables: {
        preferredLanguage
      }
    })
  }, [])

  useEffect(() => {
    if (params?.autoUpdate) {
      updateUserConfiguration({
        variables: { configuration: stringValue }
      })
    }
  }, [stringValue])

  return {
    updateConfiguration,
    updateStartPage,
    updatePreferredLanguage
  }
}
