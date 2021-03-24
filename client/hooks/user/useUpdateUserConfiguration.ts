/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client'
import { useCallback, useEffect } from 'react'
import $updateUserConfiguration from './update-user-configuration.gql'

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
export function useUpdateUserConfiguration<T = any>(config?: T, autoUpdate = false) {
  const [updateUserConfiguration] = useMutation($updateUserConfiguration)
  const stringValue = JSON.stringify(config)

  const updateCallback = useCallback(async (config_: T) => {
    await updateUserConfiguration({
      variables: { configuration: JSON.stringify(config_) }
    })
  }, [])

  useEffect(() => {
    if (autoUpdate) {
      updateUserConfiguration({
        variables: { configuration: stringValue }
      })
    }
  }, [stringValue])

  return [updateCallback]
}
